// ============================================================================
// PDF Proxy Routes
// ============================================================================
// Streams remote PDF content through our server to ensure inline viewing.
// Sets Content-Disposition to inline and proper Content-Type to avoid forced
// downloads when users click PDF links.

const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * GET /api/pdf/view?url=<encoded>
 * Proxies a remote PDF for inline viewing.
 */
router.get('/view', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ success: false, message: 'Missing url query parameter' });
    }

    // Basic validation: only allow http/https URLs
    const isAllowed = /^https?:\/\//i.test(url);
    if (!isAllowed) {
      return res.status(400).json({ success: false, message: 'Invalid URL protocol' });
    }

    // Stream the PDF from the remote source
    const response = await axios.get(url, { responseType: 'stream' });

    // Infer filename from URL for user-friendly display
    let filename = 'document.pdf';
    try {
      const parsed = new URL(url);
      const last = decodeURIComponent(parsed.pathname.split('/').pop() || 'document.pdf');
      filename = last.endsWith('.pdf') ? last : `${last}.pdf`;
    } catch (_) {}

    // Force inline viewing with correct content type
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    // Allow embedding in our app (do not set X-Frame-Options)

    // Pipe the remote stream to the client
    response.data.on('error', (err) => {
      console.error('PDF proxy stream error:', err);
      res.destroy(err);
    });
    response.data.pipe(res);
  } catch (error) {
    console.error('Error proxying PDF:', error?.message || error);
    res.status(500).json({ success: false, message: 'Failed to retrieve PDF', error: error?.message || String(error) });
  }
});

module.exports = router;