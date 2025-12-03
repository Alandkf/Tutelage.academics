// ============================================================================
// ESL RESOURCES CONTROLLER
// ============================================================================
// Handles mixed ESL resource queries (blogs, stories, videos, audios)
// Supports daily-rotating featured resources with date-based seeding

const { Blog, Story, EslVideo, EslAudio } = require('../models');
const { Op } = require('sequelize');

/**
 * Seeded Random Number Generator
 * Uses a date string as seed to ensure consistent "random" results for the same day
 */
function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Simple LCG (Linear Congruential Generator)
  let current = Math.abs(hash);
  return function() {
    current = (current * 1103515245 + 12345) & 0x7fffffff;
    return current / 0x7fffffff;
  };
}

/**
 * Shuffle array using seeded random function
 */
function shuffleWithSeed(array, seed) {
  const rng = seededRandom(seed);
  const shuffled = [...array];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Get daily featured resources (3 from each type)
 * Uses current date as seed for consistent daily selection
 */
exports.getDailyFeatured = async (req, res) => {
  try {
    // Use today's date as seed (YYYY-MM-DD format)
    const today = new Date().toISOString().split('T')[0];
    
    // Fetch all available resources
    const [blogs, stories, videos, audios] = await Promise.all([
      Blog.findAll({ 
        attributes: ['id', 'title', 'description', 'imageRef', 'level'],
        order: [['id', 'ASC']]
      }),
      Story.findAll({ 
        attributes: ['id', 'title', 'description', 'imageUrl', 'level', 'tags'],
        order: [['id', 'ASC']]
      }),
      EslVideo.findAll({ 
        attributes: ['id', 'title', 'description', 'thumbnailUrl', 'videoRef', 'level', 'tags'],
        order: [['id', 'ASC']]
      }),
      EslAudio.findAll({ 
        attributes: ['id', 'title', 'description', 'imageUrl', 'level'],
        order: [['id', 'ASC']]
      })
    ]);

    // Shuffle each collection with today's date as seed
    const shuffledBlogs = shuffleWithSeed(blogs, `${today}-blogs`);
    const shuffledStories = shuffleWithSeed(stories, `${today}-stories`);
    const shuffledVideos = shuffleWithSeed(videos, `${today}-videos`);
    const shuffledAudios = shuffleWithSeed(audios, `${today}-audios`);

    // Take 3 from each (or less if not enough items)
    const selectedBlogs = shuffledBlogs.slice(0, 3).map(item => ({
      ...item.toJSON(),
      resourceType: 'blog',
      link: `/esl-resources/blogs/${item.id}`,
      imageRef: item.imageRef || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80'
    }));

    const selectedStories = shuffledStories.slice(0, 3).map(item => ({
      ...item.toJSON(),
      resourceType: 'story',
      link: `/esl-resources/stories/${item.id}`,
      imageRef: item.imageUrl || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80'
    }));

    const selectedVideos = shuffledVideos.slice(0, 3).map(item => {
      // Extract YouTube thumbnail if available
      let thumbnail = item.thumbnailUrl;
      if (!thumbnail && item.videoRef) {
        const match = item.videoRef.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{6,})/);
        if (match && match[1]) {
          thumbnail = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
        }
      }
      
      return {
        ...item.toJSON(),
        resourceType: 'video',
        link: `/esl-resources/videos/${item.id}`,
        imageRef: thumbnail || 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80'
      };
    });

    const selectedAudios = shuffledAudios.slice(0, 3).map(item => ({
      ...item.toJSON(),
      resourceType: 'audio',
      link: `/esl-resources/audios/${item.id}`,
      imageRef: item.imageUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80'
    }));

    // Combine all selected items
    const allSelected = [
      ...selectedBlogs,
      ...selectedStories,
      ...selectedVideos,
      ...selectedAudios
    ];

    // Shuffle the combined array for final mixed order
    const finalMix = shuffleWithSeed(allSelected, `${today}-final`);

    res.status(200).json({
      success: true,
      message: 'Daily featured resources fetched successfully',
      data: finalMix,
      meta: {
        date: today,
        total: finalMix.length,
        breakdown: {
          blogs: selectedBlogs.length,
          stories: selectedStories.length,
          videos: selectedVideos.length,
          audios: selectedAudios.length
        }
      }
    });

  } catch (error) {
    console.error('Error fetching daily featured resources:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
