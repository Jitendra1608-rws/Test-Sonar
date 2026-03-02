/**
 * More duplicated blocks - same logic as in duplicatedLogic.js with slight variation.
 * Sonar should report duplication across files.
 */

function validateEmailFormatA(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.indexOf('@') === -1) return false;
  const parts = trimmed.split('@');
  if (parts.length !== 2) return false;
  if (parts[0].length < 1 || parts[1].length < 3) return false;
  return true;
}

function validateEmailFormatB(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.indexOf('@') === -1) return false;
  const parts = trimmed.split('@');
  if (parts.length !== 2) return false;
  if (parts[0].length < 1 || parts[1].length < 3) return false;
  return true;
}

function sanitizeForDisplayA(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sanitizeForDisplayB(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = { validateEmailFormatA, validateEmailFormatB, sanitizeForDisplayA, sanitizeForDisplayB };
