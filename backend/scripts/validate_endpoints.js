// Simple endpoint validator for level filtering and tags fields
// Runs a few GET requests against the running backend and prints summaries.

const http = require('http');

const PORT = process.env.PORT || 3001;
const HOST = '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;

function fetchJson(path) {
  return new Promise((resolve) => {
    const url = BASE + path;
    const req = http.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ statusCode: res.statusCode, json });
        } catch (e) {
          resolve({ statusCode: res.statusCode, text: data, parseError: e.message });
        }
      });
    });
    req.on('error', (err) => {
      try {
        resolve({ error: err.message, raw: JSON.stringify(err, Object.getOwnPropertyNames(err)) });
      } catch (_) {
        resolve({ error: err && err.message ? err.message : 'unknown error' });
      }
    });
  });
}

function printLevels(items, getItem) {
  const arr = (getItem(items) || []).slice(0, 3);
  return arr.map((it) => ({ id: it.id, level: it.level }));
}

function printTags(items, getItem) {
  const arr = (getItem(items) || []).slice(0, 3);
  return arr.map((it) => ({ id: it.id, tags: it.tags }));
}

(async function main() {
  console.log(`\n== Validating endpoints on ${BASE} ==`);

  const status = await fetchJson('/api/status');
  console.log('Status:', status);

  const blogs = await fetchJson('/api/blogs?limit=5&level=a1,b1');
  console.log('\nBlogs (level=a1,b1): status', blogs.statusCode);
  if (blogs.json && blogs.json.success) {
    console.log('Count:', (blogs.json.blogs || []).length);
    console.log('Sample levels:', printLevels(blogs.json, (j) => j.blogs));
  } else {
    console.log('Blogs response:', blogs);
  }

  const speakings = await fetchJson('/api/speakings?limit=5&level=a1,b1');
  console.log('\nSpeakings (level=a1,b1): status', speakings.statusCode);
  if (speakings.json && speakings.json.success) {
    console.log('Count:', (speakings.json.data?.speakings || []).length);
    console.log('Sample levels:', printLevels(speakings.json.data, (d) => d.speakings));
    console.log('Sample tags:', printTags(speakings.json.data, (d) => d.speakings));
  } else {
    console.log('Speakings response:', speakings);
  }

  const writings = await fetchJson('/api/writings?limit=5&level=a1,b1');
  console.log('\nWritings (level=a1,b1): status', writings.statusCode);
  if (writings.json && writings.json.success) {
    console.log('Count:', (writings.json.data?.writings || []).length);
    console.log('Sample levels:', printLevels(writings.json.data, (d) => d.writings));
    console.log('Sample tags:', printTags(writings.json.data, (d) => d.writings));
  } else {
    console.log('Writings response:', writings);
  }

  // Also fetch single items if available (first id)
  try {
    const firstWriting = writings.json?.data?.writings?.[0];
    if (firstWriting?.id) {
      const wById = await fetchJson(`/api/writings/${firstWriting.id}`);
      console.log(`\nWriting by ID ${firstWriting.id}:`, wById);
    }
    const firstSpeaking = speakings.json?.data?.speakings?.[0];
    if (firstSpeaking?.id) {
      const sById = await fetchJson(`/api/speakings/${firstSpeaking.id}`);
      console.log(`\nSpeaking by ID ${firstSpeaking.id}:`, sById);
    }
  } catch (e) {
    console.log('Error fetching by ID:', e.message);
  }

  console.log('\n== Validation complete ==');
})();