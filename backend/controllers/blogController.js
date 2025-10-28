// ============================================================================
// BLOG CONTROLLER
// ============================================================================
// This controller handles all CRUD operations for blog posts with pagination
// support for infinite scrolling functionality.
// ============================================================================

const { Blog, User } = require('../models');
const { Op } = require('sequelize');

/**
 * Create a new blog post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createBlog = async (req, res) => {
  try {
    const { title, content, imageRef, category, description, desccription } = req.body;
    const createdBy = req.user.id; // From auth middleware

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const blog = await Blog.create({
      title,
      content,
      imageRef,
      category,
      description: description ?? desccription ?? null,
      createdBy
    });

    // Fetch the created blog with author information
    const blogWithAuthor = await Blog.findByPk(blog.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blogWithAuthor
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get all blog posts with infinite scroll pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllBlogs = async (req, res) => {
  try {
    const {
      cursor,
      limit = 9,
      category,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    

    // Build where clause for filtering
    const whereClause = {};
    if (category) {
      whereClause.category = category;
    }
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
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
    const blogs = await Blog.findAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }],
      limit: fetchLimit,
      order: [
        [sortBy, sortOrder.toUpperCase()],
        ['id', sortOrder.toUpperCase()]
      ],
      distinct: true
    });
    // Check if there are more items
    const hasMore = blogs.length > parseInt(limit);
    // Remove the extra item if it exists
    const items = hasMore ? blogs.slice(0, parseInt(limit)) : blogs;
    // Get the cursor for the next request (ID of the last item)
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    res.status(200).json({
      success: true,
      blogs: items,
      hasMore,
      nextCursor
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get a single blog post by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Update a blog post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, imageRef, category, description, desccription } = req.body;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Check if user is the admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own blog posts'
      });
    }

    await blog.update({
      title: title || blog.title,
      content: content || blog.content,
      imageRef: imageRef || blog.imageRef,
      category: category || blog.category,
      description: (description ?? desccription ?? blog.description)
    });

    // Fetch updated blog with author information
    const updatedBlog = await Blog.findByPk(id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }]
    });

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedBlog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Delete a blog post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Check if user is the admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own blog posts'
      });
    }

    await blog.destroy();

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Delete ALL blog posts (USE WITH CAUTION - DEVELOPMENT ONLY)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteAllBlogs = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Only administrators can delete all blogs'
      });
    }

    const deletedCount = await Blog.destroy({
      where: {},
      truncate: false
    });

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${deletedCount} blog posts`,
      deletedCount
    });
  } catch (error) {
    console.error('Error deleting all blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get blogs by category with pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
/**
 * Get all blog posts with pagination (for React frontend)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPaginatedBlogs = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;
    
    const offset = (page - 1) * limit;

    // Build where clause for filtering
    const whereClause = {};
    if (category) {
      whereClause.category = category;
    }
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    console.log('🔍 Starting getPaginatedBlogs query...');
    console.log('📊 Query parameters:', { page, limit, offset });
    console.log('🔎 Where clause:', whereClause);
    
    const { count, rows } = await Blog.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      distinct: true
    });
    
    console.log('📈 Query results:', { count, rowsLength: rows.length });
    console.log('📝 First blog (if any):', rows[0] ? rows[0].toJSON() : 'No blogs found');
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: {
        blogs: rows,
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
    console.error('Error fetching paginated blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Blog.findAndCountAll({
      where: { category },
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
        blogs: rows,
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
    console.error('Error fetching blogs by category:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getPaginatedBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  deleteAllBlogs,
  getBlogsByCategory
};