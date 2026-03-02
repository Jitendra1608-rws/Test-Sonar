/**
 * Intentional duplicated blocks for SonarQube CPD (duplication) detection.
 * Minimum ~10 lines duplicate so CPD reports them.
 */

function validateUserInputA(input) {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Invalid input' };
  }
  const trimmed = input.trim();
  if (trimmed.length < 3) {
    return { valid: false, error: 'Too short' };
  }
  if (trimmed.length > 100) {
    return { valid: false, error: 'Too long' };
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return { valid: false, error: 'Invalid characters' };
  }
  return { valid: true, value: trimmed };
}

function validateUserInputB(input) {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Invalid input' };
  }
  const trimmed = input.trim();
  if (trimmed.length < 3) {
    return { valid: false, error: 'Too short' };
  }
  if (trimmed.length > 100) {
    return { valid: false, error: 'Too long' };
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return { valid: false, error: 'Invalid characters' };
  }
  return { valid: true, value: trimmed };
}

function formatPriceA(amount, currency) {
  if (typeof amount !== 'number' || amount < 0) return null;
  const formatted = amount.toFixed(2);
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';
  const result = symbol + ' ' + formatted;
  return result;
}

function formatPriceB(amount, currency) {
  if (typeof amount !== 'number' || amount < 0) return null;
  const formatted = amount.toFixed(2);
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';
  const result = symbol + ' ' + formatted;
  return result;
}

module.exports = { validateUserInputA, validateUserInputB, formatPriceA, formatPriceB };
