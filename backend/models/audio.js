// ============================================================================
// AUDIO MODEL
// ============================================================================
// This model defines the Audio entity for audio content management,
// including audio files, transcripts, PDFs, and author relationships.
// ============================================================================

/**
 * Audio Model Definition
 * Defines the structure and relationships for audio content in the system
 * 
 * @param {Object} sequelize - Sequelize instance
 * @param {Object} DataTypes - Sequelize data types
 * @returns {Object} Audio model
 */
module.exports = (sequelize, DataTypes) => {
  // ============================================================================
  // MODEL DEFINITION
  // ============================================================================
  const Audio = sequelize.define(
    'Audio',
    {
      // Primary key field
      id: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        autoIncrement: true, 
        primaryKey: true,
        comment: 'Unique identifier for the audio content'
      },
      
      // Content identification fields
      title: { 
        type: DataTypes.STRING(250), 
        allowNull: false,
        comment: 'Title of the audio content'
      },
      
      // Content description field
      content: { 
        type: DataTypes.TEXT, 
        allowNull: true,
        comment: 'Description or summary of the audio content'
      },
      
      // Transcript field
      transcript: { 
        type: DataTypes.TEXT, 
        allowNull: true,
        comment: 'Text transcript of the audio content'
      },
      
      // Media reference fields
      audioRef: { 
        type: DataTypes.STRING(500), 
        allowNull: false,
        comment: 'Reference URL or path to the audio file'
      },
      
      pdfRef: { 
        type: DataTypes.STRING(500), 
        allowNull: true,
        comment: 'Reference URL or path to associated PDF document'
      },
      
      // Author relationship field
      createdBy: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        allowNull: false,
        comment: 'Foreign key reference to the user who created this audio'
      }
    },
    {
      tableName: 'audios',
      comment: 'Audio content and multimedia resources'
    }
  );

  // ============================================================================
  // MODEL ASSOCIATIONS
  // ============================================================================
  /**
   * Define relationships between Audio and other models
   * Each audio belongs to a user (author)
   */
  Audio.associate = (models) => {
    Audio.belongsTo(models.User, { 
      foreignKey: 'createdBy', 
      as: 'author',
      onDelete: 'CASCADE'
    });
  };

  return Audio;
};