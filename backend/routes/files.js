const express = require('express');
const router = express.Router();
const multer = require('multer');
const { signDownloadUrl, head, publicUrlForKey } = require('../utils/r2Client');
const { ResourceAnalytics } = require('../models');

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 }, fileFilter: (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true); else cb(new Error('Only PDF files are allowed'));
}});

router.get('/r2/:key', async (req, res) => {
  try {
    const key = decodeURIComponent(req.params.key);
    const expires = parseInt(req.query.expires || '900');
    // Optional analytics bump
    const { resourceType, resourceId } = req.query;
    if (resourceType && resourceId) {
      try {
        const [row] = await ResourceAnalytics.findOrCreate({
          where: { resourceType, resourceId: parseInt(resourceId) },
          defaults: { resourceType, resourceId: parseInt(resourceId), views: 0, plays: 0, downloads: 0 }
        });
        row.downloads = (row.downloads || 0) + 1;
        await row.save();
      } catch {}
    }
    const direct = publicUrlForKey(key);
    const url = direct || await signDownloadUrl(key, Math.min(Math.max(expires, 60), 3600));
    return res.redirect(302, url);
  } catch (e) {
    return res.status(404).json({ success: false, message: e.message });
  }
});

router.head('/r2/:key', async (req, res) => {
  try {
    const key = decodeURIComponent(req.params.key);
    const meta = await head(key);
    res.set('Content-Type', meta.ContentType || 'application/pdf');
    res.set('Content-Length', String(meta.ContentLength || ''));
    return res.status(200).end();
  } catch (e) {
    return res.status(404).json({ success: false, message: e.message });
  }
});

module.exports = router;
