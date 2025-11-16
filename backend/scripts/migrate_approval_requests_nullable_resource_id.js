// Migration: Make approval_requests.resourceId nullable to support CREATE approvals
// Usage: `node scripts/migrate_approval_requests_nullable_resource_id.js`

require('dotenv').config();
const { sequelize, Sequelize } = require('../models');

async function changeColumnAllowNull(tableName, columnName, allowNull) {
  const qi = sequelize.getQueryInterface();
  const desc = await qi.describeTable(tableName);
  const target = desc[columnName] ? columnName : (desc[camelToSnake(columnName)] ? camelToSnake(columnName) : null);
  if (!target) {
    console.log(`[skip] ${tableName}.${columnName} not found (checked ${columnName} and ${camelToSnake(columnName)})`);
    return false;
  }
  if (desc[target].allowNull === allowNull) {
    console.log(`[skip] ${tableName}.${target} already allowNull=${allowNull}`);
    return false;
  }
  console.log(`[alter] ${tableName}.${target} allowNull -> ${allowNull}`);
  await qi.changeColumn(tableName, target, {
    type: Sequelize.INTEGER,
    allowNull,
  });
  return true;
}

function camelToSnake(name) {
  return name.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

async function run() {
  try {
    console.log('🔧 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected');

    await changeColumnAllowNull('approval_requests', 'resourceId', true);

    console.log('🎉 Migration completed');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

run();