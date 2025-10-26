// ============================================================================
// LANDING SECTION CONTROLLER
// ============================================================================
// CRUD operations for LandingSection model. Public reads, admin-protected writes.
// ============================================================================

const { Op } = require('sequelize');
const { LandingSection, User } = require('../models');

/**
 * Create a new landing section entry (Admin only)
 */
const createLandingSection = async (req, res) => {
  try {
    const { title, subtitle, imageUrl } = req.body;

    if (!title || !subtitle || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'title, subtitle, and imageUrl are required'
      });
    }

    const createdBy = req.user?.id;
    if (!createdBy) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const entry = await LandingSection.create({ title, subtitle, imageUrl, createdBy });
    const withAuthor = await LandingSection.findByPk(entry.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email', 'role'] }]
    });

    return res.status(201).json({ success: true, landingSection: withAuthor });
  } catch (error) {
    console.error('❌ createLandingSection error:', error);
    return res.status(500).json({ success: false, message: 'Server error creating landing section', error: error.message });
  }
};

/**
 * Get the latest landing section entry (Public)
 */
const getLatestLandingSection = async (req, res) => {
  try {
    const latest = await LandingSection.findOne({
      order: [['createdAt', 'DESC']],
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email', 'role'] }]
    });

    return res.status(200).json({ success: true, landingSection: latest });
  } catch (error) {
    console.error('❌ getLatestLandingSection error:', error);
    return res.status(500).json({ success: false, message: 'Server error getting landing section', error: error.message });
  }
};

/**
 * Get all landing section entries with pagination (Public)
 */
const getAllLandingSections = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { rows, count } = await LandingSection.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email', 'role'] }]
    });

    return res.status(200).json({
      success: true,
      landingSections: rows,
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    console.error('❌ getAllLandingSections error:', error);
    return res.status(500).json({ success: false, message: 'Server error getting landing sections', error: error.message });
  }
};

/**
 * Get a landing section by ID (Public)
 */
const getLandingSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Landing section ID is required' });
    }

    const entry = await LandingSection.findByPk(id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email', 'role'] }]
    });

    if (!entry) {
      return res.status(404).json({ success: false, message: 'Landing section not found' });
    }

    return res.status(200).json({ success: true, landingSection: entry });
  } catch (error) {
    console.error('❌ getLandingSectionById error:', error);
    return res.status(500).json({ success: false, message: 'Server error getting landing section', error: error.message });
  }
};

/**
 * Update a landing section entry by ID (Admin only)
 */
const updateLandingSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, imageUrl } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Landing section ID is required' });
    }

    const entry = await LandingSection.findByPk(id);
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Landing section not found' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    await entry.update(updateData);

    const updated = await LandingSection.findByPk(id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email', 'role'] }]
    });

    return res.status(200).json({ success: true, landingSection: updated });
  } catch (error) {
    console.error('❌ updateLandingSection error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating landing section', error: error.message });
  }
};

/**
 * Delete a landing section entry by ID (Admin only)
 */
const deleteLandingSection = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Landing section ID is required' });
    }

    const entry = await LandingSection.findByPk(id);
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Landing section not found' });
    }

    await entry.destroy();

    return res.status(200).json({ success: true, message: 'Landing section deleted successfully' });
  } catch (error) {
    console.error('❌ deleteLandingSection error:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting landing section', error: error.message });
  }
};

module.exports = {
  createLandingSection,
  getLatestLandingSection,
  getAllLandingSections,
  getLandingSectionById,
  updateLandingSection,
  deleteLandingSection
};