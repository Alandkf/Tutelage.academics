// ============================================================================
// STATS CONTROLLER
// ============================================================================
// Handles dashboard statistics and analytics

const { Writing, Audio, Speaking, Reading, Blog, Story, EslVideo, EslAudio } = require('../models');

/**
 * Get dashboard statistics for all resource types
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getDashboardStats = async (req, res) => {
  try {
    // Count records from each table in parallel
    const [
      writingsCount,
      listeningsCount,
      speakingsCount,
      readingsCount,
      blogsCount,
      storiesCount,
      videosCount,
      audiosCount
    ] = await Promise.all([
      Writing.count(),
      Audio.count(),
      Speaking.count(),
      Reading.count(),
      Blog.count(),
      Story.count(),
      EslVideo.count(),
      EslAudio.count()
    ]);

    res.status(200).json({
      success: true,
      data: {
        writings: writingsCount,
        listenings: listeningsCount,
        speakings: speakingsCount,
        readings: readingsCount,
        blogs: blogsCount,
        stories: storiesCount,
        videos: videosCount,
        audios: audiosCount
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get detailed statistics with additional metrics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getDetailedStats = async (req, res) => {
  try {
    const stats = await Promise.all([
      Writing.count(),
      Audio.count(),
      Speaking.count(),
      Reading.count(),
      Blog.count(),
      Story.count(),
      EslVideo.count(),
      EslAudio.count()
    ]);

    // Calculate total resources
    const totalResources = stats.reduce((sum, count) => sum + count, 0);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalResources,
          writings: stats[0],
          listenings: stats[1],
          speakings: stats[2],
          readings: stats[3],
          blogs: stats[4],
          stories: stats[5],
          videos: stats[6],
          audios: stats[7]
        }
      }
    });
  } catch (error) {
    console.error('Error fetching detailed stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
