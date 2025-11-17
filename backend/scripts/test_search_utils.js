// Minimal tests for search utils without external frameworks
const assert = (cond, msg) => { if (!cond) throw new Error(msg || 'Assertion failed'); };

const { tokenizeQuery, buildAnyWordWhere } = require('../utils/searchUtils');
const { Op } = require('sequelize');

(function testTokenizeQuery() {
  const tokens = tokenizeQuery('English for Adults!! grammar & writing');
  console.log('Tokens:', tokens);
  assert(Array.isArray(tokens), 'tokenizeQuery should return array');
  assert(tokens.includes('english'), 'token: english');
  assert(tokens.includes('adults'), 'token: adults');
  assert(tokens.includes('grammar'), 'token: grammar');
  assert(tokens.includes('writing'), 'token: writing');
  assert(!tokens.includes('!!'), 'should remove non-alphanumerics');
})();

(function testBuildAnyWordWhere() {
  const words = ['english', 'grammar'];
  const fields = ['title', 'description'];
  const where = buildAnyWordWhere(words, fields);
  console.log('Where:', JSON.stringify(where));
  assert(where && where[Op.or] && where[Op.or].length >= 2, 'OR clauses present');
})();

console.log('searchUtils tests passed');