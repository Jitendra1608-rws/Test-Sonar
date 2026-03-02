/**
 * API routes - uses utils that trigger Sonar findings.
 * Contains intentional security vulnerabilities for scanning (eval, injection, XSS, open redirect, SSRF).
 */

const express = require('express');
const router = express.Router();
const { validateUserInputA, formatPriceA } = require('../utils/duplicatedLogic');
const {
  findUserByEmail,
  findUserById,
  executeDynamicCode,
  runSystemCommand,
  runCommand,
  fetchUserUrl,
  deserializePayload,
  getFilePath
} = require('../utils/securityIssues');
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

// --- Intentional vulnerability endpoints (for security scan testing) ---

// Vulnerability: Reflected XSS - user input echoed without encoding
router.get('/search', (req, res) => {
  const q = req.query.q || '';
  res.set('Content-Type', 'text/html');
  res.send('<html><body>Search results for: ' + q + '</body></html>');
});

// Vulnerability: Open redirect - user-controlled redirect URL
router.get('/redirect', (req, res) => {
  const url = req.query.url || '/';
  res.redirect(url);
});

// Sonar S2076: Command injection (execSync with user input)
router.get('/ping', (req, res) => {
  const host = req.query.host || 'localhost';
  try {
    const out = runSystemCommand(host);
    res.json({ output: out });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

// Sonar S2076: Command injection (exec with user input)
router.get('/dir', (req, res) => {
  const dir = req.query.dir || '.';
  runCommand(dir);
  res.json({ ok: true });
});

// Vulnerability: eval / code execution
router.post('/calc', (req, res) => {
  const expr = req.body?.expr || '0';
  try {
    const result = executeDynamicCode(expr);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

// Vulnerability: Unsafe deserialization
router.post('/payload', (req, res) => {
  const raw = req.body?.data || '{}';
  try {
    const obj = deserializePayload(raw);
    res.json({ parsed: obj });
  } catch (e) {
    res.status(400).json({ error: 'Invalid payload' });
  }
});

// Vulnerability: SSRF - fetch user-supplied URL
router.get('/fetch', (req, res) => {
  const targetUrl = req.query.url || 'http://example.com';
  fetchUserUrl(targetUrl)
    .then((data) => res.send(data))
    .catch((err) => res.status(502).send(String(err.message)));
});

// Vulnerability: NoSQL injection pattern in use
router.get('/user/:id', (req, res) => {
  const query = findUserById(req.params.id);
  res.json({ query });
});

// Vulnerability: Path traversal - user filename in file path
router.get('/file', (req, res) => {
  const name = req.query.name || 'readme.txt';
  try {
    const filePath = getFilePath(name);
    const content = require('fs').readFileSync(filePath, 'utf8');
    res.send(content);
  } catch (e) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
