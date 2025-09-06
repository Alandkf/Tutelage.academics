// File: models/index.js
// -------------------------
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');


const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';


// Configuration is minimal and picks values from environment variables.
// Make sure the following env vars exist in your environment or .env:
// DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT


const sequelize = new Sequelize(
process.env.DB_NAME || 'Tutelage.academics',
process.env.DB_USER || 'root',
process.env.DB_PASS || '(Aland&DB)',
{
host: process.env.DB_HOST || 'localhost',
// port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
dialect: 'mysql',
// logging: process.env.SEQ_LOG === 'true' ? console.log : false,
// define: {
// underscored: true,
// freezeTableName: false,
// timestamps: true
// }
}
);


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


module.exports = db;