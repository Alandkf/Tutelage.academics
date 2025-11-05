// ============================================================================
// ADMIN QUIZ CONTROLLER
// ============================================================================
// Handles admin CRUD operations for quiz config, sections, and questions

const { QuizConfiguration, QuizSection, QuizQuestion, User } = require('../models');
const { Op } = require('sequelize');

// ============================================================================
// QUIZ CONFIGURATION
// ============================================================================

/**
 * GET /api/admin/quiz/config
 * Fetch current quiz configuration
 */
exports.getQuizConfig = async (req, res) => {
  try {
    let config = await QuizConfiguration.findOne();
    if (!config) {
      config = await QuizConfiguration.create({ totalQuestions: 30, timeLimitMinutes: 20, isActive: true });
    }
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    console.error('Error fetching quiz config:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * PUT /api/admin/quiz/config
 * Update quiz configuration (validates constraints)
 */
exports.updateQuizConfig = async (req, res) => {
  try {
    const { totalQuestions, timeLimitMinutes } = req.body;

    if (totalQuestions !== undefined && totalQuestions < 1) {
      return res.status(400).json({ success: false, message: 'Total questions must be at least 1' });
    }
    if (timeLimitMinutes !== undefined && timeLimitMinutes < 1) {
      return res.status(400).json({ success: false, message: 'Time limit must be at least 1 minute' });
    }

    let config = await QuizConfiguration.findOne();
    if (!config) {
      config = await QuizConfiguration.create({ totalQuestions: 30, timeLimitMinutes: 20 });
    }

    // Validate: sum of section questionCounts must not exceed new totalQuestions
    if (totalQuestions !== undefined && totalQuestions < config.totalQuestions) {
      const sections = await QuizSection.findAll({ where: { isActive: true } });
      const currentSum = sections.reduce((sum, s) => sum + (s.questionCount || 0), 0);
      if (currentSum > totalQuestions) {
        return res.status(400).json({
          success: false,
          message: `Cannot reduce total questions to ${totalQuestions}. Current section allocation is ${currentSum}. Please adjust section question counts first.`
        });
      }
    }

    await config.update({ totalQuestions, timeLimitMinutes });
    res.status(200).json({ success: true, message: 'Quiz configuration updated', data: config });
  } catch (error) {
    console.error('Error updating quiz config:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// ============================================================================
// SECTIONS
// ============================================================================

/**
 * GET /api/admin/quiz/sections
 * Fetch all sections with their question counts
 */
exports.getAllSections = async (req, res) => {
  try {
    const sections = await QuizSection.findAll({
      include: [
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
        { model: QuizQuestion, as: 'questions', attributes: ['id'], where: { isActive: true }, required: false }
      ],
      order: [['displayOrder', 'ASC']]
    });

    const enriched = sections.map(s => ({
      ...s.toJSON(),
      currentQuestionCount: s.questions ? s.questions.length : 0
    }));

    res.status(200).json({ success: true, data: enriched });
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * GET /api/admin/quiz/sections/:id
 * Fetch a specific section with its questions
 */
exports.getSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await QuizSection.findByPk(id, {
      include: [
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
        { model: QuizQuestion, as: 'questions', where: { isActive: true }, required: false }
      ]
    });

    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * POST /api/admin/quiz/sections
 * Create a new section (validates total allocation)
 */
exports.createSection = async (req, res) => {
  try {
    const { name, slug, description, displayOrder, questionCount } = req.body;
    const createdBy = req.user.id;

    if (!name || !slug) {
      return res.status(400).json({ success: false, message: 'Name and slug are required' });
    }

    // Validate: sum of all section questionCounts + new questionCount must not exceed totalQuestions
    const config = await QuizConfiguration.findOne();
    const sections = await QuizSection.findAll({ where: { isActive: true } });
    const currentSum = sections.reduce((sum, s) => sum + (s.questionCount || 0), 0);
    const newCount = questionCount || 10;

    if (currentSum + newCount > config.totalQuestions) {
      return res.status(400).json({
        success: false,
        message: `Cannot create section. Total allocation would be ${currentSum + newCount}, exceeding global limit of ${config.totalQuestions}. Current allocation: ${currentSum}.`
      });
    }

    const section = await QuizSection.create({
      name,
      slug,
      description,
      displayOrder: displayOrder || 0,
      questionCount: newCount,
      createdBy
    });

    const sectionWithCreator = await QuizSection.findByPk(section.id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }]
    });

    res.status(201).json({ success: true, message: 'Section created', data: sectionWithCreator });
  } catch (error) {
    console.error('Error creating section:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * PUT /api/admin/quiz/sections/:id
 * Update a section (validates question count constraints)
 */
exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, displayOrder, questionCount, isActive } = req.body;

    const section = await QuizSection.findByPk(id);
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    // Validate questionCount change: sum of all sections must not exceed totalQuestions
    if (questionCount !== undefined && questionCount !== section.questionCount) {
      const config = await QuizConfiguration.findOne();
      const allSections = await QuizSection.findAll({ where: { isActive: true, id: { [Op.ne]: id } } });
      const otherSum = allSections.reduce((sum, s) => sum + (s.questionCount || 0), 0);
      const newSum = otherSum + questionCount;

      if (newSum > config.totalQuestions) {
        return res.status(400).json({
          success: false,
          message: `Cannot update section. New total allocation would be ${newSum}, exceeding global limit of ${config.totalQuestions}. Other sections total: ${otherSum}.`
        });
      }

      // Also check: current question count in this section must not exceed new questionCount
      const currentQuestionCount = await QuizQuestion.count({ where: { sectionId: id, isActive: true } });
      if (currentQuestionCount > questionCount) {
        return res.status(400).json({
          success: false,
          message: `Section currently has ${currentQuestionCount} active questions. Cannot reduce limit to ${questionCount}. Please delete or deactivate questions first.`
        });
      }
    }

    await section.update({ name, slug, description, displayOrder, questionCount, isActive });

    const updated = await QuizSection.findByPk(id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }]
    });

    res.status(200).json({ success: true, message: 'Section updated', data: updated });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * DELETE /api/admin/quiz/sections/:id
 * Delete a section (blocks if it has active questions)
 */
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await QuizSection.findByPk(id);

    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    const questionCount = await QuizQuestion.count({ where: { sectionId: id, isActive: true } });
    if (questionCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete section "${section.name}". It contains ${questionCount} active question(s). Please delete or move questions first.`
      });
    }

    await section.destroy();
    res.status(200).json({ success: true, message: 'Section deleted' });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// ============================================================================
// QUESTIONS
// ============================================================================

/**
 * GET /api/admin/quiz/questions
 * Fetch all questions with optional filters (sectionId, level)
 */
exports.getAllQuestions = async (req, res) => {
  try {
    const { sectionId, level, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (sectionId) where.sectionId = sectionId;
    if (level) where.level = level;

    const { count, rows } = await QuizQuestion.findAndCountAll({
      where,
      include: [
        { model: QuizSection, as: 'section', attributes: ['id', 'name', 'slug'] },
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['sectionId', 'ASC'], ['displayOrder', 'ASC'], ['id', 'ASC']]
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: {
        questions: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * GET /api/admin/quiz/questions/:id
 * Fetch a specific question by ID
 */
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await QuizQuestion.findByPk(id, {
      include: [
        { model: QuizSection, as: 'section', attributes: ['id', 'name', 'slug'] },
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] }
      ]
    });

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    res.status(200).json({ success: true, data: question });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * POST /api/admin/quiz/questions
 * Create a new question (validates section and global limits)
 */
exports.createQuestion = async (req, res) => {
  try {
    const { sectionId, level, text, optionA, optionB, optionC, optionD, correctAnswer, displayOrder } = req.body;
    const createdBy = req.user.id;

    if (!sectionId || !level || !text || !optionA || !optionB || !optionC || !optionD || correctAnswer === undefined) {
      return res.status(400).json({ success: false, message: 'All question fields are required' });
    }

    if (correctAnswer < 0 || correctAnswer > 3) {
      return res.status(400).json({ success: false, message: 'correctAnswer must be 0-3' });
    }

    // Validate section exists
    const section = await QuizSection.findByPk(sectionId);
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    // Validate section limit
    const sectionQuestionCount = await QuizQuestion.count({ where: { sectionId, isActive: true } });
    if (sectionQuestionCount >= section.questionCount) {
      return res.status(400).json({
        success: false,
        message: `Section "${section.name}" is full (${sectionQuestionCount}/${section.questionCount} questions). Increase section limit or deactivate existing questions.`
      });
    }

    // Validate global limit
    const config = await QuizConfiguration.findOne();
    const globalQuestionCount = await QuizQuestion.count({ where: { isActive: true } });
    if (globalQuestionCount >= config.totalQuestions) {
      return res.status(400).json({
        success: false,
        message: `Global question limit (${config.totalQuestions}) reached. Current: ${globalQuestionCount}. Increase global limit in configuration.`
      });
    }

    const question = await QuizQuestion.create({
      sectionId,
      level,
      text,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      displayOrder: displayOrder || 0,
      createdBy
    });

    const questionWithRefs = await QuizQuestion.findByPk(question.id, {
      include: [
        { model: QuizSection, as: 'section', attributes: ['id', 'name', 'slug'] },
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] }
      ]
    });

    res.status(201).json({ success: true, message: 'Question created', data: questionWithRefs });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * PUT /api/admin/quiz/questions/:id
 * Update a question
 */
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { sectionId, level, text, optionA, optionB, optionC, optionD, correctAnswer, displayOrder, isActive } = req.body;

    const question = await QuizQuestion.findByPk(id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Validate correctAnswer if provided
    if (correctAnswer !== undefined && (correctAnswer < 0 || correctAnswer > 3)) {
      return res.status(400).json({ success: false, message: 'correctAnswer must be 0-3' });
    }

    // If changing section, validate new section limit
    if (sectionId !== undefined && sectionId !== question.sectionId) {
      const newSection = await QuizSection.findByPk(sectionId);
      if (!newSection) {
        return res.status(404).json({ success: false, message: 'New section not found' });
      }
      const newSectionCount = await QuizQuestion.count({ where: { sectionId, isActive: true } });
      if (newSectionCount >= newSection.questionCount) {
        return res.status(400).json({
          success: false,
          message: `Target section "${newSection.name}" is full (${newSectionCount}/${newSection.questionCount}). Increase section limit first.`
        });
      }
    }

    await question.update({ sectionId, level, text, optionA, optionB, optionC, optionD, correctAnswer, displayOrder, isActive });

    const updated = await QuizQuestion.findByPk(id, {
      include: [
        { model: QuizSection, as: 'section', attributes: ['id', 'name', 'slug'] },
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] }
      ]
    });

    res.status(200).json({ success: true, message: 'Question updated', data: updated });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * DELETE /api/admin/quiz/questions/:id
 * Delete a question
 */
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await QuizQuestion.findByPk(id);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    await question.destroy();
    res.status(200).json({ success: true, message: 'Question deleted' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
