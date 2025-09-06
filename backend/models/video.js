// File: models/video.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const Video = sequelize.define(
'Video',
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
title: { type: DataTypes.STRING(250), allowNull: false },
videoRef: { type: DataTypes.STRING(500), allowNull: false },
description: { type: DataTypes.TEXT, allowNull: true },
createdBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
},
{
tableName: 'videos'
}
);


Video.associate = (models) => {
Video.belongsTo(models.User, { foreignKey: 'createdBy', as: 'author' });
};


return Video;
};