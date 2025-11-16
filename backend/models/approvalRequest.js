module.exports = (sequelize, DataTypes) => {
  const ApprovalRequest = sequelize.define(
    'ApprovalRequest',
    {
      resourceType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resourceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      action: {
        type: DataTypes.STRING, // e.g., 'UPDATE', 'DELETE', 'CREATE'
        allowNull: false,
      },
      payload: {
        // JSON with requested changes or creation data
        type: DataTypes.JSON,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING, // 'PENDING' | 'APPROVED' | 'REJECTED'
        allowNull: false,
        defaultValue: 'PENDING',
      },
      requestedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      approvedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      indexes: [
        { fields: ['resourceType', 'resourceId'] },
        { fields: ['status'] },
        { fields: ['requestedBy'] },
      ],
    }
  );

  ApprovalRequest.associate = (models) => {
    ApprovalRequest.belongsTo(models.User, {
      foreignKey: 'requestedBy',
      as: 'requester',
    });
    ApprovalRequest.belongsTo(models.User, {
      foreignKey: 'approvedBy',
      as: 'approver',
    });
  };

  return ApprovalRequest;
};