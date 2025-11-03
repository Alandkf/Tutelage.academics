// ============================================================================
// SPEAKING CONTROLLER
// ============================================================================
// Handles CRUD operations for Speaking content with pagination and filtering.
// ============================================================================

const { Speaking, User, Tag, ResourceTag } = require('../models');
const { Op } = require('sequelize');

// Convert incoming level(s) to CEFR labels as an array
function normalizeLevels(input) {
  if (input === undefined || input === null) return null;
  const map = {
    'a1': 'A1 Beginner',
    'a2': 'A2 Pre-intermediate',
    'b1': 'B1 Intermediate',
    'b2': 'B2 Upper-Intermediate',
    'c1': 'C1 Advanced',
    'c2': 'C2 Proficient'
  };
  const values = Array.isArray(input) ? input : String(input).split(',');
  const normalized = values
    .map(v => String(v).trim())
    .filter(Boolean)
    .map(v => map[v.toLowerCase()] || v);
  const unique = Array.from(new Set(normalized));
  return unique.length ? unique : null;
}

function normalizeTags(input) {
  if (input === undefined || input === null) return null;
  const values = Array.isArray(input) ? input : String(input).split(',');
  const normalized = values
    .map(v => String(v).trim())
    .filter(Boolean);
  const unique = Array.from(new Set(normalized));
  return unique.length ? unique : null;
}

// Join-table tag helpers for Speaking resources
async function attachTags(resourceId, tagNames = []) {
  if (!Array.isArray(tagNames) || !tagNames.length) return;
  const trimmed = tagNames.map(t => String(t).trim()).filter(Boolean);
  const existing = await Tag.findAll({ where: { name: { [Op.in]: trimmed } } });
  const existingMap = new Map(existing.map(t => [t.name, t.id]));
  const toCreate = trimmed.filter(n => !existingMap.has(n)).map(n => ({ name: n, namespace: 'speaking' }));
  if (toCreate.length) {
    const created = await Tag.bulkCreate(toCreate, { returning: true });
    created.forEach(t => existingMap.set(t.name, t.id));
  }
  const tagIds = trimmed.map(n => existingMap.get(n)).filter(Boolean);
  await ResourceTag.destroy({ where: { resourceType: 'speaking', resourceId } });
  if (tagIds.length) {
    await ResourceTag.bulkCreate(tagIds.map(tagId => ({ resourceType: 'speaking', resourceId, tagId })));
  }
}

async function includeTagsFor(resourceId) {
  const rts = await ResourceTag.findAll({ where: { resourceType: 'speaking', resourceId } });
  if (!rts.length) return [];
  const tagIds = rts.map(rt => rt.tagId);
  const tags = await Tag.findAll({ where: { id: { [Op.in]: tagIds } } });
  return tags.map(t => t.name);
}

/**
 * Create a new speaking content
 */
const createSpeaking = async (req, res) => {
  try {
    const { title, description, discription, content, transcript, videoRef, pdf, level, imageUrl, imageurl, tags } = req.body;
    const createdBy = req.user.id; // From auth middleware

    if (!title || !videoRef) {
      return res.status(400).json({
        success: false,
        message: 'Title and video reference are required'
      });
    }

    // Normalize level(s)
    const normalizedLevels = normalizeLevels(level);

  const speaking = await Speaking.create({
      title,
      description: (description ?? discription ?? null),
      content,
      transcript,
      videoRef,
      pdf,
      imageUrl: (imageUrl ?? imageurl ?? null),
      level: normalizedLevels,
      tags: Array.isArray(tags) ? tags : (tags ? String(tags).split(',').map(t => t.trim()).filter(Boolean) : undefined),
      createdBy
    });

    // Sync tags to join table while preserving array column for compatibility
    const tagNames = Array.isArray(tags)
      ? tags.map(t => String(t).trim()).filter(Boolean)
      : [];
    if (tagNames.length) await attachTags(speaking.id, tagNames);

    const speakingWithAuthor = await Speaking.findByPk(speaking.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
    });

    res.status(201).json({
      success: true,
      message: 'Speaking content created successfully',
      data: { ...speakingWithAuthor.toJSON(), tags: await includeTagsFor(speaking.id) }
    });
  } catch (error) {
    console.error('Error creating speaking:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Get all speaking content with infinite scroll pagination
 */
const getAllSpeakings = async (req, res) => {
  try {
    const { cursor, limit = 10, search, level, tags, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;

    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { transcript: { [Op.like]: `%${search}%` } }
      ];
    }

    const levelsFilter = normalizeLevels(level);
    if (levelsFilter) {
      whereClause.level = { [Op.overlap]: levelsFilter };
    }

    const tagsFilter = normalizeTags(tags);
    if (tagsFilter) {
      whereClause.tags = { [Op.overlap]: tagsFilter };
    }

    if (cursor) {
      if (sortOrder.toUpperCase() === 'DESC') {
        whereClause.id = { [Op.lt]: parseInt(cursor) };
      } else {
        whereClause.id = { [Op.gt]: parseInt(cursor) };
      }
    }

    const fetchLimit = parseInt(limit) + 1;

    const speakings = await Speaking.findAll({
      where: whereClause,
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
      limit: fetchLimit,
      order: [
        [sortBy, sortOrder.toUpperCase()],
        ['id', sortOrder.toUpperCase()]
      ],
      distinct: true
    });

    const hasMore = speakings.length > parseInt(limit);
    const items = hasMore ? speakings.slice(0, parseInt(limit)) : speakings;
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;

    res.status(200).json({
      success: true,
      data: {
        speakings: items,
        pagination: {
          nextCursor,
          hasMore,
          itemsPerPage: parseInt(limit),
          totalItemsReturned: items.length
        }
      }
    });
  } catch (error) {
    console.error('Error fetching speakings:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Get all speaking content with page-based pagination
 */
const getPaginatedSpeakings = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, level, tags, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { transcript: { [Op.like]: `%${search}%` } }
      ];
    }
    const levelsFilter = normalizeLevels(level);
    if (levelsFilter) {
      whereClause.level = { [Op.overlap]: levelsFilter };
    }

    const tagsFilter = normalizeTags(tags);
    if (tagsFilter) {
      whereClause.tags = { [Op.overlap]: tagsFilter };
    }

    const { count, rows } = await Speaking.findAndCountAll({
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
        speakings: rows,
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
    console.error('Error fetching paginated speakings:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Get a single speaking content by ID
 */
const getSpeakingById = async (req, res) => {
  try {
    const { id } = req.params;

    const speaking = await Speaking.findByPk(id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
    });

    if (!speaking) {
      return res.status(404).json({ success: false, message: 'Speaking content not found' });
    }

    const tagNames = await includeTagsFor(speaking.id);
    res.status(200).json({ success: true, data: { ...speaking.toJSON(), tags: tagNames } });
  } catch (error) {
    console.error('Error fetching speaking:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Update a speaking content (Admin only)
 */
const updateSpeaking = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, discription, content, transcript, videoRef, pdf, level, imageUrl, imageurl, tags } = req.body;

    const speaking = await Speaking.findByPk(id);
    if (!speaking) {
      return res.status(404).json({ success: false, message: 'Speaking content not found' });
    }

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'You can only update your own speaking content' });
    }

    const normalizedLevelUpdate = level !== undefined
      ? normalizeLevels(level)
      : speaking.level;

    await speaking.update({
      title: title ?? speaking.title,
      description: (description ?? discription ?? speaking.description),
      content: content ?? speaking.content,
      transcript: transcript ?? speaking.transcript,
      videoRef: videoRef ?? speaking.videoRef,
      pdf: pdf ?? speaking.pdf,
      imageUrl: (imageUrl ?? imageurl ?? speaking.imageUrl),
      level: normalizedLevelUpdate ?? speaking.level,
      tags: Array.isArray(tags)
        ? tags
        : (tags !== undefined ? String(tags).split(',').map(t => t.trim()).filter(Boolean) : speaking.tags)
    });

    // Sync join-table tags
    const tagNames = Array.isArray(tags)
      ? tags.map(t => String(t).trim()).filter(Boolean)
      : [];
    if (tagNames.length) await attachTags(speaking.id, tagNames);

    const updatedSpeaking = await Speaking.findByPk(id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
    });

    res.status(200).json({ success: true, message: 'Speaking content updated successfully', data: { ...updatedSpeaking.toJSON(), tags: await includeTagsFor(speaking.id) } });
  } catch (error) {
    console.error('Error updating speaking:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Delete a speaking content (Admin only)
 */
const deleteSpeaking = async (req, res) => {
  try {
    const { id } = req.params;
    const speaking = await Speaking.findByPk(id);

    if (!speaking) {
      return res.status(404).json({ success: false, message: 'Speaking content not found' });
    }

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'You can only delete your own speaking content' });
    }

    // Clean up join-table tag mappings
    await ResourceTag.destroy({ where: { resourceType: 'speaking', resourceId: id } });
    await speaking.destroy();
    res.status(200).json({ success: true, message: 'Speaking content deleted successfully' });
  } catch (error) {
    console.error('Error deleting speaking:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

/**
 * Search speaking content by transcript or title
 */
const searchSpeaking = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const { count, rows } = await Speaking.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { transcript: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } }
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
        speakings: rows,
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
    console.error('Error searching speaking:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  createSpeaking,
  getAllSpeakings,
  getPaginatedSpeakings,
  getSpeakingById,
  updateSpeaking,
  deleteSpeaking,
  searchSpeaking
};