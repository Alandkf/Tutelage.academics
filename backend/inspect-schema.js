require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    logging: console.log,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected');

    const [spRows] = await sequelize.query('SHOW search_path;');
    console.log('🔎 search_path rows:', spRows);

    const [schemas] = await sequelize.query("SELECT schema_name FROM information_schema.schemata ORDER BY schema_name;");
    console.log('📚 Schemas:', schemas.map(s => s.schema_name).join(', '));

    const [tables] = await sequelize.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_name = 'blogs' ORDER BY table_schema;");
    console.log('🗄️ blogs tables:', tables.map(t => `${t.table_schema}.${t.table_name}`).join(', ') || 'None');

    const [counts] = await sequelize.query("SELECT table_schema, COUNT(*) FROM information_schema.tables WHERE table_name IN ('blogs','users') GROUP BY table_schema ORDER BY table_schema;");
    console.log('🔢 Table presence by schema:', counts);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await sequelize.close();
    console.log('🔌 Closed');
  }
})();