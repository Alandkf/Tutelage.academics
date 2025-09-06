// File: models/testOption.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const TestOption = sequelize.define(
'TestOption',
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
questionId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
optionText: { type: DataTypes.STRING(1000), allowNull: false },
isCorrect: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
},
{
tableName: 'test_options'
}
);


TestOption.associate = (models) => {
TestOption.belongsTo(models.TestQuestion, { foreignKey: 'questionId', as: 'question' });
};


return TestOption;
};