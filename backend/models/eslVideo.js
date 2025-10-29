// ============================================================================
// ESL VIDEO MODEL
// ============================================================================
// Separate model for ESL Library videos (distinct from skills videos).
// Supports URL-based submission, description, level, and author relations.
// ============================================================================

module.exports = (sequelize, DataTypes) => {
  const EslVideo = sequelize.define(
    'EslVideo',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Unique identifier for ESL video'
      },
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Title of the ESL video'
      },
      videoRef: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: 'Remote URL (e.g., YouTube) or file path'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Short description of the video content'
      },
      pdf: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Optional downloadable worksheet/resource PDF URL'
      },
      thumbnailUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Derived thumbnail (e.g., YouTube thumbnail)'
      },
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
      createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: 'Foreign key to the user who created the ESL video'
      }
    },
    {
      tableName: 'esl_videos',
      comment: 'ESL Library video resources (separate from skills videos)'
    }
  );

  EslVideo.associate = (models) => {
    EslVideo.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'author',
      onDelete: 'CASCADE'
    });
  };

  return EslVideo;
};