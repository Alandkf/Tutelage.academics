// ============================================================================
// ESL VIDEO CONTROLLER
// ============================================================================
// CRUD, search, filter, sort, tag assignment, and analytics for ESL videos.

const { EslVideo, Tag, ResourceTag, ResourceAnalytics } = require('../models');
const { Op } = require('sequelize');

// Helpers
const normalizeLevels = (input) => {
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
};

const getYouTubeThumbnail = (url) => {
  if (!url) return null;
  try {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{6,})/);
    if (match && match[1]) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  } catch (_) {}
  return null;
};

// Use a DB-safe resource type that matches the enum in resource_tags/resource_analytics
const DB_RESOURCE_TYPE = 'video'; // maps ESL videos to the generic 'video' enum in the DB
const RESOURCE_KEY = 'esl_video'; // logical name used within this controller (optional)

const attachTags = async (resourceId, tagNames = []) => {
  if (!Array.isArray(tagNames) || !tagNames.length) return;
  const trimmed = tagNames.map(t => String(t).trim()).filter(Boolean);
  const existing = await Tag.findAll({ where: { name: { [Op.in]: trimmed } } });
  const existingMap = new Map(existing.map(t => [t.name, t.id]));
  const toCreate = trimmed.filter(n => !existingMap.has(n)).map(n => ({ name: n }));  
  if (toCreate.length) {
    const created = await Tag.bulkCreate(toCreate, { returning: true });
    created.forEach(t => existingMap.set(t.name, t.id));
  }
  const tagIds = trimmed.map(n => existingMap.get(n)).filter(Boolean);
  await ResourceTag.destroy({ where: { resourceType: DB_RESOURCE_TYPE, resourceId } });
  await ResourceTag.bulkCreate(tagIds.map(tagId => ({ resourceType: DB_RESOURCE_TYPE, resourceId, tagId })));
};

const includeTagsFor = async (resourceId) => {
  // use DB_RESOURCE_TYPE (enum-compliant)
  const rts = await ResourceTag.findAll({ where: { resourceType: DB_RESOURCE_TYPE, resourceId } });
  if (!rts.length) return [];
  const tagIds = rts.map(rt => rt.tagId);
  const tags = await Tag.findAll({ where: { id: { [Op.in]: tagIds } } });
  return tags.map(t => t.name);
};

const bumpAnalytics = async (resourceId, field = 'views', amount = 1) => {
  const [row, created] = await ResourceAnalytics.findOrCreate({
    where: { resourceType: DB_RESOURCE_TYPE, resourceId },
    defaults: { resourceType: DB_RESOURCE_TYPE, resourceId, views: 0, plays: 0, downloads: 0 }
  });
  row[field] = (row[field] || 0) + amount;
  await row.save();
  return row;
};

exports.createEslVideo = async (req, res) => {
  try {
    const { title, videoRef, description, pdf, taskPdf, level, tags } = req.body;
    const normalizedLevel = normalizeLevels(level);
    const thumbnailUrl = getYouTubeThumbnail(videoRef);
    const createdBy = req.user?.id || 1;
    
    // Parse tags from request body (can be array or comma-separated string)
    const tagNames = Array.isArray(tags) 
      ? tags.map(t => String(t).trim()).filter(Boolean)
      : (tags ? String(tags).split(',').map(t => t.trim()).filter(Boolean) : []);
    
    // Create video with tags array column
    const video = await EslVideo.create({ 
      title, 
      videoRef, 
      description, 
      pdf, 
      taskPdf, 
      level: normalizedLevel, 
      thumbnailUrl, 
      tags: tagNames.length ? tagNames : null, // Store in array column too
      createdBy 
    });
    
    // Also sync to join table for relational queries
    if (tagNames.length) await attachTags(video.id, tagNames);
    
    const tagList = await includeTagsFor(video.id);
    res.status(201).json({ success: true, message: 'Esl Video Created Successfully', data: { ...video.toJSON(), tags: tagList } });
  } catch (err) {
    console.error('Error creating ESL video:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getAllEslVideos = async (req, res) => {
  try {
    const { cursor, limit = 9, search, level, tags, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
    const where = {};
    
    if (search) where.title = { [Op.like]: `%${search}%` };
    
    const levelsFilter = normalizeLevels(level);
    if (levelsFilter) where.level = { [Op.overlap]: levelsFilter };

    // Cursor-based pagination
    if (cursor) {
      if (sortOrder.toUpperCase() === 'DESC') {
        where.id = { [Op.lt]: parseInt(cursor) };
      } else {
        where.id = { [Op.gt]: parseInt(cursor) };
      }
    }

    // Tag filtering
    let idFilter = null;
    if (tags) {
      const tagNames = String(tags).split(',').map(t => t.trim()).filter(Boolean);
      const tagRows = await Tag.findAll({ where: { name: { [Op.in]: tagNames } } });
      const tagIds = tagRows.map(t => t.id);
      if (tagIds.length) {
        const rtRows = await ResourceTag.findAll({ where: { resourceType: DB_RESOURCE_TYPE, tagId: { [Op.in]: tagIds } } });
        const matchedIds = [...new Set(rtRows.map(r => r.resourceId))];
        idFilter = matchedIds.length ? matchedIds : [-1];
      }
    }

    // Fetch one extra to check hasMore
    const fetchLimit = parseInt(limit) + 1;
    const order = [[sortBy, sortOrder.toUpperCase()], ['id', sortOrder.toUpperCase()]];

    const rows = await EslVideo.findAll({
      where: idFilter ? { ...where, id: { ...where.id, [Op.in]: idFilter } } : where,
      order,
      limit: fetchLimit,
      distinct: true
    });

    const hasMore = rows.length > parseInt(limit);
    const items = hasMore ? rows.slice(0, parseInt(limit)) : rows;
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;

    // Attach tags and analytics
    const enriched = await Promise.all(items.map(async (row) => {
      const tags = await includeTagsFor(row.id);
      const metrics = await ResourceAnalytics.findOne({ where: { resourceType: DB_RESOURCE_TYPE, resourceId: row.id } });
      return { ...row.toJSON(), tags, metrics };
    }));

    res.status(200).json({ 
      success: true, 
      message: 'Esl Videos fetched successfully',
      data: enriched,
      pagination: {
        nextCursor,
        hasMore,
        itemsPerPage: parseInt(limit),
        totalItemsReturned: enriched.length
      }
    });
  } catch (err) {
    console.error('Error fetching ESL videos:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getEslVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await EslVideo.findByPk(id);
    if (!video) return res.status(404).json({ success: false, message: 'Video not found' });
    const tags = await includeTagsFor(video.id);
    const metrics = await bumpAnalytics(video.id, 'views', 1);
    res.status(200).json({ success: true, message: 'Esl Video fetched successfully', data: { ...video.toJSON(), tags, metrics } });
  } catch (err) {
    console.error('Error fetching ESL video:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.updateEslVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, videoRef, description, pdf, taskPdf, level, tags } = req.body;
    const video = await EslVideo.findByPk(id);
    if (!video) return res.status(404).json({ success: false, message: 'Video not found' });
    
    // Parse tags
    const tagNames = tags !== undefined
      ? (Array.isArray(tags) 
          ? tags.map(t => String(t).trim()).filter(Boolean)
          : String(tags).split(',').map(t => t.trim()).filter(Boolean))
      : null;
    
    const payload = { 
      title, 
      videoRef, 
      description, 
      pdf, 
      taskPdf, 
      level: normalizeLevels(level) 
    };
    if (videoRef) payload.thumbnailUrl = getYouTubeThumbnail(videoRef);
    
    // Update tags array column if tags were provided
    if (tagNames !== null) {
      payload.tags = tagNames.length ? tagNames : null;
    }
    
    await video.update(payload);
    
    // Sync join table if tags were provided
    if (tagNames !== null) {
      await ResourceTag.destroy({ where: { resourceType: DB_RESOURCE_TYPE, resourceId: id } });
      if (tagNames.length) await attachTags(video.id, tagNames);
    }
    
    const tagList = await includeTagsFor(video.id);
    res.status(200).json({ success: true, message: 'Esl Video Updated Successfully', data: { ...video.toJSON(), tags: tagList } });
  } catch (err) {
    console.error('Error updating ESL video:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.deleteEslVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await EslVideo.findByPk(id);
    if (!video) return res.status(404).json({ success: false, message: 'Video not found' });
    // use DB_RESOURCE_TYPE for cleanup
    await ResourceTag.destroy({ where: { resourceType: DB_RESOURCE_TYPE, resourceId: id } });
    await ResourceAnalytics.destroy({ where: { resourceType: DB_RESOURCE_TYPE, resourceId: id } });
    await video.destroy();
    res.status(200).json({ success: true, message: 'Esl Video deleted Successfully' });
  } catch (err) {
    console.error('Error deleting ESL video:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};