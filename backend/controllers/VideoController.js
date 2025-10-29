// ============================================================================
// VIDEO CONTROLLER
// ============================================================================
// This controller handles all CRUD operations for video content with pagination
// support for infinite scrolling functionality.
// ============================================================================

const { Video, User } = require('../models');
const { Op } = require('sequelize');

/**
 * Create a new video content
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createVideo = async (req, res) => {
  try {
    const { title, videoRef, description, pdf, level } = req.body;
    const createdBy = req.user.id; // From auth middleware

    // Validate required fields
    if (!title || !videoRef) {
      return res.status(400).json({
        success: false,
        message: 'Title and video reference are required'
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

    const video = await Video.create({
      title,
      videoRef,
      description,
      pdf,
      level: normalizedLevel,
      createdBy
    });

    // Fetch the created video with author information
    const videoWithAuthor = await Video.findByPk(video.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Video content created successfully',
      data: videoWithAuthor
    });
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get all video content with infinite scroll pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllVideos = async (req, res) => {
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
        { description: { [Op.like]: `%${search}%` } }
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

    const videos = await Video.findAll({
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
    const hasMore = videos.length > parseInt(limit);
    
    // Remove the extra item if it exists
    const items = hasMore ? videos.slice(0, parseInt(limit)) : videos;
    
    // Get the cursor for the next request (ID of the last item)
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;

    res.status(200).json({
      success: true,
      data: {
        videos: items,
        pagination: {
          nextCursor,
          hasMore,
          itemsPerPage: parseInt(limit),
          totalItemsReturned: items.length
        }
      }
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get all video content with pagination (for React frontend)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPaginatedVideos = async (req, res) => {
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
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    // Optional level filter (supports 'A1', 'B2', or full labels)
    if (level) {
      whereClause.level = { [Op.like]: `${level}%` };
    }

    const { count, rows } = await Video.findAndCountAll({
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
        videos: rows,
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
    console.error('Error fetching paginated videos:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get a single video content by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByPk(id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video content not found'
      });
    }

    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Update a video content
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, videoRef, description, pdf, level } = req.body;

    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video content not found'
      });
    }

    // Check if user is the admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own video content'
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
      : video.level;

    await video.update({
      title: title ?? video.title,
      videoRef: videoRef ?? video.videoRef,
      description: description ?? video.description,
      pdf: pdf ?? video.pdf,
      level: normalizedLevel ?? video.level
    });

    // Fetch updated video with author information
    const updatedVideo = await Video.findByPk(id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    res.status(200).json({
      success: true,
      message: 'Video content updated successfully',
      data: updatedVideo
    });
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Delete a video content
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video content not found'
      });
    }

    // Check if user is the admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own video content'
      });
    }

    await video.destroy();

    res.status(200).json({
      success: true,
      message: 'Video content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get videos by title search with pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const searchVideosByTitle = async (req, res) => {
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

    const { count, rows } = await Video.findAndCountAll({
      where: {
        title: { [Op.like]: `%${query}%` }
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
        videos: rows,
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
    console.error('Error searching videos by title:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Legacy function for backward compatibility
const get = (req, res) => {
   return res.status(200).json({
      success: true,
      message: 'Videos fetched successfully',
      data: [
         {
            id: 1,
            title: 'Introduction to Mathematics',
            description: 'Learn the basics of mathematics',
            url: 'https://www.youtube.com/embed/Kp2bYWRQylk',
            thumbnail: 'https://img.youtube.com/vi/Kp2bYWRQylk/hqdefault.jpg',
            category: 'Mathematics'
         },
         {
            id: 2,
            title: 'Advanced Physics Concepts',
            description: 'Explore advanced physics theories',
            url: 'https://www.youtube.com/embed/0NbBjNiw4tk',
            thumbnail: 'https://img.youtube.com/vi/0NbBjNiw4tk/hqdefault.jpg',
            category: 'Physics'
         },
         {
            id: 3,
            title: 'Chemistry Fundamentals',
            description: 'Understanding basic chemistry principles',
            url: 'https://www.youtube.com/embed/FSyAehMdpyI',
            thumbnail: 'https://img.youtube.com/vi/FSyAehMdpyI/hqdefault.jpg',
            category: 'Chemistry'
         }
      ]
    }); 
};

module.exports = {
  createVideo,
  getAllVideos,
  getPaginatedVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  searchVideosByTitle,
  get // Legacy export
};
