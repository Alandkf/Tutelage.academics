const express = require('express');
const router = express.Router();

const VideoController = require('../controller/VideoController');

router.get('/', VideoController.get);

module.exports = router;
//k