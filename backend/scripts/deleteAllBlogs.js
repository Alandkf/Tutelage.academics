// =============================================================================
// DELETE ALL BLOGS SCRIPT
// =============================================================================
// WARNING: This will permanently delete ALL blog posts from the database!
// Run: `node backend/scripts/deleteAllBlogs.js`
// =============================================================================

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const { sequelize, Blog } = require('../models');

async function deleteAllBlogs() {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    console.log('⚠️  WARNING: This will delete ALL blog posts!');
    console.log('⏳ Deleting all blogs in 3 seconds...');
    
    // Wait 3 seconds to give user time to cancel if needed
    await new Promise(resolve => setTimeout(resolve, 3000));

    const deletedCount = await Blog.destroy({
      where: {},
      truncate: false
    });

    console.log(`✅ Successfully deleted ${deletedCount} blog posts`);
    console.log('🎉 Database cleaned successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting blogs:', error);
    process.exit(1);
  }
}

deleteAllBlogs();
