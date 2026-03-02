const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Vulnerability: Reflected XSS - req.query.name reflected in view without encoding
  const userName = req.query.name || '';
  const message = 'Book your safari or ask us anything. We\'re here to help you plan your jungle adventure.';
  res.render('contact', { title: 'Contact', message, userName });
});

module.exports = router;
