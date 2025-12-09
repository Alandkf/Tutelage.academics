require('dotenv').config();
const { sequelize } = require('../models');
const { list, r2Config } = require('../utils/r2Client');

async function run() {
  try {
    await sequelize.authenticate();
    const cfg = r2Config();
    if (!cfg) throw new Error('R2 not configured');
    const result = await list('pdfs/');
    const count = (result.Contents || []).length;
    const total = (result.Contents || []).reduce((sum, o) => sum + (o.Size || 0), 0);
    console.log('objects', count, 'bytes', total);
  } catch (e) {
    console.error('audit failed', e);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

run();

