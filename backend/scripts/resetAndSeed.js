const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const { sequelize } = require('../models');
const seed = require('./seed');

async function resetAndSeed() {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('🧹 Dropping all tables (this will remove ALL data)...');
    // Use queryInterface.dropAllTables when available to avoid dialect-specific issues
    const qi = sequelize.getQueryInterface && sequelize.getQueryInterface();
    if (qi && typeof qi.dropAllTables === 'function') {
      await qi.dropAllTables();
    } else if (typeof sequelize.drop === 'function') {
      // fallback if queryInterface method isn't available
      await sequelize.drop();
    } else {
      throw new Error('No suitable method found to drop all tables on this Sequelize instance.');
    }
    console.log('✅ All tables dropped');

    console.log('🔧 Recreating tables (sync)...');
    await sequelize.sync({ force: true }); // force:true ensures creation from models
    console.log('✅ Tables recreated');

    console.log('🌱 Running seed script...');
    if (typeof seed.main === 'function') {
      await seed.main();
      console.log('✅ Seeding complete');
    } else {
      console.warn('⚠️ seed.main is not available; import the seeder functions directly if needed.');
    }

    console.log('🎉 Reset and seed finished');
    process.exit(0);
  } catch (err) {
    console.error('❌ Reset and seed failed:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  resetAndSeed();
}
