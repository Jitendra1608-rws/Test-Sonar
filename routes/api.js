/**
 * API routes - uses utils that trigger Sonar findings.
 * INLINE vulnerabilities below (req -> dangerous sink in same file) so Sonar Security/Vulnerability detects them.
 */

const express = require('express');
const { execSync } = require('child_process');
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

// INLINE Reflected XSS - user input in response (Vulnerability)
router.get('/search', (req, res) => {
  const q = req.query.q || '';
  res.set('Content-Type', 'text/html');
  res.send('<html><body>Search results for: ' + q + '</body></html>');
});

// INLINE Open redirect - user input to res.redirect (S5146)
router.get('/redirect', (req, res) => {
  const url = req.query.url || '/';
  res.redirect(url);
});

// INLINE eval with user input - same file so taint is detected (S1523)
router.post('/run', (req, res) => {
  const code = req.body && req.body.code ? req.body.code : '1+1';
  try {
    const result = eval(code);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ error: String(e.message) });
  }
});

// INLINE SQL concatenation with user input (S3649)
router.get('/lookup', (req, res) => {
  const email = req.query.email || '';
  const query = "SELECT * FROM users WHERE email = '" + email + "'";
  res.json({ query });
});

// INLINE Command injection - execSync with user input (S2076)
router.get('/cmd', (req, res) => {
  const arg = req.query.arg || 'hello';
  try {
    const out = execSync('echo ' + arg).toString();
    res.json({ output: out });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
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
