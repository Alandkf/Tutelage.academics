// File: models/testQuestion.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const TestQuestion = sequelize.define(
'TestQuestion',
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
testId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
questionText: { type: DataTypes.TEXT, allowNull: false }
},
{
tableName: 'test_questions'
}
);


TestQuestion.associate = (models) => {
TestQuestion.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
TestQuestion.hasMany(models.TestOption, { foreignKey: 'questionId', as: 'options', onDelete: 'CASCADE' });
};


return TestQuestion;
};