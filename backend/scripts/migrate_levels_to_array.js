// Migration: Convert single level columns to ARRAY(TEXT) and add tags to speaking/writing
// Usage: `node scripts/migrate_levels_to_array.js`

require('dotenv').config();
const { sequelize, Sequelize } = require('../models');

async function addColumnIfMissing(tableName, columnName, columnOptions) {
  const qi = sequelize.getQueryInterface();
  const desc = await qi.describeTable(tableName);
  if (desc[columnName]) {
    console.log(`[skip] ${tableName}.${columnName} already exists`);
    return false;
  }
  console.log(`[add] ${tableName}.${columnName}`);
  await qi.addColumn(tableName, columnName, columnOptions);
  return true;
}

async function removeColumnIfExists(tableName, columnName) {
  const qi = sequelize.getQueryInterface();
  const desc = await qi.describeTable(tableName);
  if (!desc[columnName]) {
    console.log(`[skip] ${tableName}.${columnName} does not exist`);
    return false;
  }
  console.log(`[drop] ${tableName}.${columnName}`);
  await qi.removeColumn(tableName, columnName);
  return true;
}

async function renameColumn(tableName, from, to) {
  const qi = sequelize.getQueryInterface();
  const desc = await qi.describeTable(tableName);
  if (!desc[from]) {
    console.log(`[skip] ${tableName}.${from} does not exist for rename`);
    return false;
  }
  if (desc[to]) {
    console.log(`[skip] ${tableName}.${to} already exists`);
    return false;
  }
  console.log(`[rename] ${tableName}.${from} -> ${to}`);
  await qi.renameColumn(tableName, from, to);
  return true;
}

async function migrateLevelToArray(tableName) {
  // Add temporary column level_multi if missing
  const added = await addColumnIfMissing(tableName, 'level_multi', {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
    comment: 'Multi-valued language levels'
  });
  // Populate from existing level string to one-element arrays
  console.log(`[update] ${tableName}.level_multi <- ${tableName}.level`);
  await sequelize.query(`UPDATE "${tableName}" SET level_multi = CASE WHEN level IS NULL THEN NULL ELSE ARRAY[level] END`);
  // Drop old level
  await removeColumnIfExists(tableName, 'level');
  // Rename level_multi to level
  await renameColumn(tableName, 'level_multi', 'level');
}

async function run() {
  try {
    console.log('🔧 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected');

    // Tables to migrate levels
    const tables = ['blogs', 'audios', 'videos', 'stories', 'writings', 'speakings', 'esl_audios', 'esl_videos'];
    for (const t of tables) {
      await migrateLevelToArray(t);
    }

    // Ensure tags columns on speakings and writings
    await addColumnIfMissing('speakings', 'tags', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      comment: 'List of tags associated with the speaking content'
    });
    await addColumnIfMissing('writings', 'tags', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      comment: 'List of tags associated with the writing content'
    });

    console.log('🎉 Migration completed');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

run();