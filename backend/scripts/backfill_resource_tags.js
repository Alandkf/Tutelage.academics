const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const { sequelize, Tag, ResourceTag, Speaking, Writing } = require('../models');
const { Op } = require('sequelize');

async function attachTags(resourceType, resourceId, tagNames = []) {
  if (!Array.isArray(tagNames) || !tagNames.length) return;
  const trimmed = tagNames.map(t => String(t).trim()).filter(Boolean);
  if (!trimmed.length) return;
  const existing = await Tag.findAll({ where: { name: { [Op.in]: trimmed } } });
  const existingMap = new Map(existing.map(t => [t.name, t.id]));
  const toCreate = trimmed.filter(n => !existingMap.has(n)).map(n => ({ name: n, namespace: resourceType }));
  if (toCreate.length) {
    const created = await Tag.bulkCreate(toCreate, { returning: true });
    created.forEach(t => existingMap.set(t.name, t.id));
  }
  const tagIds = trimmed.map(n => existingMap.get(n)).filter(Boolean);
  await ResourceTag.destroy({ where: { resourceType, resourceId } });
  if (tagIds.length) {
    await ResourceTag.bulkCreate(tagIds.map(tagId => ({ resourceType, resourceId, tagId })));
  }
}

async function run() {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();

    const speakings = await Speaking.findAll({ where: { tags: { [Op.ne]: null } } });
    console.log(`Found ${speakings.length} speakings with tags`);
    for (const s of speakings) {
      await attachTags('speaking', s.id, Array.isArray(s.tags) ? s.tags : []);
    }

    const writings = await Writing.findAll({ where: { tags: { [Op.ne]: null } } });
    console.log(`Found ${writings.length} writings with tags`);
    for (const w of writings) {
      await attachTags('writing', w.id, Array.isArray(w.tags) ? w.tags : []);
    }

    console.log('🎉 Backfill resource_tags completed');
  } catch (err) {
    console.error('❌ Backfill error:', err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

run();