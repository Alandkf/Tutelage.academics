// ============================================================================
// SEARCH UTILS
// ============================================================================
// Helper functions for word-tokenized case-insensitive search across fields.

const { Op } = require('sequelize');

/**
 * Split a query into distinct words suitable for ILIKE matching.
 * - lowercases
 * - strips non-alphanumerics
 * - removes very short tokens (length < 2)
 * - deduplicates
 * @param {string} q
 * @returns {string[]}
 */
function tokenizeQuery(q) {
  if (!q) return [];
  const cleaned = String(q)
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ');
  const tokens = cleaned
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => t.length >= 2);
  // Deduplicate
  return Array.from(new Set(tokens)).slice(0, 10); // cap to avoid excessive OR clauses
}

/**
 * Build a Sequelize WHERE object that matches any word in any of the provided fields.
 * @param {string[]} words
 * @param {string[]} fields
 * @returns {object} Sequelize where clause
 */
function buildAnyWordWhere(words, fields) {
  if (!words || words.length === 0) return { [Op.and]: [] };
  const ors = [];
  for (const w of words) {
    for (const f of fields) {
      ors.push({ [f]: { [Op.iLike]: `%${w}%` } });
    }
  }
  return { [Op.or]: ors };
}

module.exports = {
  tokenizeQuery,
  buildAnyWordWhere,
};