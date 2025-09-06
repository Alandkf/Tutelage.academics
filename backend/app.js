const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
// const { sequelize } = require('./models');
const { sequelize } = require('./models');
// import routes
const Videos = require('./routes/videos')

const app = express();

// Middleware to enable CORS - must be before routes
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Add additional headers for CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Parse JSON request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/videos', Videos)

const NEXT_PUBLIC_API_URL = 'http://localhost:3000'; // Replace with your Next.js app URL

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// app.get('/videos', (req, res) => {
//     res.json({ message: `1st: Contacting Next.js at ${NEXT_PUBLIC_API_URL}` });
// });

app.get('/first', (req, res) => {
    res.json({ message: `2nd: Contacting Next.js at ${NEXT_PUBLIC_API_URL}` });
});


const PORT = process.env.PORT || 3001;
// { force: true }
sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });