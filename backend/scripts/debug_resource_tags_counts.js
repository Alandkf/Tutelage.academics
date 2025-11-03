const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const { sequelize, ResourceTag } = require('../models');

async function run() {
  try {
    await sequelize.authenticate();
    const types = ['video', 'audio', 'story', 'speaking', 'writing'];
    for (const t of types) {
      const count = await ResourceTag.count({ where: { resourceType: t } });
      console.log(`${t}: ${count}`);
    }
  } catch (err) {
    console.error('Error counting resource tags:', err);
  } finally {
    await sequelize.close();
  }
}

run();