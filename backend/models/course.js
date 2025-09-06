// File: models/course.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const Course = sequelize.define(
'Course',
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
category: { type: DataTypes.STRING(150), allowNull: true },
title: { type: DataTypes.STRING(250), allowNull: false },
description: { type: DataTypes.TEXT, allowNull: true },
introVideoRef: { type: DataTypes.STRING(500), allowNull: true },
createdBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
},
{
tableName: 'courses'
}
);


Course.associate = (models) => {
Course.belongsTo(models.User, { foreignKey: 'createdBy', as: 'author' });
};


return Course;
};