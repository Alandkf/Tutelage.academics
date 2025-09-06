// File: models/testResult.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const TestResult = sequelize.define(
'TestResult',
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
testId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
testerEmail: { type: DataTypes.STRING(200), allowNull: false },
score: { type: DataTypes.FLOAT.UNSIGNED || DataTypes.INTEGER, allowNull: true },
submittedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
},
{
tableName: 'test_results',
timestamps: false
}
);


TestResult.associate = (models) => {
TestResult.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
};


return TestResult;
};