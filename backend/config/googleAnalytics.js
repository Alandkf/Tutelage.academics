// ============================================================================
// GOOGLE ANALYTICS CONFIGURATION
// ============================================================================
// Initialize Google Analytics Data API client

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

// Initialize the Google Analytics Data API client
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.resolve(__dirname, process.env.GA_KEY_FILE_PATH || './google-analytics-key.json')
});

const propertyId = process.env.GA_PROPERTY_ID;

if (!propertyId) {
  console.warn('⚠️  Warning: GA_PROPERTY_ID not found in environment variables');
}

module.exports = {
  analyticsDataClient,
  propertyId
};
