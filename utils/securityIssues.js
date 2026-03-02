/**
 * Intentional security issues and hotspots for SonarQube security testing.
 * DO NOT use in production - for Sonar scan demo only.
 */

const fs = require('fs');
const path = require('path');

// Security Issue: eval() - arbitrary code execution
function executeDynamicCode(userInput) {
  return eval(userInput); // eslint-disable-line no-eval
}

// Security Issue: SQL injection pattern (concatenated query)
function findUserByEmail(email) {
  const query = "SELECT * FROM users WHERE email = '" + email + "'";
  return query;
}

// Security Hotspot: Hardcoded credentials
const API_KEY = 'sk_live_abc123secretkey456';
const DB_PASSWORD = 'admin123';

// Security Hotspot: Weak crypto - MD5 is cryptographically broken
const crypto = require('crypto');
function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

// Security Hotspot: Path traversal risk
function readUserFile(filename) {
  return fs.readFileSync(path.join('/data/users', filename), 'utf8');
}

// Security Issue: Regular expression DoS (ReDoS) - catastrophic backtracking
function validateComplexInput(str) {
  const regex = /^(a+)+$/;
  return regex.test(str);
}

// Security Hotspot: Insecure randomness for security-sensitive use
function generateToken() {
  return Math.random().toString(36).slice(2);
}

module.exports = {
  executeDynamicCode,
  findUserByEmail,
  API_KEY,
  DB_PASSWORD,
  hashPassword,
  readUserFile,
  validateComplexInput,
  generateToken
};
