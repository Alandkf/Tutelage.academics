// ============================================================================
// VIDEO MODEL
// ============================================================================
// This model defines the Video entity for multimedia content management,
// including video titles, references, descriptions, and author relationships.
// ============================================================================

/**
 * Video Model Definition
 * Defines the structure and relationships for video content in the system
 * 
 * @param {Object} sequelize - Sequelize instance
 * @param {Object} DataTypes - Sequelize data types
 * @returns {Object} Video model
 */
module.exports = (sequelize, DataTypes) => {
  // ============================================================================
  // MODEL DEFINITION
  // ============================================================================
  const Video = sequelize.define(
    'Video',
    {
      // Primary key field
      id: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        autoIncrement: true, 
        primaryKey: true,
        comment: 'Unique identifier for the video'
      },
      
      // Content identification fields
      title: { 
        type: DataTypes.STRING(250), 
        allowNull: false,
        comment: 'Title of the video content'
      },
      
      // Media reference field
      videoRef: { 
        type: DataTypes.STRING(500), 
        allowNull: false,
        comment: 'Reference URL or path to the video file'
      },
      
      // Content description field
      description: { 
        type: DataTypes.TEXT, 
        allowNull: true,
        comment: 'Detailed description of the video content'
      },

      // PDF reference for downloadable worksheet or resources
      pdf: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'URL or path to downloadable PDF for this video'
      },

      // Language level field (CEFR-like levels)
      level: {
        type: DataTypes.STRING(32),
        allowNull: true,
        comment: 'Language level for the video (e.g., B1 Intermediate)',
        validate: {
          isIn: [[
            'A1 Beginner',
            'A2 Pre-intermediate',
            'B1 Intermediate',
            'B2 Upper-Intermediate',
            'C1 Advanced',
            'C2 Proficient'
          ]]
        }
      },
      
      // Author relationship field
      createdBy: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        allowNull: false,
        comment: 'Foreign key reference to the user who created this video'
      }
    },
    {
      tableName: 'videos',
      comment: 'Video content and multimedia resources'
    }
  );

  // ============================================================================
  // MODEL ASSOCIATIONS
  // ============================================================================
  /**
   * Define relationships between Video and other models
   * Each video belongs to a user (author)
   */
  Video.associate = (models) => {
    Video.belongsTo(models.User, { 
      foreignKey: 'createdBy', 
      as: 'author',
      onDelete: 'CASCADE'
    });
  };

  return Video;
};