// File: models/test.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const Test = sequelize.define(
'Test',
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
title: { type: DataTypes.STRING(250), allowNull: true },
description: { type: DataTypes.TEXT, allowNull: true },
createdBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
},
{
tableName: 'tests'
}
);


Test.associate = (models) => {
Test.hasMany(models.TestQuestion, { foreignKey: 'testId', as: 'questions', onDelete: 'CASCADE' });
Test.hasMany(models.TestResult, { foreignKey: 'testId', as: 'results', onDelete: 'CASCADE' });
Test.belongsTo(models.User, { foreignKey: 'createdBy', as: 'author' });
};


return Test;
};