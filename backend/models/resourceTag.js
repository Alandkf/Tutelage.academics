// ============================================================================
// RESOURCE TAG MODEL
// ============================================================================
// Maps tags to resources (Video, Audio, Story) via polymorphic association.

module.exports = (sequelize, DataTypes) => {
  const ResourceTag = sequelize.define(
    'ResourceTag',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Unique identifier for resource-tag mapping'
      },
      resourceType: {
        type: DataTypes.ENUM('video', 'audio', 'story'),
        allowNull: false,
        comment: 'Resource type this tag applies to'
      },
      resourceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: 'Resource primary key id'
      },
      tagId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: 'Tag primary key id'
      }
    },
    {
      tableName: 'resource_tags',
      comment: 'Join table mapping tags to resources',
      indexes: [
        {
          unique: true,
          fields: ['resourceType', 'resourceId', 'tagId']
        },
        {
          fields: ['tagId']
        }
      ]
    }
  );

  ResourceTag.associate = (models) => {
    ResourceTag.belongsTo(models.Tag, { foreignKey: 'tagId', as: 'tag' });
  };

  return ResourceTag;
};