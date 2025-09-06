// File: models/appointment.js
// -------------------------
module.exports = (sequelize, DataTypes) => {
const Appointment = sequelize.define(
'Appointment',
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
firstName: { type: DataTypes.STRING(150), allowNull: false },
lastName: { type: DataTypes.STRING(150), allowNull: false },
age: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
country: { type: DataTypes.STRING(150), allowNull: true },
jobTitle: { type: DataTypes.STRING(200), allowNull: true },
purpose: { type: DataTypes.TEXT, allowNull: true },
status: { type: DataTypes.ENUM('PENDING', 'CONTACTED', 'SCHEDULED', 'DONE'), allowNull: false, defaultValue: 'PENDING' }
},
{
tableName: 'appointments'
}
);


return Appointment;
};