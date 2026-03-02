/**
 * Intentional duplicated blocks for SonarQube duplication detection testing.
 * Extract to shared function in real code.
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
  return { valid: true, value: trimmed };
}

function formatPriceA(amount, currency) {
  if (typeof amount !== 'number' || amount < 0) return null;
  const formatted = amount.toFixed(2);
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';
  return `${symbol} ${formatted}`;
}

function formatPriceB(amount, currency) {
  if (typeof amount !== 'number' || amount < 0) return null;
  const formatted = amount.toFixed(2);
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';
  return `${symbol} ${formatted}`;
}

module.exports = { validateUserInputA, validateUserInputB, formatPriceA, formatPriceB };
