const express = require('express');
const router = express.Router();

const searchController = require('../controllers/searchController');

// GET /api/search
// Query params:
// - query (string, required)
// - filter (optional: one of tests, Courses, Blogs, Skills, Esl Resources)
// - page (optional, default 1)
// - limit (optional, default 20)
router.get('/', searchController.search);

module.exports = router;