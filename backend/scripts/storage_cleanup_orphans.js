require('dotenv').config();
const { sequelize } = require('../models');
const { list, remove, r2Config } = require('../utils/r2Client');
const { TaskPdf } = require('../models');

async function run() {
  try {
    await sequelize.authenticate();
    const cfg = r2Config();
    if (!cfg) throw new Error('R2 not configured');
    const result = await list('pdfs/');
    const keys = (result.Contents || []).map(o => o.Key);
    const proxyPrefix = '/api/files/r2/';
    const rows = await TaskPdf.findAll({ attributes: ['filePath'] });
    const referenced = new Set(rows.map(r => String(r.filePath || '').startsWith(proxyPrefix) ? decodeURIComponent(String(r.filePath).slice(proxyPrefix.length)) : null).filter(Boolean));
    const orphans = keys.filter(k => !referenced.has(k));
    console.log('found', orphans.length, 'orphans');
    for (const key of orphans) {
      await remove(key);
      console.log('deleted', key);
    }
  } catch (e) {
    console.error('cleanup failed', e);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

run();

