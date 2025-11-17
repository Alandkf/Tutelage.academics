// Simple performance benchmark for compact unified search
const http = require('http');

const q = process.argv[2] || process.env.QUERY || 'english';
const iterations = Number(process.argv[3] || process.env.N || 20);
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;

function fetchOnce() {
  return new Promise((resolve, reject) => {
    const start = process.hrtime.bigint();
    const url = `${BASE}/api/search?format=compact&query=${encodeURIComponent(q)}&limit=10&page=1`;
    const req = http.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          JSON.parse(data);
          const end = process.hrtime.bigint();
          resolve(Number(end - start) / 1e6); // ms
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });
    req.on('error', (err) => reject(err));
  });
}

(async function main() {
  const times = [];
  for (let i = 0; i < iterations; i++) {
    try {
      const ms = await fetchOnce();
      times.push(ms);
      process.stdout.write('.');
    } catch (e) {
      console.error('\nRequest failed:', e.message);
    }
  }
  console.log('\nRuns:', times.length);
  if (!times.length) return;
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const sorted = times.slice().sort((a, b) => a - b);
  const p95 = sorted[Math.floor(sorted.length * 0.95) - 1] || sorted[sorted.length - 1];
  console.log(`Query='${q}', avg=${avg.toFixed(2)}ms, p95=${p95.toFixed(2)}ms`);
})();