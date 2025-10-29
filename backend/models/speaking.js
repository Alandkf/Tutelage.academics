// ============================================================================
// SPEAKING MODEL
// ============================================================================
// This model defines the Speaking entity for speaking practice content,
// including video references, transcripts, PDFs, levels, and author relation.
// ============================================================================

/**
 * Speaking Model Definition
 * Defines the structure and relationships for speaking content in the system
 * 
 * @param {Object} sequelize - Sequelize instance
 * @param {Object} DataTypes - Sequelize data types
 * @returns {Object} Speaking model
 */
module.exports = (sequelize, DataTypes) => {
  // ==========================================================================
  // MODEL DEFINITION
  // ==========================================================================
  const Speaking = sequelize.define(
    'Speaking',
    {
      // Primary key field
      id: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        autoIncrement: true, 
        primaryKey: true,
        comment: 'Unique identifier for the speaking content'
      },

      // Content identification fields
      title: { 
        type: DataTypes.STRING(250), 
        allowNull: false,
        comment: 'Title of the speaking content'
      },

      // Optional description field
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Short description or summary of the speaking content'
      },

      // Transcript field
      transcript: { 
        type: DataTypes.TEXT, 
        allowNull: true,
        comment: 'Text transcript of the speaking video'
      },

      // Media reference fields
      videoRef: { 
        type: DataTypes.STRING(500), 
        allowNull: false,
        comment: 'Reference URL or path to the speaking video'
      },

      // PDF reference for downloadable worksheet/notes
      pdf: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'URL or path to downloadable PDF for this speaking content'
      },

      // Language level field (CEFR-like levels)
      level: {
        type: DataTypes.STRING(32),
        allowNull: true,
        comment: 'Language level (e.g., B1 Intermediate)',
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
        comment: 'Foreign key reference to the user who created this speaking content'
      }
    },
    {
      tableName: 'speakings',
      comment: 'Speaking practice content and multimedia resources'
    }
  );

  // ==========================================================================
  // MODEL ASSOCIATIONS
  // ==========================================================================
  /**
   * Define relationships between Speaking and other models
   * Each speaking content belongs to a user (author)
   */
  Speaking.associate = (models) => {
    Speaking.belongsTo(models.User, { 
      foreignKey: 'createdBy', 
      as: 'author',
      onDelete: 'CASCADE'
    });
  };

  return Speaking;
};