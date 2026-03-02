const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Home', message: 'Discover the wild. Your jungle safari adventure starts here.' });
});

module.exports = router;
