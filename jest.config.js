module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'routes/**/*.js',
    'utils/**/*.js',
    'app.js',
    '!**/node_modules/**'
  ],
  testMatch: ['**/tests/**/*.test.js']
};
