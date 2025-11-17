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
    title: 'Language Courses',
    short_description: 'Overview of available language programs and tracks.',
    link: '/languages'
  },
  {
    title: 'English Language Course',
    short_description: 'Start learning English across levels and specializations.',
    link: '/courses'
  },
  {
    title: 'Kurdish Language Course',
    short_description: 'Learn Kurdish language with structured lessons and practice.',
    link: '/languages/kurdish'
  },
  {
    title: 'Arabic Language Course',
    short_description: 'Learn Arabic with foundational and advanced learning paths.',
    link: '/languages/arabic'
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
    title: 'Enroll For Courses',
    short_description: 'Submit your application and enroll in your desired course.',
    link: '/courses/enroll'
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
    title: 'English for Kids and Teens',
    short_description: 'Fun and interactive English learning for children and teens.',
    link: '/courses/englishforkids'
  },
  {
    title: 'English Proficiency Tests',
    short_description: 'Prepare for IELTS, PTE, and TOEFL exams with targeted practice.',
    link: '/courses/englishproficiencytests'
  },
  {
    title: 'IELTS Academic',
    short_description: 'Focused preparation for IELTS Academic modules and tasks.',
    link: '/courses/englishproficiencytests/ieltsacademic'
  },
  {
    title: 'IELTS General',
    short_description: 'Prepare for IELTS General Training with practice and tips.',
    link: '/courses/englishproficiencytests/ieltsgeneral'
  },
  {
    title: 'PTE Preparation Course',
    short_description: 'Get ready for the PTE exam with strategy and practice.',
    link: '/courses/englishproficiencytests/ptepreparationcourse'
  },
  {
    title: 'TOEFL Preparation Course',
    short_description: 'Build skills for success on the TOEFL exam.',
    link: '/courses/englishproficiencytests/toeflpreparationcourse'
  },
  {
    title: 'ESL Resources',
    short_description: 'Access ESL blogs, stories, audios, and videos.',
    link: '/esl-resources'
  },
  {
    title: 'Audio Library',
    short_description: 'Listen to ESL audio materials for practice and comprehension.',
    link: '/esl-resources/audios'
  },
  {
    title: 'Blog Library',
    short_description: 'Read ESL blogs covering tips, lessons, and insights.',
    link: '/esl-resources/blogs'
  },
  {
    title: 'Story Library',
    short_description: 'Enjoy ESL short stories to improve reading and vocabulary.',
    link: '/esl-resources/stories'
  },
  {
    title: 'Video Library',
    short_description: 'Watch ESL videos for listening and pronunciation practice.',
    link: '/esl-resources/videos'
  },
  {
    title: 'Skills',
    short_description: 'Practice Reading, Writing, Speaking, and Listening skills.',
    link: '/skills'
  },
  {
    title: 'Reading',
    short_description: 'Practice reading comprehension across CEFR levels.',
    link: '/skills/reading'
  },
  {
    title: 'Speaking',
    short_description: 'Develop speaking fluency and accuracy across topics.',
    link: '/skills/speaking'
  },
  {
    title: 'Listening',
    short_description: 'Improve listening skills with targeted exercises.',
    link: '/skills/listening'
  },
  {
    title: 'Writing',
    short_description: 'Enhance writing structure, vocabulary, and coherence.',
    link: '/skills/writing'
  },
  {
    title: 'Tutelage Tests',
    short_description: 'Try placement, mock exams, and free practice tests.',
    link: '/tutelage-tests'
  },
  {
    title: 'Free Practice Test',
    short_description: 'Take free practice tests to assess your skills.',
    link: '/tutelage-tests/free-practice-test'
  },
  {
    title: 'Language Placement Test',
    short_description: 'Find your starting level with a quick placement test.',
    link: '/tutelage-tests/language-placement'
  },
  {
    title: 'International / Mock Exam',
    short_description: 'Simulate exam conditions with a realistic mock test.',
    link: '/tutelage-tests/mock-exam'
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
  },
  {
    title: 'A1 Beginner',
    short_description: 'Start at A1: basic phrases, simple interactions, essential grammar.',
    link: '/levels/a1'
  },
  {
    title: 'A2 Pre-intermediate',
    short_description: 'Build confidence with A2: everyday topics and simple texts.',
    link: '/levels/a2'
  },
  {
    title: 'B1 Intermediate',
    short_description: 'Reach B1: handle familiar matters and connected speech.',
    link: '/levels/b1'
  },
  {
    title: 'B2 Upper Intermediate',
    short_description: 'Progress to B2: more complex texts and detailed discussions.',
    link: '/levels/b2'
  },
  {
    title: 'C1 Advanced',
    short_description: 'Aim for C1: fluent, flexible, and well-structured language use.',
    link: '/levels/c1'
  }
];

module.exports = { STATIC_PAGES };