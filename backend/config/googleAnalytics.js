const { BetaAnalyticsDataClient } = require('@google-analytics/data');

let analyticsDataClient = null;

if (!process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CLIENT_EMAIL) {
  console.warn("⚠️ Google Analytics credentials missing. Client disabled.");
} else {
  try {
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN
      }
    });
  } catch (err) {
    console.warn("⚠️ Cannot init Google Analytics client:", err.message);
  }
}

const propertyId = process.env.GA_PROPERTY_ID;

module.exports = {
  analyticsDataClient,
  propertyId
};
