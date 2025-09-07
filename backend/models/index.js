// File: models/index.js
// -------------------------
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');


const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';


// Database configuration for Aiven MySQL
const sequelize = new Sequelize(
process.env.DB_NAME || '',
process.env.DB_USER || '',
process.env.DB_PASSWORD || '',
{
host: process.env.DB_HOST || 'localhost',
port: process.env.DB_PORT || 27724,
dialect: 'mysql',
dialectOptions: {
ssl: {
require: true,
rejectUnauthorized: false
}
},
logging: false
}
);

// Test database connection
sequelize.authenticate()
.then(() => {
console.log('✅ Database connection established successfully!');
})
.catch(err => {
console.error('❌ Unable to connect to the database:', err);
});

// Sync database and create tables
sequelize.sync({ force: true })
.then(() => {
console.log('✅ All tables created successfully!');
})
.catch(err => {
console.error('❌ Error creating tables:', err);
});


const db = {};


fs.readdirSync(__dirname)
.filter((file) => {
return (
file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
);
})
.forEach((file) => {
const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
db[model.name] = model;
});


Object.keys(db).forEach((modelName) => {
if (db[modelName].associate) {
db[modelName].associate(db);
}
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('📊 Database models loaded:', Object.keys(db).filter(key => key !== 'sequelize' && key !== 'Sequelize'));

module.exports = db;