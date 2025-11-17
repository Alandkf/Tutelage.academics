// Integration tests for compact unified search endpoint
const http = require('http');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;

function fetchJson(path) {
  return new Promise((resolve, reject) => {
    const url = BASE + path;
    const req = http.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ statusCode: res.statusCode, json });
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}\nResponse: ${data}`));
        }
      });
    });
    req.on('error', (err) => reject(err));
  });
}

(async function main() {
  try {
    const queries = ['english', 'business', 'story'];
    for (const q of queries) {
      const r = await fetchJson(`/api/search?format=compact&query=${encodeURIComponent(q)}&limit=10&page=1`);
      if (r.statusCode !== 200) throw new Error(`Status ${r.statusCode} for query '${q}'`);
      const results = r.json?.results || [];
      console.log(`Query '${q}': ${results.length} results (mode=${r.json?.mode})`);
      const sample = results.slice(0, 3);
      console.log('Sample items:', sample);
      const isCompact = r.json?.mode === 'compact';
      for (const it of sample) {
        if (!it.title || typeof it.title !== 'string') throw new Error('Missing title');
        if (typeof it.id !== 'number' && typeof it.id !== 'string') throw new Error('Invalid id');
        const hasDesc = typeof it.description === 'string';
        const hasExcerpt = typeof it.excerpt === 'string';
        if (isCompact && !hasDesc) throw new Error('Invalid description in compact mode');
        if (!isCompact && !hasDesc && !hasExcerpt) throw new Error('Invalid description/excerpt in universal mode');
      }
    }
    console.log('Compact search endpoint tests passed');
  } catch (e) {
    const msg = e && e.message ? e.message : String(e);
    if (msg.includes('ECONNREFUSED') || msg.includes('connect ECONNREFUSED')) {
      console.warn('Backend not running, skipping compact endpoint tests.');
      process.exit(0);
      return;
    }
    console.error('Compact search endpoint tests FAILED:', msg);
    process.exit(1);
  }
})();