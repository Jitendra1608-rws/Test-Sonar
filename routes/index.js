const express = require('express');
const { execSync } = require('child_process');
const router = express.Router();

router.get('/', (req, res) => {
  const search = req.query.q || '';
  res.render('index', { title: 'Home', message: 'Discover the wild. Your jungle safari adventure starts here.', search });
});

// Scan issue: command injection - user input in execSync (Sonar S2076)
router.get('/debug', (req, res) => {
  const host = req.query.host || '127.0.0.1';
  const out = execSync('ping -n 1 ' + host).toString();
  res.type('text').send(out);
});

// Scan issue: open redirect (Sonar S5146)
router.get('/go', (req, res) => {
  res.redirect(req.query.to || '/');
});

module.exports = router;
