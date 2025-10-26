/**
 * One-off migration script: add 'desccription' column to 'blogs' table.
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { sequelize, Sequelize } = require('../models');

(async () => {
  const qi = sequelize.getQueryInterface();
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected.');

    console.log('🔎 Describing table "blogs"...');
    const schema = await qi.describeTable('blogs');
    if (schema && schema['desccription']) {
      console.log('ℹ️ Column "desccription" already exists. Skipping.');
      process.exit(0);
    }

    console.log('🛠️ Adding column "desccription" to "blogs"...');
    await qi.addColumn('blogs', 'desccription', {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      comment: 'Short description of the blog post'
    });

    console.log('✅ Column added successfully.');

    // Verify
    const updatedSchema = await qi.describeTable('blogs');
    if (updatedSchema && updatedSchema['desccription']) {
      console.log('🔍 Verified: "desccription" present.');
    } else {
      console.warn('⚠️ Verification failed: column not found.');
    }

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
})();