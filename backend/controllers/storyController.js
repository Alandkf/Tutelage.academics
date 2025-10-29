// ============================================================================
// STORY CONTROLLER
// ============================================================================
// Handles CRUD operations, search/filter/sort for stories.

const { Story, User, ResourceTag, Tag, ResourceAnalytics, Sequelize } = require('../models');
const { Op } = require('sequelize');

function normalizeLevel(level) {
  const map = {
    'A1': 'A1 Beginner',
    'A2': 'A2 Pre-intermediate',
    'B1': 'B1 Intermediate',
    'B2': 'B2 Upper-Intermediate',
    'C1': 'C1 Advanced',
    'C2': 'C2 Proficient'
  };
  return map[level?.toUpperCase?.()] || level || null;
}

async function attachTags(resourceId, tagNames = []) {
  if (!tagNames?.length) return;
  // Ensure tags exist
  const existing = await Tag.findAll({ where: { name: { [Op.in]: tagNames } } });
  const existingNames = new Set(existing.map(t => t.name));
  const toCreate = tagNames.filter(n => !existingNames.has(n)).map(name => ({ name, namespace: 'story' }));
  if (toCreate.length) {
    await Tag.bulkCreate(toCreate);
  }
  const allTags = await Tag.findAll({ where: { name: { [Op.in]: tagNames } } });
  const mappings = allTags.map(tag => ({ resourceType: 'story', resourceId, tagId: tag.id }));
  // Upsert-like: insert missing, ignore duplicates
  for (const m of mappings) {
    const exists = await ResourceTag.findOne({ where: m });
    if (!exists) await ResourceTag.create(m);
  }
}

async function getTagFilterIds(tagQuery) {
  if (!tagQuery) return null;
  const names = Array.isArray(tagQuery) ? tagQuery : String(tagQuery).split(',').map(s => s.trim()).filter(Boolean);
  if (!names.length) return null;
  const tags = await Tag.findAll({ where: { name: { [Op.in]: names } } });
  if (!tags.length) return [];
  const tagIds = tags.map(t => t.id);
  const mappings = await ResourceTag.findAll({ where: { resourceType: 'story', tagId: { [Op.in]: tagIds } } });
  return [...new Set(mappings.map(m => m.resourceId))];
}

async function ensureAnalytics(resourceId) {
  const [row] = await ResourceAnalytics.findOrCreate({
    where: { resourceType: 'story', resourceId },
    defaults: { views: 0, plays: 0, downloads: 0 }
  });
  return row;
}

exports.createStory = async (req, res) => {
  try {
    const { title, imageUrl, description, contentText, audioRef, pdf, wordCount, level, tags } = req.body;
    const createdBy = req.user.id;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const normalizedLevel = normalizeLevel(level);
    const wc = wordCount ?? (contentText ? String(contentText).split(/\s+/).filter(Boolean).length : null);
    const story = await Story.create({
      title, imageUrl, description, contentText, audioRef, pdf, wordCount: wc, level: normalizedLevel, createdBy
    });
    await attachTags(story.id, tags);
    const storyWithAuthor = await Story.findByPk(story.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
    });
    res.status(201).json({ success: true, message: 'Story created', data: storyWithAuthor });
  } catch (err) {
    console.error('Error creating story:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getAllStories = async (req, res) => {
  try {
    const { cursor, limit = 10, search, level, tags, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { contentText: { [Op.like]: `%${search}%` } }
      ];
    }
    if (level) where.level = { [Op.like]: `${level}%` };

    let idFilter = null;
    if (tags) idFilter = await getTagFilterIds(tags);
    if (Array.isArray(idFilter)) where.id = { [Op.in]: idFilter };

    if (cursor) {
      if ((sortOrder || 'DESC').toUpperCase() === 'DESC') where.id = { ...(where.id || {}), [Op.lt]: parseInt(cursor) };
      else where.id = { ...(where.id || {}), [Op.gt]: parseInt(cursor) };
    }

    const fetchLimit = parseInt(limit) + 1;
    let stories = await Story.findAll({
      where,
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
      limit: fetchLimit,
      order: [[sortBy, (sortOrder || 'DESC').toUpperCase()], ['id', (sortOrder || 'DESC').toUpperCase()]],
      distinct: true
    });

    if (sortBy === 'popularity') {
      const ids = stories.map(s => s.id);
      const metrics = await ResourceAnalytics.findAll({ where: { resourceType: 'story', resourceId: { [Op.in]: ids } } });
      const map = new Map(metrics.map(m => [m.resourceId, m.views]));
      stories.sort((a,b) => (map.get(b.id) || 0) - (map.get(a.id) || 0));
    }

    const hasMore = stories.length > parseInt(limit);
    const items = hasMore ? stories.slice(0, parseInt(limit)) : stories;
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    res.status(200).json({ success: true, data: { stories: items, pagination: { nextCursor, hasMore, itemsPerPage: parseInt(limit), totalItemsReturned: items.length } } });
  } catch (err) {
    console.error('Error fetching stories:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByPk(id, { include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }] });
    if (!story) return res.status(404).json({ success: false, message: 'Story not found' });
    const analytics = await ensureAnalytics(story.id);
    await analytics.update({ views: analytics.views + 1 });
    // Attach tag names
    const mappings = await ResourceTag.findAll({ where: { resourceType: 'story', resourceId: story.id }, include: [{ model: Tag, as: 'tag' }] });
    const tagNames = mappings.map(m => m.tag?.name).filter(Boolean);
    res.status(200).json({ success: true, data: { story, tags: tagNames } });
  } catch (err) {
    console.error('Error fetching story:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl, description, contentText, audioRef, pdf, wordCount, level, tags } = req.body;
    const story = await Story.findByPk(id);
    if (!story) return res.status(404).json({ success: false, message: 'Story not found' });
    if (req.user.role !== 'ADMIN') return res.status(403).json({ success: false, message: 'You can only update your own stories' });
    const normalizedLevel = level !== undefined ? normalizeLevel(level) : story.level;
    const wc = wordCount !== undefined ? wordCount : (contentText ? String(contentText).split(/\s+/).filter(Boolean).length : story.wordCount);
    await story.update({
      title: title ?? story.title,
      imageUrl: imageUrl ?? story.imageUrl,
      description: description ?? story.description,
      contentText: contentText ?? story.contentText,
      audioRef: audioRef ?? story.audioRef,
      pdf: pdf ?? story.pdf,
      wordCount: wc,
      level: normalizedLevel
    });
    if (tags) {
      // Reset tags then attach
      await ResourceTag.destroy({ where: { resourceType: 'story', resourceId: story.id } });
      await attachTags(story.id, Array.isArray(tags) ? tags : String(tags).split(',').map(s => s.trim()).filter(Boolean));
    }
    const updated = await Story.findByPk(id, { include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }] });
    res.status(200).json({ success: true, message: 'Story updated', data: updated });
  } catch (err) {
    console.error('Error updating story:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByPk(id);
    if (!story) return res.status(404).json({ success: false, message: 'Story not found' });
    if (req.user.role !== 'ADMIN') return res.status(403).json({ success: false, message: 'You can only delete your own stories' });
    await ResourceTag.destroy({ where: { resourceType: 'story', resourceId: id } });
    await ResourceAnalytics.destroy({ where: { resourceType: 'story', resourceId: id } });
    await story.destroy();
    res.status(200).json({ success: true, message: 'Story deleted' });
  } catch (err) {
    console.error('Error deleting story:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.searchStories = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    if (!query) return res.status(400).json({ success: false, message: 'Search query is required' });
    const { count, rows } = await Story.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          { contentText: { [Op.like]: `%${query}%` } }
        ]
      },
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      distinct: true
    });
    const totalPages = Math.ceil(count / limit);
    res.status(200).json({ success: true, data: { stories: rows, pagination: { currentPage: parseInt(page), totalPages, totalItems: count, itemsPerPage: parseInt(limit), hasNextPage: page < totalPages, hasPrevPage: page > 1 } } });
  } catch (err) {
    console.error('Error searching stories:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};