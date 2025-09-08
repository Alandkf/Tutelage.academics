const express = require('express');
const { Blog } = require('../models');
const router = express.Router();

// GET /blogs - Fetch all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            order: [['createdAt', 'DESC']] // Order by newest first
        });
        
        console.log(`✅ Successfully fetched ${blogs.length} blog entries`);
        
        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        console.error('❌ Error fetching blogs:', error);
        
        res.status(500).json({
            success: false,
            message: 'Failed to fetch blogs',
            error: error.message
        });
    }
});

module.exports = router;