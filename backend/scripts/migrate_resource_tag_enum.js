// Update Postgres enum type for resource_tags.resourceType to include speaking/writing
// Run: `node backend/scripts/migrate_resource_tag_enum.js`

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const { sequelize } = require('../models');

async function run() {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected. Updating enum types...');

    // Postgres stores Sequelize ENUMs with a generated name based on table/column
    // For resource_tags.resourceType, the type is typically enum_resource_tags_resourceType
    const queries = [
      "DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_resource_tags_resourceType') THEN RAISE NOTICE 'enum type enum_resource_tags_resourceType not found'; END IF; END $$;",
      "ALTER TYPE \"enum_resource_tags_resourceType\" ADD VALUE IF NOT EXISTS 'speaking'",
      "ALTER TYPE \"enum_resource_tags_resourceType\" ADD VALUE IF NOT EXISTS 'writing'",
      "ALTER TYPE \"enum_resource_tags_resourceType\" ADD VALUE IF NOT EXISTS 'reading'",
    ];

    for (const q of queries) {
      try {
        await sequelize.query(q);
        console.log(`➡️ Executed: ${q}`);
      } catch (err) {
        // Adding values to ENUM can error if the type isn't present; log and continue
        console.warn('⚠️ Query warning:', err.message);
      }
    }

    console.log('🎉 Enum migration completed');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

run();