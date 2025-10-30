// ============================================================================
// TAG MODEL
// ============================================================================
// Defines tags used for categorization across resource libraries.

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Unique identifier for the tag'
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
        comment: 'Tag name'
      },
      namespace: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'Optional namespace (e.g., video, audio, story, common)'
      }
    },
    {
      tableName: 'tags',
      comment: 'Predefined tags for categorization'
    }
  );

  return Tag;
};