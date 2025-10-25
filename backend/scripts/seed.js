// =============================================================================
// SEED SCRIPT - Populate sample data for development/demo
// =============================================================================
// Run: `node backend/scripts/seed.js`
// =============================================================================

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const bcrypt = require('bcrypt');
const {
  sequelize,
  User,
  Blog,
  Video,
  Audio,
  Course,
  Test,
  Faq,
  LandingSection
} = require('../models');

const BCRYPT_ROUNDS = 10;

async function ensureAdminUser() {
  const email = 'seed-admin@example.com';
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return existing;
  }
  const passwordHash = await bcrypt.hash('password123', BCRYPT_ROUNDS);
  const user = await User.create({
    name: 'Seed Admin',
    email,
    passwordHash,
    role: 'ADMIN',
    isActive: true
  });
  return user;
}

async function seedLandingSection(admin) {
  const count = await LandingSection.count();
  if (count > 0) return;

  await LandingSection.create({
    title: 'Empowering learners worldwide with virtual education',
    subtitle: 'High-quality courses, engaging tests, and curated resources for success.',
    imageUrl: 'https://images.unsplash.com/photo-1584697964329-48375e4a9d92?q=80&w=1920&auto=format&fit=crop',
    createdBy: admin.id
  });
}

async function seedBlogs(admin) {
  const count = await Blog.count();
  if (count > 0) return;
  await Blog.bulkCreate([
    {
      title: 'Welcome to Tutelage Academics',
      content: 'Discover our platform offering courses, tests, videos, and more to enhance your learning journey.',
      imageRef: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
      category: 'Announcements',
      createdBy: admin.id
    },
    {
      title: 'How to get started',
      content: 'Sign in, explore the catalog, and enroll in courses that match your goals.',
      imageRef: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
      category: 'Guides',
      createdBy: admin.id
    }
  ]);
}

async function seedVideos(admin) {
  const count = await Video.count();
  if (count > 0) return;
  await Video.bulkCreate([
    {
      title: 'Intro to the Platform',
      videoRef: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
      description: 'A quick overview of features and navigation.',
      createdBy: admin.id
    },
    {
      title: 'Learning Tips',
      videoRef: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      description: 'Best practices to stay productive and engaged.',
      createdBy: admin.id
    }
  ]);
}

async function seedAudios(admin) {
  const count = await Audio.count();
  if (count > 0) return;
  await Audio.create({
    title: 'Study Focus Track',
    content: 'Ambient audio to help focus during study sessions.',
    transcript: null,
    audioRef: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    pdfRef: null,
    createdBy: admin.id
  });
}

async function seedCourses(admin) {
  const count = await Course.count();
  if (count > 0) return;
  await Course.create({
    category: 'General',
    title: 'Foundations of Learning',
    description: 'Build strong habits and techniques for effective learning.',
    introVideoRef: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    createdBy: admin.id
  });
}

async function seedTests(admin) {
  const count = await Test.count();
  if (count > 0) return;
  await Test.create({
    title: 'Placement Assessment',
    description: 'A short test to gauge your level and recommend courses.',
    createdBy: admin.id
  });
}

async function seedFaqs() {
  const count = await Faq.count();
  if (count > 0) return;
  await Faq.bulkCreate([
    {
      question: 'What is Tutelage Academics?',
      answer: 'A platform providing courses, tests, blogs, videos, and more to support learning.',
      orderNumber: 1,
      category: 'General'
    },
    {
      question: 'How do I enroll in a course?',
      answer: 'Sign in, navigate to Courses, and click Enroll on your chosen course.',
      orderNumber: 2,
      category: 'Enrollment'
    },
    {
      question: 'Is content free?',
      answer: 'We offer both free and paid content depending on the course or resource.',
      orderNumber: 3,
      category: 'General'
    }
  ]);
}

async function main() {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected. Syncing models...');
    await sequelize.sync({ alter: false });
    console.log('✅ Models synced. Seeding data...');

    const admin = await ensureAdminUser();
    console.log('👤 Using admin user:', admin.email);

    await seedLandingSection(admin);
    await seedBlogs(admin);
    await seedVideos(admin);
    await seedAudios(admin);
    await seedCourses(admin);
    await seedTests(admin);
    await seedFaqs();

    console.log('🎉 Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

main();