// ============================================================================
// AUDIO CONTROLLER
// ============================================================================
// This controller handles all CRUD operations for audio content with pagination
// support for infinite scrolling functionality.
// ============================================================================

const { Audio, User } = require('../models');
const { Op } = require('sequelize');

/**
 * Create a new audio content
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createAudio = async (req, res) => {
  try {
    const { title, content, transcript, audioRef, pdfRef, level } = req.body;
    const createdBy = req.user.id; // From auth middleware

    // Validate required fields
    if (!title || !audioRef) {
      return res.status(400).json({
        success: false,
        message: 'Title and audio reference are required'
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

    const audio = await Audio.create({
      title,
      content,
      transcript,
      audioRef,
      pdfRef,
      level: normalizedLevel,
      createdBy
    });

    // Fetch the created audio with author information
    const audioWithAuthor = await Audio.findByPk(audio.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Audio content created successfully',
      data: audioWithAuthor
    });
  } catch (error) {
    console.error('Error creating audio:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get all audio content with infinite scroll pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllAudios = async (req, res) => {
  try {
    const { 
      cursor, // For cursor-based pagination (ID of last item)
      limit = 10, 
      search,
      level,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    // Build where clause for filtering
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
        { transcript: { [Op.like]: `%${search}%` } }
      ];
    }

    // Optional level filter (supports 'A1', 'B2', or full labels)
    if (level) {
      whereClause.level = { [Op.like]: `${level}%` };
    }

    // Add cursor condition for infinite scroll
    if (cursor) {
      if (sortOrder.toUpperCase() === 'DESC') {
        whereClause.id = { [Op.lt]: parseInt(cursor) };
      } else {
        whereClause.id = { [Op.gt]: parseInt(cursor) };
      }
    }

    // Fetch one extra item to check if there are more items
    const fetchLimit = parseInt(limit) + 1;

    const audios = await Audio.findAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }],
      limit: fetchLimit,
      order: [
        [sortBy, sortOrder.toUpperCase()],
        ['id', sortOrder.toUpperCase()] // Secondary sort by ID for consistent pagination
      ],
      distinct: true
    });

    // Check if there are more items
    const hasMore = audios.length > parseInt(limit);
    
    // Remove the extra item if it exists
    const items = hasMore ? audios.slice(0, parseInt(limit)) : audios;
    
    // Get the cursor for the next request (ID of the last item)
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;

    res.status(200).json({
      success: true,
      data: {
        audios: items,
        pagination: {
          nextCursor,
          hasMore,
          itemsPerPage: parseInt(limit),
          totalItemsReturned: items.length
        }
      }
    });
  } catch (error) {
    console.error('Error fetching audios:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get all audio content with pagination (for React frontend)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPaginatedAudios = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search,
      level,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;
    
    const offset = (page - 1) * limit;

    // Build where clause for filtering
    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
        { transcript: { [Op.like]: `%${search}%` } }
      ];
    }

    // Optional level filter (supports 'A1', 'B2', or full labels)
    if (level) {
      whereClause.level = { [Op.like]: `${level}%` };
    }

    const { count, rows } = await Audio.findAndCountAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      distinct: true
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: {
        audios: rows,
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
    console.error('Error fetching paginated audios:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get a single audio content by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAudioById = async (req, res) => {
  try {
    const { id } = req.params;

    const audio = await Audio.findByPk(id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    if (!audio) {
      return res.status(404).json({
        success: false,
        message: 'Audio content not found'
      });
    }

    res.status(200).json({
      success: true,
      data: audio
    });
  } catch (error) {
    console.error('Error fetching audio:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Update an audio content
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, transcript, audioRef, pdfRef, level } = req.body;

    const audio = await Audio.findByPk(id);

    if (!audio) {
      return res.status(404).json({
        success: false,
        message: 'Audio content not found'
      });
    }

    // Check if user is the admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own audio content'
      });
    }

    // Normalize level codes if provided
    const levelMap = {
      'A1': 'A1 Beginner',
      'A2': 'A2 Pre-intermediate',
      'B1': 'B1 Intermediate',
      'B2': 'B2 Upper-Intermediate',
      'C1': 'C1 Advanced',
      'C2': 'C2 Proficient'
    };
    const normalizedLevel = level !== undefined
      ? (levelMap[level?.toUpperCase?.()] || level)
      : audio.level;

    await audio.update({
      title: title ?? audio.title,
      content: content ?? audio.content,
      transcript: transcript ?? audio.transcript,
      audioRef: audioRef ?? audio.audioRef,
      pdfRef: pdfRef ?? audio.pdfRef,
      level: normalizedLevel ?? audio.level
    });

    // Fetch updated audio with author information
    const updatedAudio = await Audio.findByPk(id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    res.status(200).json({
      success: true,
      message: 'Audio content updated successfully',
      data: updatedAudio
    });
  } catch (error) {
    console.error('Error updating audio:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Delete an audio content
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteAudio = async (req, res) => {
  try {
    const { id } = req.params;

    const audio = await Audio.findByPk(id);

    if (!audio) {
      return res.status(404).json({
        success: false,
        message: 'Audio content not found'
      });
    }

    // Check if user is the admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own audio content'
      });
    }

    await audio.destroy();

    res.status(200).json({
      success: true,
      message: 'Audio content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting audio:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Search audio content by transcript
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const searchAudioByTranscript = async (req, res) => {
  try {
    const { query } = req.query;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const { count, rows } = await Audio.findAndCountAll({
      where: {
        transcript: { [Op.like]: `%${query}%` }
      },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      distinct: true
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: {
        audios: rows,
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
    console.error('Error searching audio by transcript:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  createAudio,
  getAllAudios,
  getPaginatedAudios,
  getAudioById,
  updateAudio,
  deleteAudio,
  searchAudioByTranscript
};