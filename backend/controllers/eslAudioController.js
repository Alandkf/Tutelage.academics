// ============================================================================
// ESL AUDIO CONTROLLER
// ============================================================================
// CRUD, search, filter, sort, tag assignment, transcript search, analytics.

const { EslAudio, Tag, ResourceTag, ResourceAnalytics } = require('../models');
const { Op } = require('sequelize');

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
  await ResourceTag.destroy({ where: { resourceType: 'audio', resourceId } });
  await ResourceTag.bulkCreate(tagIds.map(tagId => ({ resourceType: 'audio', resourceId, tagId })));
};

const includeTagsFor = async (resourceId) => {
  const rts = await ResourceTag.findAll({ where: { resourceType: 'audio', resourceId } });
  if (!rts.length) return [];
  const tagIds = rts.map(rt => rt.tagId);
  const tags = await Tag.findAll({ where: { id: { [Op.in]: tagIds } } });
  return tags.map(t => t.name);
};

const bumpAnalytics = async (resourceId, field = 'plays', amount = 1) => {
  const [row] = await ResourceAnalytics.findOrCreate({
    where: { resourceType: 'audio', resourceId },
    defaults: { resourceType: 'audio', resourceId, views: 0, plays: 0, downloads: 0 }
  });
  row[field] = (row[field] || 0) + amount;
  await row.save();
  return row;
};

exports.createEslAudio = async (req, res) => {
  try {
    const { title, imageUrl, description, transcript, audioRef, pdf, level, tags } = req.body;
    const createdBy = req.user?.id || 1;
    const audio = await EslAudio.create({ title, imageUrl, description, transcript, audioRef, pdf, level: normalizeLevel(level), createdBy });
    if (Array.isArray(tags)) await attachTags(audio.id, tags);
    const tagNames = await includeTagsFor(audio.id);
    res.status(201).json({ success: true, data: { ...audio.toJSON(), tags: tagNames } });
  } catch (err) {
    console.error('Error creating ESL audio:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getAllEslAudios = async (req, res) => {
  try {
    const { search, level, tags, sortBy = 'date', sortOrder = 'desc', limit = 20, offset = 0 } = req.query;
    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { transcript: { [Op.like]: `%${search}%` } }
      ];
    }
    if (level) where.level = normalizeLevel(level);

    let idFilter = null;
    if (tags) {
      const tagNames = String(tags).split(',').map(t => t.trim()).filter(Boolean);
      const tagRows = await Tag.findAll({ where: { name: { [Op.in]: tagNames } } });
      const tagIds = tagRows.map(t => t.id);
      if (tagIds.length) {
        const rtRows = await ResourceTag.findAll({ where: { resourceType: 'audio', tagId: { [Op.in]: tagIds } } });
        const matchedIds = [...new Set(rtRows.map(r => r.resourceId))];
        idFilter = matchedIds.length ? matchedIds : [-1];
      }
    }

    const order = [];
    if (sortBy === 'difficulty') order.push(['level', sortOrder.toUpperCase()]);
    else order.push(['createdAt', sortOrder.toUpperCase()]);

    const rows = await EslAudio.findAll({
      where: idFilter ? { ...where, id: { [Op.in]: idFilter } } : where,
      order,
      limit: Number(limit),
      offset: Number(offset)
    });

    const enriched = await Promise.all(rows.map(async (row) => {
      const tags = await includeTagsFor(row.id);
      const metrics = await ResourceAnalytics.findOne({ where: { resourceType: 'audio', resourceId: row.id } });
      return { ...row.toJSON(), tags, metrics };
    }));

    res.status(200).json({ success: true, data: enriched });
  } catch (err) {
    console.error('Error fetching ESL audios:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getEslAudioById = async (req, res) => {
  try {
    const { id } = req.params;
    const audio = await EslAudio.findByPk(id);
    if (!audio) return res.status(404).json({ success: false, message: 'Audio not found' });
    const tags = await includeTagsFor(audio.id);
    const metrics = await bumpAnalytics(audio.id, 'views', 1); // count a detail view
    res.status(200).json({ success: true, data: { ...audio.toJSON(), tags, metrics } });
  } catch (err) {
    console.error('Error fetching ESL audio:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.updateEslAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl, description, transcript, audioRef, pdf, level, tags } = req.body;
    const audio = await EslAudio.findByPk(id);
    if (!audio) return res.status(404).json({ success: false, message: 'Audio not found' });
    await audio.update({ title, imageUrl, description, transcript, audioRef, pdf, level: normalizeLevel(level) });
    if (Array.isArray(tags)) await attachTags(audio.id, tags);
    const tagNames = await includeTagsFor(audio.id);
    res.status(200).json({ success: true, data: { ...audio.toJSON(), tags: tagNames } });
  } catch (err) {
    console.error('Error updating ESL audio:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.deleteEslAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const audio = await EslAudio.findByPk(id);
    if (!audio) return res.status(404).json({ success: false, message: 'Audio not found' });
    await ResourceTag.destroy({ where: { resourceType: 'audio', resourceId: id } });
    await ResourceAnalytics.destroy({ where: { resourceType: 'audio', resourceId: id } });
    await audio.destroy();
    res.status(200).json({ success: true, message: 'Audio deleted' });
  } catch (err) {
    console.error('Error deleting ESL audio:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// Optional: Search by transcript only
exports.searchEslAudioByTranscript = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ success: false, message: 'Missing query' });
    const rows = await EslAudio.findAll({ where: { transcript: { [Op.like]: `%${query}%` } }, limit: 50 });
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error('Error searching ESL audio transcript:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};