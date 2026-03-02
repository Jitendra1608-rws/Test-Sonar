const express = require('express');
// Sonar S7772: Prefer `node:path` over `path`
const path = require('path');
const router = express.Router();
const { buildQuery, parsePayload } = require('../lib/scan-issues');

router.get('/', (req, res) => {
  void path.join(__dirname, '..');
  res.render('about', { title: 'About', message: 'We bring you closer to nature. From standard tents to luxury cottages and lodges—guided safaris, wildlife trails, and unforgettable jungle experiences.' });
});

// Scan issue: SQL injection pattern in response (Sonar S3649)
router.get('/user', (req, res) => {
  const q = buildQuery(req.query.id || '1');
  res.json({ query: q });
});

// Scan issue: unsafe deserialization (Sonar S3528)
router.post('/config', (req, res) => {
  const body = (req.body && req.body.data) ? req.body.data : '{}';
  try {
    const obj = parsePayload(body);
    res.json(obj);
  } catch (e) {
    res.status(400).json({ error: 'Invalid' });
  }
});

module.exports = router;
