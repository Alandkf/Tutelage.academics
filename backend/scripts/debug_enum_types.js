const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const { sequelize } = require('../models');

async function run() {
  try {
    await sequelize.authenticate();
    const [rows] = await sequelize.query(`
      SELECT pg_type.typname AS enum_type
      FROM pg_type
      JOIN pg_attribute ON pg_attribute.atttypid = pg_type.oid
      JOIN pg_class ON pg_class.oid = pg_attribute.attrelid
      WHERE pg_class.relname = 'resource_tags' AND pg_attribute.attname = 'resourceType';
    `);
    console.log('Enum type for resource_tags.resourceType:', rows);

    const [labels] = await sequelize.query(`
      SELECT e.enumlabel
      FROM pg_enum e
      JOIN pg_type t ON t.oid = e.enumtypid
      WHERE t.typname = 'enum_resource_tags_resourceType'
      ORDER BY e.enumsortorder;
    `);
    console.log('Enum labels for enum_resource_tags_resourceType:', labels.map(r => r.enumlabel));
  } catch (err) {
    console.error('Error inspecting enum types:', err);
  } finally {
    await sequelize.close();
  }
}

run();