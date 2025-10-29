// ============================================================================
// WRITING MODEL
// ============================================================================
// This model defines the Writing entity for writing practice content,
// including prompts, sample answers, rubrics, PDFs, levels, and author relation.
// ============================================================================

/**
 * Writing Model Definition
 * Defines the structure and relationships for writing content in the system
 * 
 * @param {Object} sequelize - Sequelize instance
 * @param {Object} DataTypes - Sequelize data types
 * @returns {Object} Writing model
 */
module.exports = (sequelize, DataTypes) => {
  // ==========================================================================
  // MODEL DEFINITION
  // ==========================================================================
  const Writing = sequelize.define(
    'Writing',
    {
      // Primary key field
      id: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        autoIncrement: true, 
        primaryKey: true,
        comment: 'Unique identifier for the writing content'
      },

      // Content identification fields
      title: { 
        type: DataTypes.STRING(250), 
        allowNull: false,
        comment: 'Title of the writing exercise'
      },

      // Writing prompt
      prompt: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Prompt or task description for the writing exercise'
      },

      // Optional content (guidance, notes)
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Optional guidance or descriptive content for the exercise'
      },

      // Sample answer (model response)
      sampleAnswer: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Example answer for the writing exercise'
      },

      // Rubric or grading criteria
      rubric: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Assessment rubric or scoring criteria'
      },

      // PDF reference for downloadable worksheet
      pdf: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'URL or path to downloadable PDF for this writing content'
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
        comment: 'Foreign key reference to the user who created this writing content'
      }
    },
    {
      tableName: 'writings',
      comment: 'Writing practice exercises and resources'
    }
  );

  // ==========================================================================
  // MODEL ASSOCIATIONS
  // ==========================================================================
  /**
   * Define relationships between Writing and other models
   * Each writing content belongs to a user (author)
   */
  Writing.associate = (models) => {
    Writing.belongsTo(models.User, { 
      foreignKey: 'createdBy', 
      as: 'author',
      onDelete: 'CASCADE'
    });
  };

  return Writing;
};