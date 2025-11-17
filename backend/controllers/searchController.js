// ============================================================================
// SEARCH CONTROLLER
// ============================================================================
// Provides a single comprehensive search endpoint supporting:
// - Universal search across Tests, Courses, Blogs, Skills, ESL Resources
// - Filtered search within one of the above collections
// Implements case-insensitive text search, pagination, scoring, excerpts, and
// query execution time metrics.

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

// Helper: compute excerpt and score based on the first matched field
function buildExcerptAndScore(entry, fields, q) {
  const queryLC = q.toLowerCase();
  for (const field of fields) {
    const val = entry[field];
    if (!val || typeof val !== 'string') continue;
    const lc = val.toLowerCase();
    const idx = lc.indexOf(queryLC);
    if (idx !== -1) {
      const start = Math.max(0, idx - 60);
      const end = Math.min(val.length, idx + queryLC.length + 60);
      const excerpt = `${start > 0 ? '…' : ''}${val.slice(start, end)}${end < val.length ? '…' : ''}`;
      // Simple scoring heuristic: field weight + occurrence bonus
      const weight = field === 'title' || field === 'name' ? 1.0
        : field === 'description' ? 0.85
        : 0.75;
      // Count occurrences for a tiny boost
      let occurrences = 0;
      let pos = 0;
      while (true) {
        const found = lc.indexOf(queryLC, pos);
        if (found === -1) break;
        occurrences += 1;
        pos = found + queryLC.length;
      }
      const score = Number((weight + Math.min(occurrences * 0.05, 0.25)).toFixed(3));
      return { excerpt, score, matchedField: field };
    }
  }
  return { excerpt: null, score: 0.5, matchedField: null };
}

// ----------------------------------------------------------------------------
// COMPACT UNIFIED SEARCH (3 fields: title, id, description)
// ----------------------------------------------------------------------------
async function searchCompactUnified(query, limit) {
  const words = tokenizeQuery(query);
  const fields = ['title', 'description'];

  // Dynamic models to include (must have title/description)
  const sources = [
    { model: models.Audio, attributes: ['id', 'title', 'description'] },
    { model: models.Video, attributes: ['id', 'title', 'description'] },
    { model: models.Blog, attributes: ['id', 'title', 'description'] },
    { model: models.Reading, attributes: ['id', 'title', 'description'] },
    { model: models.Writing, attributes: ['id', 'title', 'description'] },
    { model: models.Speaking, attributes: ['id', 'title', 'description'] },
    { model: models.EslAudio, attributes: ['id', 'title', 'description'] },
    { model: models.EslVideo, attributes: ['id', 'title', 'description'] },
    { model: models.Story, attributes: ['id', 'title', 'description'] },
    { model: models.Course, attributes: ['id', 'title', 'description'] },
  ].filter((s) => !!s.model);

  const perSourceLimit = Math.max(Math.ceil(limit / sources.length) + 2, 5);
  const started = Date.now();

  const dynamicResultsSettled = await Promise.allSettled(
    sources.map((s) => s.model.findAll({
      where: buildAnyWordWhere(words, fields),
      attributes: s.attributes,
      limit: perSourceLimit,
    }))
  );

  const dynamicResults = dynamicResultsSettled.flatMap((p) => (p.status === 'fulfilled' ? p.value : []))
    .map((r) => ({ title: r.title, id: r.id, description: r.description || '' }));

  // Static results: search words in title or short_description
  const staticResults = STATIC_PAGES.filter((p) => {
    const t = (p.title || '').toLowerCase();
    const d = (p.short_description || '').toLowerCase();
    return words.some((w) => t.includes(w) || d.includes(w));
  }).map((p) => ({ title: p.title, id: p.link, description: p.short_description }));

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
  return results.map((r) => {
    const { excerpt, score } = buildExcerptAndScore(r, ['title', 'description', 'content', 'category'], q);
    return {
      collectionType: 'Blogs',
      id: r.id,
      title: r.title,
      excerpt,
      score,
    };
  });
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
  return results.map((r) => {
    const { excerpt, score } = buildExcerptAndScore(r, ['title', 'description', 'category'], q);
    return {
      collectionType: 'Courses',
      id: r.id,
      title: r.title,
      excerpt,
      score,
    };
  });
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
      attributes: ['id', 'title', 'description', 'content'],
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
      attributes: ['id', 'title', 'description', 'content'],
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
      attributes: ['id', 'title', 'description', 'content', 'transcript'],
      limit: 150,
    }),
  ]);

  const mapWithType = (arr, subType, fields) => arr.map((r) => {
    const { excerpt, score } = buildExcerptAndScore(r, fields, q);
    return {
      collectionType: 'Skills',
      subType,
      id: r.id,
      title: r.title,
      excerpt,
      score,
    };
  });

  return [
    ...mapWithType(readings, 'Reading', ['title', 'description', 'content']),
    ...mapWithType(writings, 'Writing', ['title', 'description', 'content']),
    ...mapWithType(speakings, 'Speaking', ['title', 'description', 'content', 'transcript']),
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

  const mapWithType = (arr, subType, fields) => arr.map((r) => {
    const { excerpt, score } = buildExcerptAndScore(r, fields, q);
    return {
      collectionType: 'Esl Resources',
      subType,
      id: r.id,
      title: r.title,
      excerpt,
      score,
    };
  });

  return [
    ...mapWithType(eslAudios, 'EslAudio', ['title', 'description', 'transcript']),
    ...mapWithType(eslVideos, 'EslVideo', ['title', 'description']),
    ...mapWithType(stories, 'Story', ['title', 'description', 'contentText']),
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

  const sectionsMapped = sections.map((r) => {
    const { excerpt, score } = buildExcerptAndScore(r, ['name', 'description'], q);
    return {
      collectionType: 'Tests',
      subType: 'QuizSection',
      id: r.id,
      title: r.name,
      excerpt,
      score,
    };
  });

  const questionsMapped = questions.map((r) => {
    const { excerpt, score } = buildExcerptAndScore(r, ['text', 'optionA', 'optionB', 'optionC', 'optionD'], q);
    return {
      collectionType: 'Tests',
      subType: 'QuizQuestion',
      id: r.id,
      title: r.text?.slice(0, 120) || null,
      excerpt,
      score,
    };
  });

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

    // Compact unified mode: returns title, id, description and includes static pages
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

    // Sort by score descending for better relevance
    results.sort((a, b) => b.score - a.score);

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