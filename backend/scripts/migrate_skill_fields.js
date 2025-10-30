// Migration script: Add skill-related fields (pdf, level) to audio/video tables
// Usage: `node scripts/migrate_skill_fields.js`

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

async function run() {
  try {
    console.log('🔧 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected');

    // Add level to audios
    await addColumnIfMissing('audios', 'level', {
      type: Sequelize.STRING(32),
      allowNull: true,
      comment: 'Language level (CEFR-like) for audio content'
    });

    // Add pdf to videos
    await addColumnIfMissing('videos', 'pdf', {
      type: Sequelize.STRING(500),
      allowNull: true,
      comment: 'URL or path to downloadable PDF for the video'
    });

    // Add level to videos
    await addColumnIfMissing('videos', 'level', {
      type: Sequelize.STRING(32),
      allowNull: true,
      comment: 'Language level (CEFR-like) for video content'
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