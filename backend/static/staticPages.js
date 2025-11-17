// ============================================================================
// STATIC PAGES METADATA
// ============================================================================
// Provides a typed, documented list of static pages used by the unified search.
// Each entry includes title, short_description (≤150 chars), and full link path.

/**
 * @typedef {Object} StaticPageMeta
 * @property {string} title - Human-friendly page title
 * @property {string} short_description - Brief summary (≤150 chars)
 * @property {string} link - Full URL path to the static page
 */

/**
 * @type {StaticPageMeta[]}
 */
const STATIC_PAGES = [
  {
    title: 'Home',
    short_description: 'Explore Tutelage Academics programs, resources, and updates.',
    link: '/'
  },
  {
    title: 'About Us',
    short_description: 'Learn about our mission, values, and teaching approach.',
    link: '/about-us'
  },
  {
    title: 'Contact',
    short_description: 'Get in touch for inquiries, support, or enrollment help.',
    link: '/contact'
  },
  {
    title: 'Courses',
    short_description: 'Browse English courses for kids, adults, business, and academics.',
    link: '/courses'
  },
  {
    title: 'Academic English',
    short_description: 'Improve academic writing, reading, and presentation skills.',
    link: '/courses/academicenglish'
  },
  {
    title: 'Business English',
    short_description: 'Master professional communication for workplace success.',
    link: '/courses/businessenglish'
  },
  {
    title: 'English for Adults',
    short_description: 'Practical English for daily life, travel, and work.',
    link: '/courses/englishforadults'
  },
  {
    title: 'English for Kids',
    short_description: 'Fun and interactive English learning for children.',
    link: '/courses/englishforkids'
  },
  {
    title: 'ESL Resources',
    short_description: 'Access ESL blogs, stories, audios, and videos.',
    link: '/esl-resources'
  },
  {
    title: 'Skills',
    short_description: 'Practice Reading, Writing, Speaking, and Listening skills.',
    link: '/skills'
  },
  {
    title: 'Tutelage Tests',
    short_description: 'Try placement, mock exams, and free practice tests.',
    link: '/tutelage-tests'
  },
  {
    title: 'Sign In',
    short_description: 'Access your dashboard and manage learning progress.',
    link: '/signin'
  },
  {
    title: 'Levels Overview',
    short_description: 'Understand language levels from A1 to C1.',
    link: '/levels'
  }
];

module.exports = { STATIC_PAGES };