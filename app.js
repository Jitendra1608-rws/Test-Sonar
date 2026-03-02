const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7000;

// Scan issue: hardcoded secret (Sonar S2068 / secret scanners)
const INTERNAL_API_KEY = 'dev-key-12345-do-not-use-in-prod';

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Body parser - no limit (vulnerability: DoS via large payload)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const apiRouter = require('./routes/api');

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start server (skip when required for tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
