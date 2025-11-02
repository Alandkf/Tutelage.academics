// =============================================================================
// DELETE ALL BLOGS SCRIPT
// =============================================================================
// WARNING: This will permanently delete ALL blog posts (and videos/esl_videos) from the database!
// Run: `node backend/scripts/deleteAllBlogs.js`
// =============================================================================

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const { sequelize, Blog, Video, EslVideo } = require('../models');

async function deleteAllBlogs() {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    console.log('⚠️  WARNING: This will delete ALL blog posts AND videos/esl_videos!');
    console.log('⏳ Deleting content in 3 seconds...');

    // Wait 3 seconds to give user time to cancel if needed
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Delete Videos first (if model exists)
    if (Video) {
      const deletedVideos = await Video.destroy({ where: {}, truncate: false });
      console.log(`✅ Deleted ${deletedVideos} Video records`);
    } else {
      console.log('ℹ️ Video model not found; skipped deleting videos.');
    }

    // Delete ESL videos (if model exists)
    if (EslVideo) {
      const deletedEslVideos = await EslVideo.destroy({ where: {}, truncate: false });
      console.log(`✅ Deleted ${deletedEslVideos} EslVideo records`);
    } else {
      console.log('ℹ️ EslVideo model not found; skipped deleting esl_videos.');
    }

    // Delete Blogs
    const deletedCount = await Blog.destroy({
      where: {},
      truncate: false
    });

    console.log(`✅ Successfully deleted ${deletedCount} blog posts`);
    console.log('🎉 Database cleaned successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting content:', error);
    process.exit(1);
  }
}

deleteAllBlogs();
