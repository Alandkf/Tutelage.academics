// Migration: Add blogs.tags and drop tag from audios/speakings/writings
// Usage: `node scripts/migrate_blog_tags_and_drop_other_tags.js`

require('dotenv').config();
const { sequelize, Sequelize } = require('../models');

async function addColumnIfMissing(tableName, columnName, columnOptions) {
  const qi = sequelize.getQueryInterface();
  const desc = await qi.describeTable(tableName);
  if (desc[columnName]) {
    console.log(`[skip] ${tableName}.${columnName} already exists`);
    return;
  }
  console.log(`[add] ${tableName}.${columnName}`);
  await qi.addColumn(tableName, columnName, columnOptions);
}

async function removeColumnIfExists(tableName, columnName) {
  const qi = sequelize.getQueryInterface();
  const desc = await qi.describeTable(tableName);
  if (!desc[columnName]) {
    console.log(`[skip] ${tableName}.${columnName} does not exist`);
    return;
  }
  console.log(`[drop] ${tableName}.${columnName}`);
  await qi.removeColumn(tableName, columnName);
}

async function run() {
  try {
    console.log('🔧 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected');

    // Add blogs.tags (array of strings)
    await addColumnIfMissing('blogs', 'tags', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      comment: 'List of tags associated with the blog post'
    });

    // Drop tag from other models
    await removeColumnIfExists('audios', 'tag');
    await removeColumnIfExists('speakings', 'tag');
    await removeColumnIfExists('writings', 'tag');
    await removeColumnIfExists('videos', 'tag'); // safe to call if not present

    console.log('🎉 Migration completed');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

run();