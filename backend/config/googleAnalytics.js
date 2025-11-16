// ============================================================================
// GOOGLE ANALYTICS CONFIGURATION
// ============================================================================
// Initialize Google Analytics Data API client

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');
const fs = require('fs');


// Initialize the Google Analytics Data API client (only if credentials are configured)
let analyticsDataClient = null;
const keyFilePath = process.env.GA_KEY_FILE_PATH
  ? path.resolve(__dirname, process.env.GA_KEY_FILE_PATH)
  : null;

if (!keyFilePath || !fs.existsSync(keyFilePath)) {
  console.warn('⚠️  Warning: GA_KEY_FILE_PATH not set or file missing; Google Analytics client disabled');
} else {
  try {
    analyticsDataClient = new BetaAnalyticsDataClient({ keyFilename: keyFilePath });
  } catch (err) {
    console.warn('⚠️  Warning: Failed to initialize Google Analytics client:', err?.message || err);
    analyticsDataClient = null;
  }
}

const propertyId = process.env.GA_PROPERTY_ID;

if (!propertyId) {
  console.warn('⚠️  Warning: GA_PROPERTY_ID not found in environment variables');
}

module.exports = {
  analyticsDataClient,
  propertyId
};
