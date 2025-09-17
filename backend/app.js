// ============================================================================
// TUTELAGE ACADEMICS - BACKEND SERVER
// ============================================================================
// Main application server for the Tutelage Academics platform
// Handles authentication, content management, and API endpoints

// Core Dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const bcrypt = require('bcrypt');

// Environment Configuration
require('dotenv').config();

// Database Models
const { sequelize, Blog, User } = require('./models');

// Route modules
const videoRoutes = require('./routes/videos');
const blogRoutes = require('./routes/blogs');
const audioRoutes = require('./routes/audios');
const courseRoutes = require('./routes/courses');
const testRoutes = require('./routes/tests');
const faqRoutes = require('./routes/faqs');
const appointmentRoutes = require('./routes/appointments');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// ============================================================================
// EXPRESS APPLICATION SETUP
// ============================================================================

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const SERVER_PORT = process.env.PORT || 3001;

// ============================================================================
// CORS CONFIGURATION
// ============================================================================
// Configure Cross-Origin Resource Sharing for frontend communication

app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
}));

// Additional CORS headers middleware for enhanced compatibility
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// ============================================================================
// MIDDLEWARE CONFIGURATION
// ============================================================================

// Cookie parsing middleware
app.use(cookieParser());

// Session store configuration using Sequelize
const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: 'Sessions',
  checkExpirationInterval: 15 * 60 * 1000, // Check every 15 minutes
  expiration: 24 * 60 * 60 * 1000 // 24 hours
});

// Session configuration with security settings
const SESSION_CONFIG = {
  secret: process.env.SESSION_SECRET || 'your-session-secret-key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true, // Prevent XSS attacks
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  },
  name: 'tutelage.sid' // Custom session identifier
};

app.use(session(SESSION_CONFIG));

// Request body parsing middleware
app.use(bodyParser.json({ limit: '10mb' })); // JSON parser with size limit
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // URL-encoded parser

// ============================================================================
// API ROUTES CONFIGURATION
// ============================================================================
// Mount route handlers for different API endpoints

// API Routes
app.use('/api/videos', videoRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/audios', audioRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// ============================================================================
// BASIC API ENDPOINTS
// ============================================================================

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: 'Tutelage Academics API Server',
        version: '1.0.0',
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

// API status endpoint
app.get('/api/status', (req, res) => {
    res.json({ 
        success: true,
        message: 'API is operational',
        endpoints: {
            auth: '/auth',
            blogs: '/blogs',
            videos: '/videos',
            users: '/users'
        }
    });
});


// ============================================================================
// DATABASE SEEDING FUNCTIONS
// ============================================================================

/**
 * Seeds the database with a default admin user if no users exist
 * @returns {Promise<number|null>} The ID of the admin user or null if error
 */
const seedDefaultAdminUser = async () => {
    try {
        const existingUserCount = await User.count();
        
        if (existingUserCount === 0) {
            const DEFAULT_ADMIN_PASSWORD = 'admin123';
            const BCRYPT_SALT_ROUNDS = 12;
            
            const hashedAdminPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, BCRYPT_SALT_ROUNDS);
            
            const defaultAdminUser = await User.create({
                name: 'System Administrator',
                email: 'admin@tutelage.com',
                passwordHash: hashedAdminPassword,
                role: 'ADMIN'
            });
            
            console.log('✅ Successfully created default admin user!');
            console.log(`📧 Admin Email: admin@tutelage.com`);
            console.log(`🔑 Admin Password: ${DEFAULT_ADMIN_PASSWORD}`);
            
            return defaultAdminUser.id;
        } else {
            console.log(`📊 User table contains ${existingUserCount} entries. Skipping user seeding.`);
            const firstExistingUser = await User.findOne();
            return firstExistingUser.id;
        }
    } catch (error) {
        console.error('❌ Error seeding default admin user:', error);
        return null;
    }
};

/**
 * Seeds the database with sample blog posts if no blogs exist
 * @param {number} adminUserId - The ID of the admin user to associate with blogs
 * @returns {Promise<void>}
 */
const seedSampleBlogPosts = async (adminUserId) => {
    try {
        const existingBlogCount = await Blog.count();
        
        if (existingBlogCount === 0) {
            const SAMPLE_BLOG_POSTS = [
                {
                    title: 'Introduction to Web Development',
<<<<<<< HEAD
                    content: 'Web development is the process of creating websites and web applications. It involves both frontend and backend development skills.',
                    imageRef: 'https://plus.unsplash.com/premium_photo-1685086785054-d047cdc0e525?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
=======
                    content: 'Web development is the process of creating websites and web applications. It involves both frontend and backend development skills, covering everything from user interface design to server-side logic and database management.',
                    imageRef: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
>>>>>>> 74030718cda52f4301db2804aba8afc321fc0e1c
                    category: 'Technology',
                    createdBy: adminUserId
                },
                {
<<<<<<< HEAD
                    title: 'Understanding Database Design',
                    content: 'Database design is crucial for building scalable applications. Learn about normalization, relationships, and best practices.',
                    imageRef: 'https://plus.unsplash.com/premium_photo-1664297989345-f4ff2063b212?q=80&w=1098&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
=======
                    title: 'Understanding Database Design Principles',
                    content: 'Database design is crucial for building scalable applications. Learn about normalization, relationships, indexing strategies, and best practices for creating efficient and maintainable database schemas.',
                    imageRef: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
>>>>>>> 74030718cda52f4301db2804aba8afc321fc0e1c
                    category: 'Database',
                    createdBy: adminUserId
                },
                {
<<<<<<< HEAD
                    title: 'JavaScript ES6 Features',
                    content: 'ES6 introduced many powerful features like arrow functions, destructuring, and promises that make JavaScript more efficient.',
                    imageRef: 'https://plus.unsplash.com/premium_photo-1661882403999-46081e67c401?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
=======
                    title: 'Modern JavaScript ES6+ Features',
                    content: 'ES6 and beyond introduced many powerful features like arrow functions, destructuring, promises, async/await, and modules that make JavaScript more efficient and developer-friendly.',
                    imageRef: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
>>>>>>> 74030718cda52f4301db2804aba8afc321fc0e1c
                    category: 'Programming',
                    createdBy: adminUserId
                },
                {
<<<<<<< HEAD
                    title: 'React Best Practices',
                    content: 'Learn the best practices for building React applications including component structure, state management, and performance optimization.',
                    imageRef: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
=======
                    title: 'React Development Best Practices',
                    content: 'Learn the best practices for building React applications including component structure, state management, performance optimization, testing strategies, and modern development patterns.',
                    imageRef: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
>>>>>>> 74030718cda52f4301db2804aba8afc321fc0e1c
                    category: 'Frontend',
                    createdBy: adminUserId
                },
                {
<<<<<<< HEAD
                    title: 'Node.js and Express Tutorial',
                    content: 'Build powerful backend applications using Node.js and Express framework. Learn about routing, middleware, and API development.',
                    imageRef: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
=======
                    title: 'Node.js and Express Framework Guide',
                    content: 'Build powerful backend applications using Node.js and Express framework. Learn about routing, middleware, API development, authentication, and deployment strategies.',
                    imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
>>>>>>> 74030718cda52f4301db2804aba8afc321fc0e1c
                    category: 'Backend',
                    createdBy: adminUserId
                }
            ];

            await Blog.bulkCreate(SAMPLE_BLOG_POSTS);
            console.log(`✅ Successfully seeded ${SAMPLE_BLOG_POSTS.length} sample blog posts!`);
        } else {
            console.log(`📊 Blog table contains ${existingBlogCount} entries. Skipping blog seeding.`);
        }
    } catch (error) {
        console.error('❌ Error seeding sample blog posts:', error);
    }
};

// ============================================================================
// SERVER INITIALIZATION
// ============================================================================

/**
 * Initialize the database, sync models, seed data, and start the server
 */
const initializeServer = async () => {
    try {
        console.log('🔄 Initializing Tutelage Academics Server...');
        
        // Sync database models (WARNING: force: true drops existing tables)
        const FORCE_DB_RESET = process.env.NODE_ENV === 'development';
        await sequelize.sync({ force: FORCE_DB_RESET });
        console.log('✅ Database models synchronized successfully');
        
        // Initialize session store
        await sessionStore.sync();
        console.log('✅ Session store initialized successfully');
        
        // Seed database with initial data
        console.log('🌱 Starting database seeding process...');
        const adminUserId = await seedDefaultAdminUser();
        
        if (adminUserId) {
            await seedSampleBlogPosts(adminUserId);
        } else {
            console.log('⚠️  Skipping blog seeding due to admin user creation failure');
        }
        
        // Start the Express server
        app.listen(SERVER_PORT, () => {
            console.log('\n' + '='.repeat(60));
            console.log('🚀 TUTELAGE ACADEMICS SERVER STARTED SUCCESSFULLY!');
            console.log('='.repeat(60));
            console.log(`📡 Server running on: http://localhost:${SERVER_PORT}`);
            console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
            console.log(`🗄️  Database: Connected and synced`);
            console.log(`🔐 Session store: Active`);
            console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log('='.repeat(60) + '\n');
        });
        
    } catch (error) {
        console.error('\n' + '❌'.repeat(20));
        console.error('💥 FATAL ERROR: Failed to initialize server');
        console.error('❌'.repeat(20));
        console.error('Error details:', error);
        console.error('❌'.repeat(20) + '\n');
        process.exit(1);
    }
};

// Start the server initialization process
initializeServer();