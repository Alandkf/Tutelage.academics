// File: models/user.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const User = sequelize.define(
'User',
{
id: {
type: DataTypes.INTEGER.UNSIGNED,
autoIncrement: true,
primaryKey: true
},
name: {
type: DataTypes.STRING(150),
allowNull: false
},
email: {
type: DataTypes.STRING(200),
allowNull: false,
unique: true,
validate: { isEmail: true }
},
passwordHash: {
type: DataTypes.STRING(300),
allowNull: false
},
role: {
type: DataTypes.ENUM('MAIN_MANAGER', 'ADMIN'),
allowNull: false,
defaultValue: 'ADMIN'
}
},
{
tableName: 'users'
}
);


User.associate = (models) => {
User.hasMany(models.Blog, { foreignKey: 'createdBy', as: 'blogs' });
User.hasMany(models.Audio, { foreignKey: 'createdBy', as: 'audios' });
User.hasMany(models.Video, { foreignKey: 'createdBy', as: 'videos' });
User.hasMany(models.Course, { foreignKey: 'createdBy', as: 'courses' });
User.hasMany(models.Test, { foreignKey: 'createdBy', as: 'tests' });
};


return User;
};