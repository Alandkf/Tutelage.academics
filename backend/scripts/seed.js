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
  const MIN = 10;
  if (count >= MIN) return;

  const sections = [
    {
      title: 'Empowering learners worldwide with virtual education',
      subtitle: 'High-quality courses, engaging tests, and curated resources for success.',
      imageUrl: 'https://images.unsplash.com/photo-1584697964329-48375e4a9d92?q=80&w=1920&auto=format&fit=crop',
    },
    {
      title: 'Learn smarter, not harder',
      subtitle: 'Actionable techniques to improve retention and performance.',
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920&auto=format&fit=crop',
    },
    {
      title: 'Your journey starts here',
      subtitle: 'Explore courses and build your personalized plan.',
      imageUrl: 'https://images.unsplash.com/photo-1498079022511-d15614cb1c02?q=80&w=1920&auto=format&fit=crop',
    },
    {
      title: 'Get guidance from experts',
      subtitle: 'Curated content built by experienced educators.',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1920&auto=format&fit=crop',
    },
    {
      title: 'Achieve your goals',
      subtitle: 'Goal tracking and progress insights keep you motivated.',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f0b2b01a?q=80&w=1920&auto=format&fit=crop',
    },
    {
      title: 'Boost your productivity',
      subtitle: 'Learn tools and tips to study efficiently.',
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1920&auto=format&fit=crop',
    },
    {
      title: 'Stay curious',
      subtitle: 'Discover new topics and expand your horizons.',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop',
    },
    {
      title: 'Community-driven learning',
      subtitle: 'Learn with peers and share knowledge.',
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1920&auto=format&fit=crop',
    },
    {
      title: 'Practice and master',
      subtitle: 'Test yourself and improve over time.',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop',
    },
    {
      title: 'Unlock your potential',
      subtitle: 'A platform designed to help you thrive.',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920&auto=format&fit=crop',
    }
  ];

  const remaining = MIN - count;
  await LandingSection.bulkCreate(
    sections.slice(0, remaining).map(s => ({ ...s, createdBy: admin.id }))
  );
}

async function seedBlogs(admin) {
  const count = await Blog.count();
  const MIN = 10;
  if (count >= MIN) return;

  const blogs = [
    {
      title: 'Welcome to Tutelage Academics',
      content: 'Discover our platform offering courses, tests, videos, and more to enhance your learning journey.',
      imageRef: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
      category: 'Announcements',
      description: 'Overview of what Tutelage Academics offers and how to explore it.'
    },
    {
      title: 'How to get started',
      content: 'Sign in, explore the catalog, and enroll in courses that match your goals.',
      imageRef: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
      category: 'Guides',
      description: 'Step-by-step guide to begin using the platform effectively.'
    },
    {
      title: 'Top study tips',
      content: 'Use spaced repetition, active recall, and note optimization techniques.',
      imageRef: 'https://images.unsplash.com/photo-1493723843671-1d0eae5b36cf?q=80&w=1200&auto=format&fit=crop',
      category: 'Tips',
      description: 'Tried-and-true methods to retain information better.'
    },
    {
      title: 'Latest platform updates',
      content: 'We’ve shipped improvements to courses and dashboards.',
      imageRef: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
      category: 'Updates',
      description: 'A roundup of new features and fixes.'
    },
    {
      title: 'Exam preparation strategies',
      content: 'Set realistic schedules, practice tests, and simulate conditions.',
      imageRef: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=1200&auto=format&fit=crop',
      category: 'Exams',
      description: 'Build confidence with structured practice.'
    },
    {
      title: 'Handling difficult topics',
      content: 'Break down complex ideas and use analogies to understand them.',
      imageRef: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1200&auto=format&fit=crop',
      category: 'Learning',
      description: 'Frameworks for tackling challenging material.'
    },
    {
      title: 'Make learning fun',
      content: 'Gamify your study sessions and reward progress.',
      imageRef: 'https://images.unsplash.com/photo-1513863326356-6ee7a15619a0?q=80&w=1200&auto=format&fit=crop',
      category: 'Productivity',
      description: 'Keep motivation high with fun mechanics.'
    },
    {
      title: 'Time management essentials',
      content: 'Prioritize tasks, batch work, and use focus blocks.',
      imageRef: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop',
      category: 'Productivity',
      description: 'Strategies to balance study with life.'
    },
    {
      title: 'Build your learning routine',
      content: 'Daily habits that compound into mastery over time.',
      imageRef: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1200&auto=format&fit=crop',
      category: 'Habits',
      description: 'Consistency tips to stay on track.'
    },
    {
      title: 'Celebrate progress',
      content: 'Reflect on wins and iterate on what worked.',
      imageRef: 'https://images.unsplash.com/photo-1487014679447-28d2f2a7b8b1?q=80&w=1200&auto=format&fit=crop',
      category: 'Community',
      description: 'Recognize milestones to fuel future growth.'
    }
  ];

  const remaining = MIN - count;
  await Blog.bulkCreate(
    blogs.slice(0, remaining).map(b => ({ ...b, createdBy: admin.id }))
  );
}

async function seedVideos(admin) {
  const count = await Video.count();
  const MIN = 10;
  if (count >= MIN) return;

  const videos = Array.from({ length: 10 }).map((_, i) => ({
    title: `Platform Video ${i + 1}`,
    videoRef: `https://www.youtube.com/watch?v=ysz5S6PUM-U&t=${i + 1}`,
    description: 'Short demo or tutorial segment.',
  }));

  const remaining = MIN - count;
  await Video.bulkCreate(
    videos.slice(0, remaining).map(v => ({ ...v, createdBy: admin.id }))
  );
}

async function seedAudios(admin) {
  const count = await Audio.count();
  const MIN = 10;
  if (count >= MIN) return;

  const audios = Array.from({ length: 10 }).map((_, i) => ({
    title: `Focus Track ${i + 1}`,
    content: 'Ambient audio to help focus during study sessions.',
    transcript: null,
    audioRef: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${i + 1}.mp3`,
    pdfRef: null
  }));

  const remaining = MIN - count;
  await Audio.bulkCreate(
    audios.slice(0, remaining).map(a => ({ ...a, createdBy: admin.id }))
  );
}

async function seedCourses(admin) {
  const count = await Course.count();
  const MIN = 10;
  if (count >= MIN) return;

  const cats = ['General', 'STEM', 'Arts', 'Skills', 'Languages'];
  const courses = Array.from({ length: 10 }).map((_, i) => ({
    category: cats[i % cats.length],
    title: `Course ${i + 1}`,
    description: 'Build strong habits and techniques for effective learning.',
    introVideoRef: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }));

  const remaining = MIN - count;
  await Course.bulkCreate(
    courses.slice(0, remaining).map(c => ({ ...c, createdBy: admin.id }))
  );
}

async function seedTests(admin) {
  const count = await Test.count();
  const MIN = 10;
  if (count >= MIN) return;

  const tests = Array.from({ length: 10 }).map((_, i) => ({
    title: `Assessment ${i + 1}`,
    description: 'A short test to gauge your level and recommend courses.'
  }));

  const remaining = MIN - count;
  await Test.bulkCreate(
    tests.slice(0, remaining).map(t => ({ ...t, createdBy: admin.id }))
  );
}

async function seedFaqs() {
  const count = await Faq.count();
  const MIN = 10;
  if (count >= MIN) return;

  const faqs = [
    { question: 'What is Tutelage Academics?', answer: 'A platform providing courses, tests, blogs, videos, and more to support learning.', category: 'General' },
    { question: 'How do I enroll in a course?', answer: 'Sign in, navigate to Courses, and click Enroll on your chosen course.', category: 'Enrollment' },
    { question: 'Is content free?', answer: 'We offer both free and paid content depending on the course or resource.', category: 'General' },
    { question: 'Can I access content offline?', answer: 'Some resources support offline access; check specific course materials.', category: 'Access' },
    { question: 'How do I reset my password?', answer: 'Use the Forgot Password link on the sign-in page.', category: 'Account' },
    { question: 'Do you offer certificates?', answer: 'Selected courses provide certificates upon completion.', category: 'Courses' },
    { question: 'How are tests graded?', answer: 'Tests are auto-graded; results appear in your dashboard.', category: 'Tests' },
    { question: 'How do I contact support?', answer: 'Use the contact form or email support.', category: 'Support' },
    { question: 'What languages are supported?', answer: 'The platform supports multiple languages with localization.', category: 'General' },
    { question: 'Can I change my plan later?', answer: 'Yes, you can upgrade or downgrade anytime.', category: 'Billing' }
  ].map((f, i) => ({ ...f, orderNumber: i + 1 }));

  const remaining = MIN - count;
  await Faq.bulkCreate(faqs.slice(0, remaining));
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