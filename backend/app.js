const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
require('dotenv').config();
const { sequelize, Blog } = require('./models');
// import routes
const Videos = require('./routes/videos')
const Blogs = require('./routes/blogs')
const Auth = require('./routes/auth')

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

// Parse cookies
app.use(cookieParser());

// Session configuration
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret-key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true, // Prevent XSS attacks
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // For cross-origin requests
  },
  name: 'tutelage.sid' // Custom session name
}));

// Sync session store
sessionStore.sync();

// Parse JSON request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/videos', Videos)
app.use('/blogs', Blogs)
app.use('/auth', Auth)

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


// Function to seed blog data
const seedBlogs = async () => {
    try {
        const blogCount = await Blog.count();
        if (blogCount === 0) {
            const sampleBlogs = [
                {
                    title: 'Introduction to Web Development',
                    content: 'Web development is the process of creating websites and web applications. It involves both frontend and backend development skills.',
                    imageRef: 'https://example.com/web-dev.jpg',
                    category: 'Technology',
                    createdBy: 1
                },
                {
                    title: 'Understanding Database Design',
                    content: 'Database design is crucial for building scalable applications. Learn about normalization, relationships, and best practices.',
                    imageRef: 'https://example.com/database.jpg',
                    category: 'Database',
                    createdBy: 1
                },
                {
                    title: 'JavaScript ES6 Features',
                    content: 'ES6 introduced many powerful features like arrow functions, destructuring, and promises that make JavaScript more efficient.',
                    imageRef: 'https://example.com/js-es6.jpg',
                    category: 'Programming',
                    createdBy: 1
                },
                {
                    title: 'React Best Practices',
                    content: 'Learn the best practices for building React applications including component structure, state management, and performance optimization.',
                    imageRef: 'https://example.com/react.jpg',
                    category: 'Frontend',
                    createdBy: 1
                },
                {
                    title: 'Node.js and Express Tutorial',
                    content: 'Build powerful backend applications using Node.js and Express framework. Learn about routing, middleware, and API development.',
                    imageRef: 'https://example.com/nodejs.jpg',
                    category: 'Backend',
                    createdBy: 1
                }
            ];

            await Blog.bulkCreate(sampleBlogs);
            console.log('✅ Successfully seeded 5 blog entries to the database!');
        } else {
            console.log(`📊 Blog table already contains ${blogCount} entries. Skipping seeding.`);
        }
    } catch (error) {
        console.error('❌ Error seeding blog data:', error);
    }
};

const PORT = process.env.PORT || 3001;
// { force: true }
sequelize.sync({ force: true })
    .then(async () => {
        // Seed blog data after database sync
        await seedBlogs();
        
        app.listen(PORT, () => {
             console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });