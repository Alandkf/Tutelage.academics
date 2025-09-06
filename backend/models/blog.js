// File: models/blog.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const Blog = sequelize.define(
'Blog',
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
title: { type: DataTypes.STRING(250), allowNull: false },
content: { type: DataTypes.TEXT, allowNull: false },
imageRef: { type: DataTypes.STRING(500), allowNull: true },
category: { type: DataTypes.STRING(120), allowNull: true },
createdBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
},
{
tableName: 'blogs'
}
);


Blog.associate = (models) => {
Blog.belongsTo(models.User, { foreignKey: 'createdBy', as: 'author' });
};


return Blog;
};