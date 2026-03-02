const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('about', { title: 'About', message: 'We bring you closer to nature. From standard tents to luxury cottages and lodges—guided safaris, wildlife trails, and unforgettable jungle experiences.' });
});

module.exports = router;
