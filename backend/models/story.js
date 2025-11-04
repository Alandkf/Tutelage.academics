// ============================================================================
// STORY MODEL
// ============================================================================
// Defines the Story entity for reading resources with text, audio accompaniment,
// metadata, and author relationship.

module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    'Story',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Unique identifier for the story resource'
      },

      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Title of the story'
      },

      imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Cover image URL for the story'
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Short summary of the story'
      },

      contentText: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Full text content of the story'
      },

      audioRef: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Optional audio accompaniment reference URL'
      },

      pdf: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Optional downloadable PDF resource for the story'
      },

      // Task-specific downloadable PDF (e.g., worksheets or task sheets)
      taskPdf: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Optional URL for task-specific PDF associated with this story'
      },

      wordCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Estimated word count of the story'
      },

      level: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        comment: 'Language levels (e.g., ["B1 Intermediate"])'
      },

      createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: 'Foreign key reference to the user who created this story'
      }
    },
    {
      tableName: 'stories',
      comment: 'Story resources with text, audio accompaniment, and metadata'
    }
  );

  Story.associate = (models) => {
    Story.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'author',
      onDelete: 'CASCADE'
    });
  };

  return Story;
};