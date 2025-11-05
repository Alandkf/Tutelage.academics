// ============================================================================
// PUBLIC QUIZ CONTROLLER
// ============================================================================
// Handles public read-only endpoints for frontend quiz display

const { QuizConfiguration, QuizSection, QuizQuestion } = require('../models');
const { sendTestResultEmail } = require('../config/email');

/**
 * GET /api/quiz/config
 * Fetch quiz configuration (totalQuestions, timeLimitMinutes)
 * Only returns active configuration
 */
exports.getPublicQuizConfig = async (req, res) => {
  try {
    let config = await QuizConfiguration.findOne({ where: { isActive: true } });
    if (!config) {
      // Fallback: if no active config, create default one
      config = await QuizConfiguration.create({ totalQuestions: 30, timeLimitMinutes: 20, isActive: true });
    }
    res.status(200).json({
      success: true,
      data: {
        totalQuestions: config.totalQuestions,
        timeLimitMinutes: config.timeLimitMinutes
      }
    });
  } catch (error) {
    console.error('Error fetching public quiz config:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * GET /api/quiz/sections
 * Fetch all active sections with metadata (no questions)
 */
exports.getPublicSections = async (req, res) => {
  try {
    const sections = await QuizSection.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']]
    });

    res.status(200).json({ success: true, data: sections });
  } catch (error) {
    console.error('Error fetching public sections:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * GET /api/quiz/questions
 * Fetch exactly 30 random active questions distributed by CEFR level:
 * - 3 × A1 (Q1-3)
 * - 6 × A2 (Q4-9)
 * - 7 × B1 (Q10-16)
 * - 7 × B2 (Q17-23)
 * - 4 × C1 (Q24-27)
 * - 3 × C2 (Q28-30)
 * 
 * Returns questions WITH correctAnswer (frontend scoring)
 * Questions are RANDOMIZED within each level for variety
 */
exports.getPublicQuestions = async (req, res) => {
  try {
    // Define the distribution: [level, count]
    const distribution = [
      { level: 'A1', count: 3 },
      { level: 'A2', count: 6 },
      { level: 'B1', count: 7 },
      { level: 'B2', count: 7 },
      { level: 'C1', count: 4 },
      { level: 'C2', count: 3 }
    ];

    const selectedQuestions = [];

    // Fetch random questions for each level
    for (const { level, count } of distribution) {
      const questions = await QuizQuestion.findAll({
        where: { level, isActive: true },
        attributes: ['id', 'sectionId', 'level', 'text', 'optionA', 'optionB', 'optionC', 'optionD', 'correctAnswer'],
        include: [{ model: QuizSection, as: 'section', attributes: ['id', 'name', 'slug'] }],
        order: [
          [QuizQuestion.sequelize.fn('RANDOM')] // ✅ Randomizes questions within this level
        ],
        limit: count // ✅ Only take the required count for this level
      });

      // If not enough questions for this level, log warning but continue
      if (questions.length < count) {
        console.warn(`⚠️  Only ${questions.length}/${count} active ${level} questions available`);
      }

      selectedQuestions.push(...questions);
    }

    // Map to frontend-friendly format (WITH correctAnswer)
    const formatted = selectedQuestions.map(q => ({
      id: q.id,
      sectionId: q.sectionId,
      sectionName: q.section?.name,
      level: q.level,
      text: q.text,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
      correctAnswer: q.correctAnswer // ✅ Now included for frontend scoring
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching public questions:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
