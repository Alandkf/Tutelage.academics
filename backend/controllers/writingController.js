// ============================================================================
// WRITING CONTROLLER
// ============================================================================
// Handles CRUD operations for Writing content with pagination and filtering.
// ============================================================================

const { Writing, User } = require('../models');
const { Op } = require('sequelize');

/**
 * Create a new writing content
 */
const createWriting = async (req, res) => {
  try {
    const { title, prompt, content, description, discription, sampleAnswer, rubric, pdf, level, imageUrl, imageurl } = req.body;
    const createdBy = req.user.id; // From auth middleware

    if (!title || !prompt) {
      return res.status(400).json({
        success: false,
        message: 'Title and prompt are required'
      });
    }

    // Normalize level codes (e.g., 'A1' -> 'A1 Beginner')
    const levelMap = {
      'A1': 'A1 Beginner',
      'A2': 'A2 Pre-intermediate',
      'B1': 'B1 Intermediate',
      'B2': 'B2 Upper-Intermediate',
      'C1': 'C1 Advanced',
      'C2': 'C2 Proficient'
    };
    const normalizedLevel = levelMap[level?.toUpperCase?.()] || level || null;

    const writing = await Writing.create({
      title,
      prompt,
      content,
      description: (description ?? discription ?? null),
      sampleAnswer,
      rubric,
      pdf,
      imageUrl: (imageUrl ?? imageurl ?? null),
      level: normalizedLevel,
      createdBy
    });

    const writingWithAuthor = await Writing.findByPk(writing.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
    });

    res.status(201).json({
      success: true,
      message: 'Writing content created successfully',
      data: writingWithAuthor
    });
  } catch (error) {
    console.error('Error creating writing:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Get all writing content with infinite scroll pagination
 */
const getAllWritings = async (req, res) => {
  try {
    const { cursor, limit = 10, search, level, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { prompt: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
        { sampleAnswer: { [Op.like]: `%${search}%` } }
      ];
    }
    if (level) {
      whereClause.level = { [Op.like]: `${level}%` };
    }
    if (cursor) {
      if (sortOrder.toUpperCase() === 'DESC') {
        whereClause.id = { [Op.lt]: parseInt(cursor) };
      } else {
        whereClause.id = { [Op.gt]: parseInt(cursor) };
      }
    }

    const fetchLimit = parseInt(limit) + 1;
    const writings = await Writing.findAll({
      where: whereClause,
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
      limit: fetchLimit,
      order: [
        [sortBy, sortOrder.toUpperCase()],
        ['id', sortOrder.toUpperCase()]
      ],
      distinct: true
    });

    const hasMore = writings.length > parseInt(limit);
    const items = hasMore ? writings.slice(0, parseInt(limit)) : writings;
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    res.status(200).json({
      success: true,
      data: {
        writings: items,
        pagination: {
          nextCursor,
          hasMore,
          itemsPerPage: parseInt(limit),
          totalItemsReturned: items.length
        }
      }
    });
  } catch (error) {
    console.error('Error fetching writings:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Get all writing content with page-based pagination
 */
const getPaginatedWritings = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, level, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { prompt: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
        { sampleAnswer: { [Op.like]: `%${search}%` } }
      ];
    }
    if (level) {
      whereClause.level = { [Op.like]: `${level}%` };
    }

    const { count, rows } = await Writing.findAndCountAll({
      where: whereClause,
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      distinct: true
    });

    const totalPages = Math.ceil(count / limit);
    res.status(200).json({
      success: true,
      data: {
        writings: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching paginated writings:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Get a single writing content by ID
 */
const getWritingById = async (req, res) => {
  try {
    const { id } = req.params;
    const writing = await Writing.findByPk(id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
    });
    if (!writing) {
      return res.status(404).json({ success: false, message: 'Writing content not found' });
    }
    res.status(200).json({ success: true, data: writing });
  } catch (error) {
    console.error('Error fetching writing:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Update a writing content (Admin only)
 */
const updateWriting = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, prompt, content, description, discription, sampleAnswer, rubric, pdf, level, imageUrl, imageurl } = req.body;
    const writing = await Writing.findByPk(id);
    if (!writing) {
      return res.status(404).json({ success: false, message: 'Writing content not found' });
    }
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'You can only update your own writing content' });
    }

    const levelMapUpdate = {
      'A1': 'A1 Beginner',
      'A2': 'A2 Pre-intermediate',
      'B1': 'B1 Intermediate',
      'B2': 'B2 Upper-Intermediate',
      'C1': 'C1 Advanced',
      'C2': 'C2 Proficient'
    };
    const normalizedLevelUpdate = level !== undefined
      ? (levelMapUpdate[level?.toUpperCase?.()] || level)
      : writing.level;

    await writing.update({
      title: title ?? writing.title,
      prompt: prompt ?? writing.prompt,
      content: content ?? writing.content,
      description: (description ?? discription ?? writing.description),
      sampleAnswer: sampleAnswer ?? writing.sampleAnswer,
      rubric: rubric ?? writing.rubric,
      pdf: pdf ?? writing.pdf,
      imageUrl: (imageUrl ?? imageurl ?? writing.imageUrl),
      level: normalizedLevelUpdate ?? writing.level
    });

    const updatedWriting = await Writing.findByPk(id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
    });
    res.status(200).json({ success: true, message: 'Writing content updated successfully', data: updatedWriting });
  } catch (error) {
    console.error('Error updating writing:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Delete a writing content (Admin only)
 */
const deleteWriting = async (req, res) => {
  try {
    const { id } = req.params;
    const writing = await Writing.findByPk(id);
    if (!writing) {
      return res.status(404).json({ success: false, message: 'Writing content not found' });
    }
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'You can only delete your own writing content' });
    }
    await writing.destroy();
    res.status(200).json({ success: true, message: 'Writing content deleted successfully' });
  } catch (error) {
    console.error('Error deleting writing:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Search writing content by prompt/title/content
 */
const searchWritings = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }
    const { count, rows } = await Writing.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { prompt: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } }
        ]
      },
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      distinct: true
    });
    const totalPages = Math.ceil(count / limit);
    res.status(200).json({
      success: true,
      data: {
        writings: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error searching writings:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  createWriting,
  getAllWritings,
  getPaginatedWritings,
  getWritingById,
  updateWriting,
  deleteWriting,
  searchWritings
};