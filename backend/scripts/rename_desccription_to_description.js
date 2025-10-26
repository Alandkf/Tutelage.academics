/**
 * One-off migration script: rename 'desccription' column to 'description' in 'blogs' table.
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
    const hasMisspelled = !!schema['desccription'];
    const hasCorrect = !!schema['description'];

    if (!hasMisspelled && hasCorrect) {
      console.log('ℹ️ Column already correctly named "description". Nothing to do.');
      process.exit(0);
    }

    if (hasMisspelled && !hasCorrect) {
      console.log('🛠️ Renaming column "desccription" -> "description"...');
      await qi.renameColumn('blogs', 'desccription', 'description');
      console.log('✅ Column renamed successfully.');
    } else if (hasMisspelled && hasCorrect) {
      console.log('⚠️ Both columns exist. Coalescing data into "description" then dropping "desccription"...');
      // Coalesce data from the misspelled column into the correct one where needed
      const dialect = sequelize.getDialect();
      if (dialect === 'postgres') {
        await sequelize.query('UPDATE "blogs" SET "description" = COALESCE("description", "desccription")');
      } else if (dialect === 'mysql' || dialect === 'mariadb') {
        await sequelize.query('UPDATE `blogs` SET `description` = COALESCE(`description`, `desccription`)');
      } else if (dialect === 'sqlite') {
        await sequelize.query('UPDATE `blogs` SET `description` = COALESCE(`description`, `desccription`)');
      } else {
        console.warn(`⚠️ Unsupported dialect for coalesce step: ${dialect}.`);
      }
      console.log('🗑️ Dropping column "desccription"...');
      await qi.removeColumn('blogs', 'desccription');
      console.log('✅ Cleanup complete.');
    } else {
      console.log('ℹ️ Neither column found; ensure table exists and prior migrations ran.');
    }

    // Verify
    const updatedSchema = await qi.describeTable('blogs');
    console.log('🔍 Verification:', {
      hasDescription: !!updatedSchema['description'],
      hasDesccription: !!updatedSchema['desccription']
    });

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Rename migration failed:', err);
    process.exit(1);
  }
})();