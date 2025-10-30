// ============================================================================
// RESOURCE ANALYTICS MODEL
// ============================================================================
// Aggregated usage counters per resource (views, plays, downloads).

module.exports = (sequelize, DataTypes) => {
  const ResourceAnalytics = sequelize.define(
    'ResourceAnalytics',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Unique identifier for analytics row'
      },
      resourceType: {
        type: DataTypes.ENUM('video', 'audio', 'story'),
        allowNull: false,
        comment: 'Type of resource tracked'
      },
      resourceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: 'Resource primary key id'
      },
      views: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: 'Number of views'
      },
      plays: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: 'Number of plays (video/audio)'
      },
      downloads: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: 'Number of downloads'
      }
    },
    {
      tableName: 'resource_analytics',
      comment: 'Aggregated usage metrics for resources',
      indexes: [
        { unique: true, fields: ['resourceType', 'resourceId'] },
        { fields: ['views'] },
        { fields: ['plays'] }
      ]
    }
  );

  return ResourceAnalytics;
};