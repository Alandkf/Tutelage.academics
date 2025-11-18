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
 * @property {string[]} [keywords] - Optional keywords for broader matching
 */

/**
 * @type {StaticPageMeta[]}
 */
const STATIC_PAGES = [
  {
    title: 'Home',
    short_description: 'Explore Tutelage Academics programs, resources, and updates.',
    link: '/',
    keywords: ['home', 'tutelage', 'welcome', 'landing', 'academics']
  },
  {
    title: 'Language Courses',
    short_description: 'Overview of available languages and programs (English, Kurdish, Arabic).',
    link: '/languages',
    keywords: ['languages', 'language', 'courses', 'course', 'programs', 'tracks', 'english', 'kurdish', 'arabic']
  },
  {
    title: 'English Language Course',
    short_description: 'Start learning English across levels and specializations.',
    link: '/courses',
    keywords: ['english', 'esl', 'course', 'courses', 'learn english']
  },
  {
    title: 'Kurdish Language Course',
    short_description: 'Learn Kurdish language with structured lessons and practice.',
    link: '/languages/kurdish',
    keywords: ['kurdish', 'kurdi', 'course', 'courses']
  },
  {
    title: 'Arabic Language Course',
    short_description: 'Learn Arabic with foundational and advanced learning paths.',
    link: '/languages/arabic',
    keywords: ['arabic', 'arabi', 'course', 'courses']
  },
  {
    title: 'About Us',
    short_description: 'Learn about our mission, values, and teaching approach.',
    link: '/about-us',
    keywords: ['about', 'about us', 'mission', 'team', 'company', 'school']
  },
  {
    title: 'Contact',
    short_description: 'Get in touch for inquiries, support, or enrollment help.',
    link: '/contact',
    keywords: ['contact', 'contact us', 'support', 'help', 'email', 'phone']
  },
  {
    title: 'Courses',
    short_description: 'Browse English courses for kids, adults, business, and academics.',
    link: '/courses',
    keywords: ['courses', 'course', 'english courses', 'programs', 'pricing', 'price', 'payment', 'fees', 'fee', 'tuition', 'cost']
  },
  {
    title: 'Enroll For Courses',
    short_description: 'Submit your application and enroll in your desired course.',
    link: '/courses/enroll',
    keywords: ['enroll', 'enrol', 'apply', 'application', 'register', 'registration', 'signup', 'sign up', 'join', 'payment', 'pay', 'fees', 'fee', 'tuition', 'pricing', 'price', 'cost', 'billing']
  },
  {
    title: 'Academic English',
    short_description: 'Improve academic writing, reading, and presentation skills.',
    link: '/courses/academicenglish',
    keywords: ['academic english', 'academic', 'university', 'research', 'presentation', 'thesis']
  },
  {
    title: 'Business English',
    short_description: 'Master professional communication for workplace success.',
    link: '/courses/businessenglish',
    keywords: ['business english', 'business', 'professional', 'workplace', 'office', 'corporate']
  },
  {
    title: 'English for Adults',
    short_description: 'Practical English for daily life, travel, and work.',
    link: '/courses/englishforadults',
    keywords: ['adults', 'adult', 'general english', 'daily english', 'everyday english']
  },
  {
    title: 'English for Kids and Teens',
    short_description: 'Fun and interactive English learning for children and teens.',
    link: '/courses/englishforkids',
    keywords: ['kids', 'children', 'child', 'teens', 'teenagers', 'young learners', 'youth', 'junior']
  },
  {
    title: 'English Proficiency Tests',
    short_description: 'Prepare for IELTS, PTE, and TOEFL exams with targeted practice.',
    link: '/courses/Englishproficiencytests',
    keywords: ['ielts', 'pte', 'toefl', 'test', 'exam', 'exams', 'certification']
  },
  {
    title: 'IELTS Academic',
    short_description: 'Focused preparation for IELTS Academic modules and tasks.',
    link: '/courses/Englishproficiencytests/ieltsacademic',
    keywords: ['ielts academic', 'ielts', 'academic']
  },
  {
    title: 'IELTS General',
    short_description: 'Prepare for IELTS General Training with practice and tips.',
    link: '/courses/Englishproficiencytests/ieltsgeneral',
    keywords: ['ielts general', 'general training', 'ielts', 'general']
  },
  {
    title: 'PTE Preparation Course',
    short_description: 'Get ready for the PTE exam with strategy and practice.',
    link: '/courses/Englishproficiencytests/ptepreparationcourse',
    keywords: ['pte', 'pearson', 'pte exam', 'pte test']
  },
  {
    title: 'TOEFL Preparation Course',
    short_description: 'Build skills for success on the TOEFL exam.',
    link: '/courses/Englishproficiencytests/toeflpreparationcourse',
    keywords: ['toefl', 'toefl ibt', 'ets', 'toefl exam']
  },
  {
    title: 'ESL Resources',
    short_description: 'Access ESL blogs, stories, audios, and videos.',
    link: '/esl-resources',
    keywords: ['esl', 'resources', 'library', 'materials']
  },
  {
    title: 'Audio Library',
    short_description: 'Listen to ESL audio materials for practice and comprehension.',
    link: '/esl-resources/audios',
    keywords: ['audio', 'audios', 'listening', 'sound', 'mp3']
  },
  {
    title: 'Blog Library',
    short_description: 'Read ESL blogs covering tips, lessons, and insights.',
    link: '/esl-resources/blogs',
    keywords: ['blog', 'blogs', 'articles', 'tips']
  },
  {
    title: 'Story Library',
    short_description: 'Enjoy ESL short stories to improve reading and vocabulary.',
    link: '/esl-resources/stories',
    keywords: ['story', 'stories', 'reading', 'short stories', 'narrative']
  },
  {
    title: 'Video Library',
    short_description: 'Watch ESL videos for listening and pronunciation practice.',
    link: '/esl-resources/videos',
    keywords: ['video', 'videos', 'listening', 'watch', 'pronunciation']
  },
  {
    title: 'Skills',
    short_description: 'Practice Reading, Writing, Speaking, and Listening skills.',
    link: '/skills',
    keywords: ['skills', 'reading', 'writing', 'speaking', 'listening']
  },
  {
    title: 'Reading',
    short_description: 'Practice reading comprehension across CEFR levels.',
    link: '/skills/reading',
    keywords: ['reading', 'read', 'comprehension', 'texts']
  },
  {
    title: 'Speaking',
    short_description: 'Develop speaking fluency and accuracy across topics.',
    link: '/skills/speaking',
    keywords: ['speaking', 'speak', 'fluency', 'conversation', 'oral']
  },
  {
    title: 'Listening',
    short_description: 'Improve listening skills with targeted exercises.',
    link: '/skills/listening',
    keywords: ['listening', 'listen', 'audio', 'comprehension']
  },
  {
    title: 'Writing',
    short_description: 'Enhance writing structure, vocabulary, and coherence.',
    link: '/skills/writing',
    keywords: ['writing', 'write', 'essay', 'composition']
  },
  {
    title: 'Tutelage Tests',
    short_description: 'Try placement, mock exams, and free practice tests.',
    link: '/tutelage-tests',
    keywords: ['tests', 'practice', 'mock', 'exam', 'placement']
  },
  {
    title: 'Free Practice Test',
    short_description: 'Take free practice tests to assess your skills.',
    link: '/tutelage-tests/free-practice-test',
    keywords: ['practice', 'free', 'test', 'quiz', 'sample']
  },
  {
    title: 'Language Placement Test',
    short_description: 'Find your starting level with a quick placement test.',
    link: '/tutelage-tests/language-placement',
    keywords: ['placement', 'level', 'test', 'assessment', 'diagnostic']
  },
  {
    title: 'International / Mock Exam',
    short_description: 'Simulate exam conditions with a realistic mock test.',
    link: '/tutelage-tests/mock-exam',
    keywords: ['mock', 'exam', 'simulation', 'test', 'practice']
  },
  {
    title: 'Sign In',
    short_description: 'Access your dashboard and manage learning progress.',
    link: '/signin',
    keywords: ['sign in', 'signin', 'login', 'log in', 'account']
  },
  {
    title: 'Levels Overview',
    short_description: 'Understand language levels from A1 to C1.',
    link: '/levels',
    keywords: ['levels', 'level', 'cefr', 'a1', 'a2', 'b1', 'b2', 'c1']
  },
  {
    title: 'A1 Beginner',
    short_description: 'Start at A1: basic phrases, simple interactions, essential grammar.',
    link: '/levels/a1',
    keywords: ['a1', 'beginner', 'basic', 'elementary']
  },
  {
    title: 'A2 Pre-intermediate',
    short_description: 'Build confidence with A2: everyday topics and simple texts.',
    link: '/levels/a2',
    keywords: ['a2', 'pre intermediate', 'pre-intermediate']
  },
  {
    title: 'B1 Intermediate',
    short_description: 'Reach B1: handle familiar matters and connected speech.',
    link: '/levels/b1',
    keywords: ['b1', 'intermediate']
  },
  {
    title: 'B2 Upper Intermediate',
    short_description: 'Progress to B2: more complex texts and detailed discussions.',
    link: '/levels/b2',
    keywords: ['b2', 'upper intermediate', 'upper-intermediate']
  },
  {
    title: 'C1 Advanced',
    short_description: 'Aim for C1: fluent, flexible, and well-structured language use.',
    link: '/levels/c1',
    keywords: ['c1', 'advanced']
  }
];

module.exports = { STATIC_PAGES };