// ============================================================================
// TUTELAGE ACADEMICS - DATABASE SEEDING SCRIPT
// ============================================================================
// Comprehensive seeding script to populate all database tables with sample data
// This ensures the frontend has data to display across all sections

// Load environment variables first
require('dotenv').config();

const bcrypt = require('bcrypt');
const { sequelize, User, Blog, Video, Audio, Course, Test, Faq, Appointment } = require('./models');

// ============================================================================
// CONFIGURATION
// ============================================================================

const BCRYPT_SALT_ROUNDS = 12;
const DEFAULT_ADMIN_PASSWORD = '12121212';
const DEFAULT_USER_PASSWORD = 'user123';

// ============================================================================
// USER SEEDING DATA
// ============================================================================

const SEED_USERS = [
    {
        name: 'System Administrator',
        email: 'admin@tutelage.com',
        role: 'MAIN_MANAGER',
        password: DEFAULT_ADMIN_PASSWORD
    },
    {
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@tutelage.com',
        role: 'ADMIN',
        password: DEFAULT_ADMIN_PASSWORD
    },
    {
        name: 'John Smith',
        email: 'john.smith@example.com',
        role: 'ADMIN',
        password: DEFAULT_USER_PASSWORD
    },
    {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        role: 'ADMIN',
        password: DEFAULT_USER_PASSWORD
    },
    {
        name: 'Rekar',
        email: 'r@gmail.com',
        role: 'ADMIN',
        password: DEFAULT_ADMIN_PASSWORD
    },
    {
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        role: 'ADMIN',
        password: DEFAULT_USER_PASSWORD
    }
];

// ============================================================================
// BLOG SEEDING DATA
// ============================================================================

const SEED_BLOGS = [
    {
        title: 'Introduction to Web Development',
        content: 'Web development is the process of creating websites and web applications. It involves both frontend and backend development skills, covering everything from user interface design to server-side logic and database management. In this comprehensive guide, we\'ll explore the fundamental concepts, tools, and technologies that every aspiring web developer should know.',
        imageRef: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        category: 'Technology'
    },
    {
        title: 'Understanding Database Design Principles',
        content: 'Database design is crucial for building scalable applications. Learn about normalization, relationships, indexing strategies, and best practices for creating efficient and maintainable database schemas. This article covers everything from basic concepts to advanced optimization techniques.',
        imageRef: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60',
        category: 'Database'
    },
    {
        title: 'Modern JavaScript ES6+ Features',
        content: 'ES6 and beyond introduced many powerful features like arrow functions, destructuring, promises, async/await, and modules that make JavaScript more efficient and developer-friendly. Discover how these features can improve your code quality and development experience.',
        imageRef: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=60',
        category: 'Programming'
    },
    {
        title: 'React Development Best Practices',
        content: 'Learn the best practices for building React applications including component structure, state management, performance optimization, testing strategies, and modern development patterns. This guide will help you write cleaner, more maintainable React code.',
        imageRef: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        category: 'Frontend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'Node.js Backend Development Guide',
        content: 'Master backend development with Node.js. Learn about Express.js, middleware, authentication, database integration, API design, and deployment strategies. Build robust and scalable server-side applications.',
        imageRef: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        category: 'Backend'
    },
    {
        title: 'CSS Grid and Flexbox Mastery',
        content: 'Modern CSS layout techniques using Grid and Flexbox. Learn how to create responsive, flexible layouts that work across all devices. Includes practical examples and real-world use cases.',
        imageRef: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
        category: 'CSS'
    }
];

// ============================================================================
// VIDEO SEEDING DATA
// ============================================================================

const SEED_VIDEOS = [
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
    {
        title: 'Introduction to Calculus',
        videoRef: 'https://youtu.be/XCaCD7Yn8AI?si=80P4WEcsETpTNt22',
        description: 'A comprehensive introduction to calculus concepts including limits, derivatives, and integrals.'
    },
];

// ============================================================================
// AUDIO SEEDING DATA
// ============================================================================

const SEED_AUDIOS = [
    {
        title: 'Programming Podcast - Clean Code Principles',
        description: 'Discussion about writing clean, maintainable code and best practices for software development.',
        audioRef: 'https://www.soundcloud.com/example/clean-code-principles',
        thumbnailUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=60',
        duration: '45:30',
        category: 'Programming'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Tech Talk - Future of Web Development',
        description: 'Exploring emerging trends and technologies shaping the future of web development.',
        audioRef: 'https://www.soundcloud.com/example/future-web-dev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        duration: '38:45',
        category: 'Technology'
    },
    {
        title: 'Career Advice - Breaking into Tech',
        description: 'Practical advice for newcomers looking to start their career in technology and programming.',
        audioRef: 'https://www.soundcloud.com/example/breaking-into-tech',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60',
        duration: '42:20',
        category: 'Career'
    },
    {
        title: 'JavaScript Deep Dive - Async Programming',
        description: 'Advanced concepts in JavaScript asynchronous programming, promises, and async/await.',
        audioRef: 'https://www.soundcloud.com/example/js-async-programming',
        thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=60',
        duration: '35:15',
        category: 'JavaScript'
    }
];

// ============================================================================
// COURSE SEEDING DATA
// ============================================================================

const SEED_COURSES = [
    {
        title: 'Complete Web Development Bootcamp',
        description: 'A comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and database management. Perfect for beginners looking to become full-stack developers.',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
        price: 199.99,
        duration: '12 weeks',
        level: 'Beginner',
        category: 'Web Development'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Advanced React Development',
        description: 'Master advanced React concepts including hooks, context, performance optimization, testing, and modern development patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        price: 149.99,
        duration: '8 weeks',
        level: 'Advanced',
        category: 'Frontend'
    },
    {
        title: 'Database Design and Management',
        description: 'Learn database design principles, SQL, NoSQL databases, optimization techniques, and data modeling best practices.',
        imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60',
        price: 129.99,
        duration: '6 weeks',
        level: 'Intermediate',
        category: 'Database'
    },
    {
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js, Express, authentication, API design, and deployment strategies.',
        imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
        price: 159.99,
        duration: '10 weeks',
        level: 'Intermediate',
        category: 'Backend'
    },
    {
        title: 'Modern CSS and Responsive Design',
        description: 'Master modern CSS techniques, Grid, Flexbox, animations, and responsive design principles for all devices.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
        price: 99.99,
        duration: '5 weeks',
        level: 'Beginner',
        category: 'CSS'
    }
];

// ============================================================================
// TEST SEEDING DATA
// ============================================================================

const SEED_TESTS = [
    {
        title: 'JavaScript Fundamentals Quiz',
        description: 'Test your knowledge of JavaScript basics including variables, functions, and control structures.',
        questions: JSON.stringify([
            {
                question: 'What is the correct way to declare a variable in JavaScript?',
                options: ['var myVar;', 'variable myVar;', 'v myVar;', 'declare myVar;'],
                correctAnswer: 0
            },
            {
                question: 'Which method is used to add an element to the end of an array?',
                options: ['push()', 'add()', 'append()', 'insert()'],
                correctAnswer: 0
            },
            {
                question: 'What does "=== " operator do in JavaScript?',
                options: ['Assignment', 'Equality without type checking', 'Strict equality with type checking', 'Not equal'],
                correctAnswer: 2
            }
        ]),
        duration: 15,
        category: 'JavaScript',
        difficulty: 'Beginner'
    },
    {
        title: 'React Components Assessment',
        description: 'Evaluate your understanding of React components, props, and state management.',
        questions: JSON.stringify([
            {
                question: 'What is JSX in React?',
                options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A CSS framework', 'A database'],
                correctAnswer: 1
            },
            {
                question: 'How do you pass data from parent to child component?',
                options: ['Using state', 'Using props', 'Using context', 'Using refs'],
                correctAnswer: 1
            },
            {
                question: 'Which hook is used for managing component state?',
                options: ['useEffect', 'useState', 'useContext', 'useReducer'],
                correctAnswer: 1
            }
        ]),
        duration: 20,
        category: 'React',
        difficulty: 'Intermediate'
    },
    {
        title: 'CSS Layout Mastery Test',
        description: 'Test your knowledge of CSS layout techniques including Flexbox and Grid.',
        questions: JSON.stringify([
            {
                question: 'Which CSS property is used to create a flex container?',
                options: ['display: flex', 'flex: container', 'layout: flex', 'container: flex'],
                correctAnswer: 0
            },
            {
                question: 'What does "justify-content: center" do in Flexbox?',
                options: ['Centers items vertically', 'Centers items horizontally', 'Centers items both ways', 'Does nothing'],
                correctAnswer: 1
            },
            {
                question: 'Which CSS Grid property defines the number of columns?',
                options: ['grid-columns', 'grid-template-columns', 'columns', 'grid-column-count'],
                correctAnswer: 1
            }
        ]),
        duration: 18,
        category: 'CSS',
        difficulty: 'Intermediate'
    }
];

// ============================================================================
// FAQ SEEDING DATA
// ============================================================================

const SEED_FAQS = [
    {
        question: 'How do I get started with web development?',
        answer: 'Start with the basics: HTML for structure, CSS for styling, and JavaScript for interactivity. Practice building simple projects and gradually work your way up to more complex applications. Our Complete Web Development Bootcamp is perfect for beginners.',
        category: 'Getting Started'
    },
    {
        question: 'What is the difference between frontend and backend development?',
        answer: 'Frontend development focuses on the user interface and user experience - what users see and interact with. Backend development handles server-side logic, databases, and APIs - the behind-the-scenes functionality that powers applications.',
        category: 'General'
    },
    {
        question: 'How long does it take to learn programming?',
        answer: 'The timeline varies depending on your goals and dedication. Basic programming concepts can be learned in a few months with consistent practice. Becoming proficient enough for a job typically takes 6-12 months of focused learning and practice.',
        category: 'Learning'
    },
    {
        question: 'Which programming language should I learn first?',
        answer: 'For web development, start with JavaScript as it works for both frontend and backend. For general programming, Python is beginner-friendly. The choice depends on your goals - web development, mobile apps, data science, etc.',
        category: 'Programming Languages'
    },
    {
        question: 'Which programming language should I learn first?',
        answer: 'For web development, start with JavaScript as it works for both frontend and backend. For general programming, Python is beginner-friendly. The choice depends on your goals - web development, mobile apps, data science, etc.',
        category: 'Programming Languages'
    },
    {
        question: 'Which programming language should I learn first?',
        answer: 'For web development, start with JavaScript as it works for both frontend and backend. For general programming, Python is beginner-friendly. The choice depends on your goals - web development, mobile apps, data science, etc.',
        category: 'Programming Languages'
    },
    {
        question: 'Which programming language should I learn first?',
        answer: 'For web development, start with JavaScript as it works for both frontend and backend. For general programming, Python is beginner-friendly. The choice depends on your goals - web development, mobile apps, data science, etc.',
        category: 'Programming Languages'
    },
    {
        question: 'Which programming language should I learn first?',
        answer: 'For web development, start with JavaScript as it works for both frontend and backend. For general programming, Python is beginner-friendly. The choice depends on your goals - web development, mobile apps, data science, etc.',
        category: 'Programming Languages'
    },
    {
        question: 'Which programming language should I learn first?',
        answer: 'For web development, start with JavaScript as it works for both frontend and backend. For general programming, Python is beginner-friendly. The choice depends on your goals - web development, mobile apps, data science, etc.',
        category: 'Programming Languages'
    },
    {
        question: 'Which programming language should I learn first?',
        answer: 'For web development, start with JavaScript as it works for both frontend and backend. For general programming, Python is beginner-friendly. The choice depends on your goals - web development, mobile apps, data science, etc.',
        category: 'Programming Languages'
    },
    {
        question: 'Which programming language should I learn first?',
        answer: 'For web development, start with JavaScript as it works for both frontend and backend. For general programming, Python is beginner-friendly. The choice depends on your goals - web development, mobile apps, data science, etc.',
        category: 'Programming Languages'
    },
    {
        question: 'Do I need a computer science degree to become a developer?',
        answer: 'No, a computer science degree is not required. Many successful developers are self-taught or have completed bootcamps. What matters most is your skills, portfolio, and ability to solve problems. Employers increasingly focus on practical skills over formal education.',
        category: 'Career'
    },
    {
        question: 'How do I build a portfolio as a beginner?',
        answer: 'Start with simple projects and gradually increase complexity. Include a personal website, a few web applications, and any projects that demonstrate your skills. Use GitHub to showcase your code and deploy your projects so others can see them live.',
        category: 'Portfolio'
    },
    {
        question: 'What tools do I need for web development?',
        answer: 'Essential tools include a code editor (VS Code is popular), a web browser for testing, Git for version control, and Node.js for JavaScript development. As you progress, you might add frameworks, databases, and deployment tools.',
        category: 'Tools'
    },
    {
        question: 'How do I stay updated with new technologies?',
        answer: 'Follow tech blogs, join developer communities, attend meetups or conferences, and practice with new technologies through side projects. Focus on fundamentals first, then gradually explore new frameworks and tools.',
        category: 'Learning'
    }
];

// ============================================================================
// SEEDING FUNCTIONS
// ============================================================================

/**
 * Seed users with hashed passwords
 */
const seedUsers = async () => {
    try {
        const existingUserCount = await User.count();
        if (existingUserCount > 0) {
            console.log(`📊 Users table contains ${existingUserCount} entries. Skipping user seeding.`);
            return await User.findAll();
        }

        console.log('🔄 Seeding users...');
        const users = [];
        
        for (const userData of SEED_USERS) {
            const hashedPassword = await bcrypt.hash(userData.password, BCRYPT_SALT_ROUNDS);
            const user = await User.create({
                name: userData.name,
                email: userData.email,
                passwordHash: hashedPassword,
                role: userData.role
            });
            users.push(user);
        }
        
        console.log(`✅ Successfully seeded ${users.length} users`);
        console.log(`📧 Admin Email: admin@tutelage.com | Password: ${DEFAULT_ADMIN_PASSWORD}`);
        console.log(`📧 User Email: john.smith@example.com | Password: ${DEFAULT_USER_PASSWORD}`);
        
        return users;
    } catch (error) {
        console.error('❌ Error seeding users:', error);
        throw error;
    }
};

/**
 * Seed blog posts
 */
const seedBlogs = async (users) => {
    try {
        const existingBlogCount = await Blog.count();
        if (existingBlogCount > 0) {
            console.log(`📊 Blogs table contains ${existingBlogCount} entries. Skipping blog seeding.`);
            return;
        }

        console.log('🔄 Seeding blogs...');
        const adminUser = users.find(user => user.role === 'ADMIN');
        
        for (const blogData of SEED_BLOGS) {
            await Blog.create({
                ...blogData,
                createdBy: adminUser.id
            });
        }
        
        console.log(`✅ Successfully seeded ${SEED_BLOGS.length} blog posts`);
    } catch (error) {
        console.error('❌ Error seeding blogs:', error);
        throw error;
    }
};

/**
 * Seed videos
 */
const seedVideos = async (users) => {
    try {
        const existingVideoCount = await Video.count();
        if (existingVideoCount > 0) {
            console.log(`📊 Videos table contains ${existingVideoCount} entries. Skipping video seeding.`);
            return;
        }

        console.log('🔄 Seeding videos...');
        const adminUser = users.find(user => user.role === 'ADMIN');
        
        for (const videoData of SEED_VIDEOS) {
            await Video.create({
                ...videoData,
                createdBy: adminUser.id
            });
        }
        
        console.log(`✅ Successfully seeded ${SEED_VIDEOS.length} videos`);
    } catch (error) {
        console.error('❌ Error seeding videos:', error);
        throw error;
    }
};

/**
 * Seed audio content
 */
const seedAudios = async (users) => {
    try {
        const existingAudioCount = await Audio.count();
        if (existingAudioCount > 0) {
            console.log(`📊 Audios table contains ${existingAudioCount} entries. Skipping audio seeding.`);
            return;
        }

        console.log('🔄 Seeding audios...');
        const adminUser = users.find(user => user.role === 'ADMIN');
        
        for (const audioData of SEED_AUDIOS) {
            await Audio.create({
                ...audioData,
                createdBy: adminUser.id
            });
        }
        
        console.log(`✅ Successfully seeded ${SEED_AUDIOS.length} audio files`);
    } catch (error) {
        console.error('❌ Error seeding audios:', error);
        throw error;
    }
};

/**
 * Seed courses
 */
const seedCourses = async (users) => {
    try {
        const existingCourseCount = await Course.count();
        if (existingCourseCount > 0) {
            console.log(`📊 Courses table contains ${existingCourseCount} entries. Skipping course seeding.`);
            return;
        }

        console.log('🔄 Seeding courses...');
        const adminUser = users.find(user => user.role === 'ADMIN');
        
        for (const courseData of SEED_COURSES) {
            await Course.create({
                ...courseData,
                createdBy: adminUser.id
            });
        }
        
        console.log(`✅ Successfully seeded ${SEED_COURSES.length} courses`);
    } catch (error) {
        console.error('❌ Error seeding courses:', error);
        throw error;
    }
};

/**
 * Seed tests
 */
const seedTests = async (users) => {
    try {
        const existingTestCount = await Test.count();
        if (existingTestCount > 0) {
            console.log(`📊 Tests table contains ${existingTestCount} entries. Skipping test seeding.`);
            return;
        }

        console.log('🔄 Seeding tests...');
        const adminUser = users.find(user => user.role === 'ADMIN');
        
        for (const testData of SEED_TESTS) {
            await Test.create({
                ...testData,
                createdBy: adminUser.id
            });
        }
        
        console.log(`✅ Successfully seeded ${SEED_TESTS.length} tests`);
    } catch (error) {
        console.error('❌ Error seeding tests:', error);
        throw error;
    }
};

/**
 * Seed FAQs
 */
const seedFAQs = async () => {
    try {
        const existingFAQCount = await Faq.count();
        if (existingFAQCount > 0) {
            console.log(`📊 FAQs table contains ${existingFAQCount} entries. Skipping FAQ seeding.`);
            return;
        }

        console.log('🔄 Seeding FAQs...');
        
        for (const faqData of SEED_FAQS) {
            await Faq.create(faqData);
        }
        
        console.log(`✅ Successfully seeded ${SEED_FAQS.length} FAQs`);
    } catch (error) {
        console.error('❌ Error seeding FAQs:', error);
        throw error;
    }
};

// ============================================================================
// MAIN SEEDING FUNCTION
// ============================================================================

/**
 * Main function to seed all data
 */
const seedDatabase = async () => {
    try {
        console.log('\n' + '🌱'.repeat(20));
        console.log('🌱 STARTING DATABASE SEEDING PROCESS');
        console.log('🌱'.repeat(20));
        
        // Ensure database is connected
        await sequelize.authenticate();
        console.log('✅ Database connection established');
        
        // Seed in order (users first, then content that references users)
        const users = await seedUsers();
        await seedBlogs(users);
        await seedVideos(users);
        await seedAudios(users);
        await seedCourses(users);
        await seedTests(users);
        await seedFAQs();
        
        console.log('\n' + '🎉'.repeat(20));
        console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
        console.log('🎉'.repeat(20));
        console.log('📊 All sectors now have sample data for frontend visualization');
        console.log('🔐 Login credentials:');
        console.log(`   Main Manager: admin@tutelage.com / ${DEFAULT_ADMIN_PASSWORD}`);
        console.log(`   Admin: john.smith@example.com / ${DEFAULT_USER_PASSWORD}`);
        console.log('🎉'.repeat(20) + '\n');
        
    } catch (error) {
        console.error('\n' + '💥'.repeat(20));
        console.error('💥 SEEDING FAILED!');
        console.error('💥'.repeat(20));
        console.error('Error details:', error);
        console.error('💥'.repeat(20) + '\n');
        throw error;
    }
};

// ============================================================================
// EXPORT AND EXECUTION
// ============================================================================

module.exports = {
    seedDatabase,
    seedUsers,
    seedBlogs,
    seedVideos,
    seedAudios,
    seedCourses,
    seedTests,
    seedFAQs
};

// Run seeding if this file is executed directly
if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('✅ Seeding completed successfully');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Seeding failed:', error);
            process.exit(1);
        });
}