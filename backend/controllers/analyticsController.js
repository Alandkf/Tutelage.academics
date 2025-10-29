// ============================================================================
// ANALYTICS CONTROLLER
// ============================================================================
// Logs resource usage (views, plays, downloads) and exposes basic metrics.

const { ResourceAnalytics } = require('../models');

exports.logEvent = async (req, res) => {
  try {
    const { resourceType, resourceId, eventType } = req.body;
    if (!resourceType || !resourceId || !eventType) {
      return res.status(400).json({ success: false, message: 'resourceType, resourceId, and eventType are required' });
    }
    const validResource = ['video', 'audio', 'story'].includes(resourceType);
    const validEvent = ['view', 'play', 'download'].includes(eventType);
    if (!validResource || !validEvent) {
      return res.status(400).json({ success: false, message: 'Invalid resourceType or eventType' });
    }
    const [row] = await ResourceAnalytics.findOrCreate({
      where: { resourceType, resourceId },
      defaults: { views: 0, plays: 0, downloads: 0 }
    });
    const updates = { views: row.views, plays: row.plays, downloads: row.downloads };
    if (eventType === 'view') updates.views += 1;
    if (eventType === 'play') updates.plays += 1;
    if (eventType === 'download') updates.downloads += 1;
    await row.update(updates);
    res.status(200).json({ success: true, message: 'Event logged', data: row });
  } catch (err) {
    console.error('Error logging analytics event:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getMetrics = async (req, res) => {
  try {
    const { resourceType, resourceId } = req.params;
    if (!resourceType || !resourceId) return res.status(400).json({ success: false, message: 'resourceType and resourceId are required' });
    const row = await ResourceAnalytics.findOne({ where: { resourceType, resourceId } });
    res.status(200).json({ success: true, data: row || { resourceType, resourceId, views: 0, plays: 0, downloads: 0 } });
  } catch (err) {
    console.error('Error fetching analytics metrics:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getTop = async (req, res) => {
  try {
    const { resourceType = 'video', limit = 10 } = req.query;
    const rows = await ResourceAnalytics.findAll({ where: { resourceType }, order: [['views', 'DESC']], limit: parseInt(limit) });
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error('Error fetching top analytics:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};