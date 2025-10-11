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
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

// Environment Configuration
require('dotenv').config();

// Database Models - COMMENTED OUT FOR NOW
// const { sequelize } = require('./models');

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
const enrollmentRoutes = require('./routes/enrollment');


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

// Additional CORS headers for complex requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// ============================================================================
// MIDDLEWARE CONFIGURATION
// ============================================================================

app.use(cookieParser());

// Session store configuration - USING MEMORY STORE FOR NOW
// const sessionStore = new SequelizeStore({
//   db: sequelize,
//   tableName: 'Sessions',
//   checkExpirationInterval: 15 * 60 * 1000, // Check every 15 minutes
//   expiration: 24 * 60 * 60 * 1000 // 24 hours
// });

// Session configuration - USING MEMORY STORE
const SESSION_CONFIG = {
  secret: process.env.SESSION_SECRET || 'your-session-secret-key',
  // store: sessionStore, // COMMENTED OUT - using default memory store
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

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' })); // JSON parser with size limit
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // URL-encoded parser

// ============================================================================
// API ROUTES
// ============================================================================

app.use('/api/videos', videoRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/audios', audioRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/enrollment', enrollmentRoutes);


// ============================================================================
// HEALTH CHECK ENDPOINTS
// ============================================================================

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Tutelage Academics Backend Server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: 'disabled (running without database)'
  });
});

// Health check endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'healthy',
    database: 'disabled',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '1.0.0'
  });
});

// ============================================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================================

// Global error handler (add this before server initialization)
app.use((err, req, res, next) => {
  console.error('🚨 Global error handler:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});



// ============================================================================
// SERVER INITIALIZATION - SIMPLIFIED WITHOUT DATABASE
// ============================================================================

/**
 * Initialize the server without database connection
 */
const initializeServer = async () => {
    try {
        console.log('🔄 Initializing Tutelage Academics Server (No Database)...');
        
        // SKIP DATABASE CONNECTION FOR NOW
        console.log('⚠️  Database connection skipped - running without database');
        
        // SKIP SESSION STORE SYNC
        // await sessionStore.sync();
        console.log('⚠️  Using memory session store (sessions will not persist)');
        
        // Start the Express server
        app.listen(SERVER_PORT, () => {
            console.log('\n' + '='.repeat(60));
            console.log('🚀 TUTELAGE ACADEMICS SERVER STARTED SUCCESSFULLY!');
            console.log('='.repeat(60));
            console.log(`📡 Server running on: http://localhost:${SERVER_PORT}`);
            console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
            console.log(`🗄️  Database: DISABLED (running without database)`);
            console.log(`🔐 Session store: Memory only (not persistent)`);
            console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
            console.log('='.repeat(60) + '\n');
            
            console.log('💡 NOTE: Server is running without database connection');
            console.log('💡 Most API endpoints will not work until database is connected');
            console.log('💡 Email enrollment service should work if credentials are configured\n');
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