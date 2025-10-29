// ============================================================================
// ESL VIDEO CONTROLLER
// ============================================================================
// CRUD, search, filter, sort, tag assignment, and analytics for ESL videos.

const { EslVideo, Tag, ResourceTag, ResourceAnalytics } = require('../models');
const { Op } = require('sequelize');

// Helpers
const normalizeLevel = (level) => {
  if (!level) return null;
  const map = {
    'a1': 'A1 Beginner',
    'a2': 'A2 Pre-intermediate',
    'b1': 'B1 Intermediate',
    'b2': 'B2 Upper-Intermediate',
    'c1': 'C1 Advanced',
    'c2': 'C2 Proficient'
  };
  const key = String(level).toLowerCase().trim();
  return map[key] || level;
};

const getYouTubeThumbnail = (url) => {
  if (!url) return null;
  try {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{6,})/);
    if (match && match[1]) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  } catch (_) {}
  return null;
};

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
  await ResourceTag.destroy({ where: { resourceType: 'esl_video', resourceId } });
  await ResourceTag.bulkCreate(tagIds.map(tagId => ({ resourceType: 'esl_video', resourceId, tagId })));
};

const includeTagsFor = async (resourceId) => {
  const rts = await ResourceTag.findAll({ where: { resourceType: 'esl_video', resourceId } });
  if (!rts.length) return [];
  const tagIds = rts.map(rt => rt.tagId);
  const tags = await Tag.findAll({ where: { id: { [Op.in]: tagIds } } });
  return tags.map(t => t.name);
};

const bumpAnalytics = async (resourceId, field = 'views', amount = 1) => {
  const [row, created] = await ResourceAnalytics.findOrCreate({
    where: { resourceType: 'esl_video', resourceId },
    defaults: { resourceType: 'esl_video', resourceId, views: 0, plays: 0, downloads: 0 }
  });
  row[field] = (row[field] || 0) + amount;
  await row.save();
  return row;
};

exports.createEslVideo = async (req, res) => {
  try {
    const { title, videoRef, description, pdf, level, tags } = req.body;
    const normalizedLevel = normalizeLevel(level);
    const thumbnailUrl = getYouTubeThumbnail(videoRef);
    const createdBy = req.user?.id || 1; // default for admin scripts/tests
    const video = await EslVideo.create({ title, videoRef, description, pdf, level: normalizedLevel, thumbnailUrl, createdBy });
    if (Array.isArray(tags)) await attachTags(video.id, tags);
    const tagNames = await includeTagsFor(video.id);
    res.status(201).json({ success: true, data: { ...video.toJSON(), tags: tagNames } });
  } catch (err) {
    console.error('Error creating ESL video:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getAllEslVideos = async (req, res) => {
  try {
    const { search, level, tags, sortBy = 'date', sortOrder = 'desc', limit = 20, offset = 0 } = req.query;
    const where = {};
    if (search) where.title = { [Op.like]: `%${search}%` };
    if (level) where.level = normalizeLevel(level);

    // Tag filtering
    let idFilter = null;
    if (tags) {
      const tagNames = String(tags).split(',').map(t => t.trim()).filter(Boolean);
      const tagRows = await Tag.findAll({ where: { name: { [Op.in]: tagNames } } });
      const tagIds = tagRows.map(t => t.id);
      if (tagIds.length) {
        const rtRows = await ResourceTag.findAll({ where: { resourceType: 'esl_video', tagId: { [Op.in]: tagIds } } });
        const matchedIds = [...new Set(rtRows.map(r => r.resourceId))];
        idFilter = matchedIds.length ? matchedIds : [-1];
      }
    }

    const order = [];
    if (sortBy === 'popularity') order.push(['id', sortOrder.toUpperCase()]); // fallback
    else if (sortBy === 'difficulty') order.push(['level', sortOrder.toUpperCase()]);
    else order.push(['createdAt', sortOrder.toUpperCase()]);

    const rows = await EslVideo.findAll({
      where: idFilter ? { ...where, id: { [Op.in]: idFilter } } : where,
      order,
      limit: Number(limit),
      offset: Number(offset)
    });

    // Attach tags and analytics summary
    const enriched = await Promise.all(rows.map(async (row) => {
      const tags = await includeTagsFor(row.id);
      const metrics = await ResourceAnalytics.findOne({ where: { resourceType: 'esl_video', resourceId: row.id } });
      return { ...row.toJSON(), tags, metrics };
    }));

    res.status(200).json({ success: true, data: enriched });
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
    res.status(200).json({ success: true, data: { ...video.toJSON(), tags, metrics } });
  } catch (err) {
    console.error('Error fetching ESL video:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.updateEslVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, videoRef, description, pdf, level, tags } = req.body;
    const video = await EslVideo.findByPk(id);
    if (!video) return res.status(404).json({ success: false, message: 'Video not found' });
    const payload = { title, videoRef, description, pdf, level: normalizeLevel(level) };
    if (videoRef) payload.thumbnailUrl = getYouTubeThumbnail(videoRef);
    await video.update(payload);
    if (Array.isArray(tags)) await attachTags(video.id, tags);
    const tagNames = await includeTagsFor(video.id);
    res.status(200).json({ success: true, data: { ...video.toJSON(), tags: tagNames } });
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
    await ResourceTag.destroy({ where: { resourceType: 'esl_video', resourceId: id } });
    await ResourceAnalytics.destroy({ where: { resourceType: 'esl_video', resourceId: id } });
    await video.destroy();
    res.status(200).json({ success: true, message: 'Video deleted' });
  } catch (err) {
    console.error('Error deleting ESL video:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};