/**
 * API routes - uses utils that trigger Sonar findings.
 * Some branches are intentionally not covered by tests.
 */

const express = require('express');
const router = express.Router();
const { validateUserInputA, formatPriceA } = require('../utils/duplicatedLogic');
const { findUserByEmail, hashPassword, generateToken } = require('../utils/securityIssues');
const { getDiscountTier, safeParse, getErrorMessage } = require('../utils/maintainability');

// Uncovered: POST /api/validate - only GET is tested
router.post('/validate', (req, res) => {
  const result = validateUserInputA(req.body?.input || '');
  res.json(result);
});

router.get('/validate', (req, res) => {
  const result = validateUserInputA(req.query.input || '');
  res.json(result);
});

// Uncovered: price formatting endpoint
router.get('/price', (req, res) => {
  const amount = parseFloat(req.query.amount);
  const currency = req.query.currency || 'USD';
  const formatted = formatPriceA(amount, currency);
  res.json({ formatted: formatted || 'Invalid' });
});

// Security issue in use - SQL injection pattern
router.get('/user', (req, res) => {
  const query = findUserByEmail(req.query.email || '');
  res.json({ query }); // demo only
});

// Uncovered: discount tier (complex function)
router.get('/discount', (req, res) => {
  const purchases = parseInt(req.query.purchases, 10) || 0;
  const memberYears = parseInt(req.query.memberYears, 10) || 0;
  const tier = getDiscountTier(purchases, memberYears, false, false, 0);
  res.json({ tier });
});

// Uncovered: safeParse used
router.post('/parse', (req, res) => {
  const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  const parsed = safeParse(body);
  res.json({ parsed, success: !!parsed });
});

// Error message - duplicate string usage
router.get('/error/:code', (req, res) => {
  const msg = getErrorMessage(parseInt(req.params.code, 10));
  res.status(req.params.code).json({ error: msg });
});

module.exports = router;
