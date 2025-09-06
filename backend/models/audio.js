// File: models/audio.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const Audio = sequelize.define(
'Audio',
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
title: { type: DataTypes.STRING(250), allowNull: false },
content: { type: DataTypes.TEXT, allowNull: true },
transcript: { type: DataTypes.TEXT, allowNull: true },
audioRef: { type: DataTypes.STRING(500), allowNull: false },
pdfRef: { type: DataTypes.STRING(500), allowNull: true },
createdBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
},
{
tableName: 'audios'
}
);


Audio.associate = (models) => {
Audio.belongsTo(models.User, { foreignKey: 'createdBy', as: 'author' });
};


return Audio;
};