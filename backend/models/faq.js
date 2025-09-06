// File: models/faq.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const Faq = sequelize.define(
'Faq',
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
question: { type: DataTypes.STRING(500), allowNull: false },
answer: { type: DataTypes.TEXT, allowNull: false },
orderNumber: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
category: { type: DataTypes.STRING(120), allowNull: true }
},
{
tableName: 'faqs'
}
);


return Faq;
};