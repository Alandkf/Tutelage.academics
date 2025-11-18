// ============================================================================
// SEARCH CONTROLLER
// ============================================================================
// Provides a single comprehensive search endpoint supporting:
// - Universal search across Tests, Courses, Blogs, Skills, ESL Resources
// - Filtered search within one of the above collections
// Implements case-insensitive text search, pagination, and
// query execution time metrics. Results items contain only: link, title, description.

const { Op } = require('sequelize');
const models = require('../models');
const { STATIC_PAGES } = require('../static/staticPages');
const { tokenizeQuery, buildAnyWordWhere } = require('../utils/searchUtils');

// Helper: normalize filter string to a canonical key
function normalizeFilter(filter) {
  if (!filter) return null;
  const f = String(filter).trim().toLowerCase();
  if (f === 'blogs') return 'blogs';
  if (f === 'courses') return 'courses';
  if (f === 'skills') return 'skills';
  if (f === 'tests') return 'tests';
  if (f === 'esl resources' || f === 'esl-resources' || f === 'esl') return 'eslResources';
  return null;
}

// Helper: build ILIKE term
function ilikeTerm(q) {
  return `%${q}%`;
}

// Helper: build link for known public-facing routes
function buildLink(type, item) {
  const id = item?.id;
  if (id === undefined || id === null) return null;
  const levelArr = Array.isArray(item?.level) ? item.level : null;
  const firstLevel = levelArr && levelArr.length ? String(levelArr[0]) : '';
  const cefr = (firstLevel.match(/^[ABC]\d/i)?.[0] || '').toLowerCase();
  const levelCode = ['a1','a2','b1','b2','c1'].includes(cefr) ? cefr : null;
  const safeLevel = levelCode || 'a1';

  switch (type) {
    case 'Blog':
      return `/esl-resources/blogs/${id}`;
    case 'Reading':
      return `/skills/reading/${safeLevel}/${id}`;
    case 'Writing':
      return `/skills/writing/${safeLevel}/${id}`;
    case 'Speaking':
      return `/skills/speaking/${safeLevel}/${id}`;
    case 'Audio':
      return `/skills/listening/${safeLevel}/${id}`;
    case 'EslAudio':
      return `/esl-resources/audios/${id}`;
    case 'EslVideo':
      return `/esl-resources/videos/${id}`;
    case 'Story':
      return `/esl-resources/stories/${id}`;
    case 'Course':
    default:
      return null;
  }
}

// ----------------------------------------------------------------------------
// COMPACT UNIFIED SEARCH (3 fields: title, id, description)
// ----------------------------------------------------------------------------
async function searchCompactUnified(query, limit) {
  const words = tokenizeQuery(query);
  const fields = ['title', 'description'];

  // Dynamic models to include (must have title/description)
  const sources = [
    { type: 'Audio', model: models.Audio, attributes: ['id', 'title', 'description', 'level'] },
    { type: 'Blog', model: models.Blog, attributes: ['id', 'title', 'description'] },
    { type: 'Reading', model: models.Reading, attributes: ['id', 'title', 'description', 'level'] },
    { type: 'Writing', model: models.Writing, attributes: ['id', 'title', 'description', 'level'] },
    { type: 'Speaking', model: models.Speaking, attributes: ['id', 'title', 'description', 'level'] },
    { type: 'EslAudio', model: models.EslAudio, attributes: ['id', 'title', 'description'] },
    { type: 'EslVideo', model: models.EslVideo, attributes: ['id', 'title', 'description'] },
    { type: 'Story', model: models.Story, attributes: ['id', 'title', 'description'] },
    { type: 'Course', model: models.Course, attributes: ['id', 'title', 'description'] },
  ].filter((s) => !!s.model);

  const perSourceLimit = Math.max(Math.ceil(limit / sources.length) + 2, 5);
  const started = Date.now();

  const dynamicResultsSettled = await Promise.allSettled(
    sources.map((s) => s.model.findAll({
      where: buildAnyWordWhere(words, fields),
      attributes: s.attributes,
      limit: perSourceLimit,
    }).then(rows => rows.map(r => ({ ...r.toJSON(), __type: s.type }))))
  );

  // Use shared link builder (see buildLink)

  const dynamicResults = dynamicResultsSettled.flatMap((p) => (p.status === 'fulfilled' ? p.value : []))
    .map((r) => ({
      link: buildLink(r.__type, r),
      title: r.title,
      description: r.description || '',
    }));

  // Static results: search words in title, short_description, or keywords (synonyms/plurals)
  const staticResults = STATIC_PAGES.filter((p) => {
    const t = (p.title || '').toLowerCase();
    const d = (p.short_description || '').toLowerCase();
    const kws = Array.isArray(p.keywords) ? p.keywords.map((k) => String(k).toLowerCase()) : [];
    return words.some((w) => t.includes(w) || d.includes(w) || kws.some((kw) => kw.includes(w) || w.includes(kw)));
  }).map((p) => ({ link: p.link, title: p.title, description: p.short_description }));

  const combined = [...dynamicResults, ...staticResults].slice(0, limit);
  const elapsedMs = Date.now() - started;
  return { results: combined, meta: { executionTimeMs: elapsedMs, dynamicCount: dynamicResults.length, staticCount: staticResults.length } };
}

// Searchers per collection
async function searchBlogs(q) {
  const results = await models.Blog.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.iLike]: ilikeTerm(q) } },
        { description: { [Op.iLike]: ilikeTerm(q) } },
        { content: { [Op.iLike]: ilikeTerm(q) } },
        { category: { [Op.iLike]: ilikeTerm(q) } },
      ],
    },
    attributes: ['id', 'title', 'description', 'content', 'category'],
    limit: 200,
  });
  return results.map((r) => ({
    link: buildLink('Blog', r),
    title: r.title,
    description: r.description || '',
  }));
}

async function searchCourses(q) {
  const results = await models.Course.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.iLike]: ilikeTerm(q) } },
        { description: { [Op.iLike]: ilikeTerm(q) } },
        { category: { [Op.iLike]: ilikeTerm(q) } },
      ],
    },
    attributes: ['id', 'title', 'description', 'category'],
    limit: 200,
  });
  return results.map((r) => ({
    link: buildLink('Course', r),
    title: r.title,
    description: r.description || '',
  }));
}

async function searchSkills(q) {
  const [readings, writings, speakings] = await Promise.all([
    models.Reading.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: ilikeTerm(q) } },
          { description: { [Op.iLike]: ilikeTerm(q) } },
          { content: { [Op.iLike]: ilikeTerm(q) } },
        ],
      },
      attributes: ['id', 'title', 'description', 'content', 'level'],
      limit: 150,
    }),
    models.Writing.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: ilikeTerm(q) } },
          { description: { [Op.iLike]: ilikeTerm(q) } },
          { content: { [Op.iLike]: ilikeTerm(q) } },
        ],
      },
      attributes: ['id', 'title', 'description', 'content', 'level'],
      limit: 150,
    }),
    models.Speaking.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: ilikeTerm(q) } },
          { description: { [Op.iLike]: ilikeTerm(q) } },
          { content: { [Op.iLike]: ilikeTerm(q) } },
          { transcript: { [Op.iLike]: ilikeTerm(q) } },
        ],
      },
      attributes: ['id', 'title', 'description', 'content', 'transcript', 'level'],
      limit: 150,
    }),
  ]);

  const mapWithType = (arr, subType) => arr.map((r) => ({
    link: buildLink(subType, r),
    title: r.title,
    description: r.description || '',
  }));

  return [
    ...mapWithType(readings, 'Reading'),
    ...mapWithType(writings, 'Writing'),
    ...mapWithType(speakings, 'Speaking'),
  ];
}

async function searchEslResources(q) {
  const [eslAudios, eslVideos, stories] = await Promise.all([
    models.EslAudio.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: ilikeTerm(q) } },
          { description: { [Op.iLike]: ilikeTerm(q) } },
          { transcript: { [Op.iLike]: ilikeTerm(q) } },
        ],
      },
      attributes: ['id', 'title', 'description', 'transcript'],
      limit: 150,
    }),
    models.EslVideo.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: ilikeTerm(q) } },
          { description: { [Op.iLike]: ilikeTerm(q) } },
        ],
      },
      attributes: ['id', 'title', 'description'],
      limit: 150,
    }),
    models.Story.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: ilikeTerm(q) } },
          { description: { [Op.iLike]: ilikeTerm(q) } },
          { contentText: { [Op.iLike]: ilikeTerm(q) } },
        ],
      },
      attributes: ['id', 'title', 'description', 'contentText'],
      limit: 150,
    }),
  ]);

  const mapWithType = (arr, subType) => arr.map((r) => ({
    link: buildLink(subType, r),
    title: r.title,
    description: r.description || '',
  }));

  return [
    ...mapWithType(eslAudios, 'EslAudio'),
    ...mapWithType(eslVideos, 'EslVideo'),
    ...mapWithType(stories, 'Story'),
  ];
}

async function searchTests(q) {
  const [sections, questions] = await Promise.all([
    models.QuizSection.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: ilikeTerm(q) } },
          { description: { [Op.iLike]: ilikeTerm(q) } },
        ],
      },
      attributes: ['id', 'name', 'description'],
      limit: 150,
    }),
    models.QuizQuestion.findAll({
      where: {
        [Op.or]: [
          { text: { [Op.iLike]: ilikeTerm(q) } },
          { optionA: { [Op.iLike]: ilikeTerm(q) } },
          { optionB: { [Op.iLike]: ilikeTerm(q) } },
          { optionC: { [Op.iLike]: ilikeTerm(q) } },
          { optionD: { [Op.iLike]: ilikeTerm(q) } },
        ],
      },
      attributes: ['id', 'text', 'optionA', 'optionB', 'optionC', 'optionD'],
      limit: 200,
    }),
  ]);

  const sectionsMapped = sections.map((r) => ({
    link: '/tutelage-tests',
    title: r.name,
    description: r.description || '',
  }));

  const questionsMapped = questions.map((r) => ({
    link: '/tutelage-tests',
    title: r.text?.slice(0, 120) || null,
    description: '',
  }));

  return [...sectionsMapped, ...questionsMapped];
}

// Main controller
exports.search = async (req, res) => {
  const started = Date.now();
  try {
    const query = (req.query.query || req.query.q || '').trim();
    const filterRaw = req.query.filter;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const format = (req.query.format || '').toLowerCase();
    // Debug: Observe incoming search query params to verify format handling
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('[search] params:', { query, filter: filterRaw, page, limit, format });
    }

    if (!query) {
      return res.status(400).json({
        error: 'Missing required parameter: query',
      });
    }

    const normalizedFilter = normalizeFilter(filterRaw);
    if (filterRaw && !normalizedFilter) {
      return res.status(422).json({
        error: 'Invalid filter. Allowed values: tests, Courses, Blogs, Skills, Esl Resources',
      });
    }

    // Compact unified mode: returns link, title, description and includes static pages
    if (format === 'compact') {
      const { results, meta } = await searchCompactUnified(query, limit * Math.max(page, 1));
      const totalResults = results.length;
      const totalPages = Math.max(Math.ceil(totalResults / limit), 1);
      const start = (page - 1) * limit;
      const end = Math.min(start + limit, totalResults);
      const sliced = results.slice(start, end);
      const elapsedMs = Date.now() - started;
      return res.json({
        mode: 'compact',
        query,
        filter: null,
        meta: {
          totalResults,
          page,
          limit,
          totalPages,
          executionTimeMs: elapsedMs,
          performance: meta,
        },
        results: sliced,
      });
    }

    let results = [];
    if (normalizedFilter) {
      // Filtered search
      if (normalizedFilter === 'blogs') results = await searchBlogs(query);
      else if (normalizedFilter === 'courses') results = await searchCourses(query);
      else if (normalizedFilter === 'skills') results = await searchSkills(query);
      else if (normalizedFilter === 'eslResources') results = await searchEslResources(query);
      else if (normalizedFilter === 'tests') results = await searchTests(query);
    } else {
      // Universal search (run in parallel)
      const [blogs, courses, skills, esl, tests] = await Promise.all([
        searchBlogs(query),
        searchCourses(query),
        searchSkills(query),
        searchEslResources(query),
        searchTests(query),
      ]);
      results = [...blogs, ...courses, ...skills, ...esl, ...tests];
    }

    // Results already match the query via ILIKE across fields; no scoring returned

    const totalResults = results.length;
    const totalPages = Math.max(Math.ceil(totalResults / limit), 1);
    const start = (page - 1) * limit;
    const end = Math.min(start + limit, totalResults);
    const sliced = results.slice(start, end);

    const elapsedMs = Date.now() - started;
    return res.json({
      mode: normalizedFilter ? 'filtered' : 'universal',
      query,
      filter: normalizedFilter || null,
      meta: {
        totalResults,
        page,
        limit,
        totalPages,
        executionTimeMs: elapsedMs,
      },
      results: sliced,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Search error:', err);
    return res.status(500).json({
      error: 'Internal server error during search',
    });
  }
};