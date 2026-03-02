const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact', message: 'Book your safari or ask us anything. We\'re here to help you plan your jungle adventure.' });
});

module.exports = router;
