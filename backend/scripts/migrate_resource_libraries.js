// Migration: Create stories, tags, resource_tags, resource_analytics tables if missing
// Usage: `node scripts/migrate_resource_libraries.js`

require('dotenv').config();
const { sequelize, Sequelize } = require('../models');

async function ensureTable(tableName, definition) {
  const qi = sequelize.getQueryInterface();
  const desc = await qi.describeTable(tableName).catch(() => null);
  if (desc) {
    console.log(`[skip] ${tableName} already exists`);
    return;
  }
  console.log(`[create] ${tableName}`);
  await qi.createTable(tableName, definition);
}

async function run() {
  try {
    console.log('🔧 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected');

    // stories
    await ensureTable('stories', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING(250), allowNull: false },
      imageUrl: { type: Sequelize.STRING(500), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      contentText: { type: Sequelize.TEXT, allowNull: true },
      audioRef: { type: Sequelize.STRING(500), allowNull: true },
      pdf: { type: Sequelize.STRING(500), allowNull: true },
      wordCount: { type: Sequelize.INTEGER, allowNull: true },
      level: { type: Sequelize.STRING(32), allowNull: true },
      createdBy: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    // tags
    await ensureTable('tags', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(120), allowNull: false, unique: true },
      namespace: { type: Sequelize.STRING(50), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    // resource_tags
    await ensureTable('resource_tags', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      resourceType: { type: Sequelize.ENUM('video', 'audio', 'story'), allowNull: false },
      resourceId: { type: Sequelize.INTEGER, allowNull: false },
      tagId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    // resource_analytics
    await ensureTable('resource_analytics', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      resourceType: { type: Sequelize.ENUM('video', 'audio', 'story'), allowNull: false },
      resourceId: { type: Sequelize.INTEGER, allowNull: false },
      views: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      plays: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      downloads: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
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