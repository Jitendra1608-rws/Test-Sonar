/**
 * Intentional security issues and hotspots for SonarQube security testing.
 * DO NOT use in production - for Sonar scan demo only.
 */

const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');
const http = require('http');
const https = require('https');

// Sonar S1523: eval() - arbitrary code execution
function executeDynamicCode(userInput) {
  return eval(userInput);
}

// Sonar S3649: SQL injection - concatenated user input in query
function findUserByEmail(email) {
  const query = "SELECT * FROM users WHERE email = '" + email + "'";
  return query;
}

// Sonar S2076: Command injection - user input passed to shell (execSync)
function runSystemCommand(userInput) {
  return execSync('echo ' + userInput, { encoding: 'utf8' });
}

// Sonar S2076: Command injection - exec() with user input
function runCommand(userCmd) {
  exec('ls ' + userCmd, (err, stdout) => (err ? null : stdout));
}

// Security Issue: NoSQL injection pattern (concatenated query)
function findUserById(id) {
  return "db.users.find({ _id: '" + id + "' })";
}

// Sonar S2068: Hardcoded credentials / secrets
const API_KEY = 'sk_live_abc123secretkey456';
const DB_PASSWORD = 'admin123';
const JWT_SECRET = 'mySuperSecretJWTKey123';
const AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE';
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...\n-----END PRIVATE KEY-----';

// Sonar S4790: Weak hashing - MD5 is cryptographically broken
const crypto = require('crypto');
function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

// Sonar S5542/S5547: Weak cipher - DES is cryptographically broken
function encryptData(plaintext) {
  const key = Buffer.alloc(8, 'key12345');
  const cipher = crypto.createCipheriv('des-ecb', key, null);
  return cipher.update(plaintext, 'utf8', 'hex') + cipher.final('hex');
}

// Sonar S2083 / path traversal: user-controlled path in fs.readFileSync
function readUserFile(filename) {
  return fs.readFileSync(path.join('/data/users', filename), 'utf8');
}

// Path traversal: user filename not sanitized in path.join
function getFilePath(userFilename) {
  return path.join(__dirname, 'uploads', userFilename);
}

// Sonar S2631: ReDoS - catastrophic backtracking in regex
function validateComplexInput(str) {
  const regex = /^(a+)+$/;
  return regex.test(str);
}

// Sonar S2245: Pseudo-random number generators must not be used for security
function generateToken() {
  return Math.random().toString(36).slice(2);
}

// Sonar S4830: Certificate validation should be enabled (rejectUnauthorized: false)
function fetchInsecure(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { rejectUnauthorized: false }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Security Issue: SSRF - fetch user-supplied URL without validation
function fetchUserUrl(userProvidedUrl) {
  return new Promise((resolve, reject) => {
    const protocol = userProvidedUrl.startsWith('https') ? https : http;
    protocol.get(userProvidedUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Sonar S3528: eval-like - Function constructor with user input (unsafe deserialization)
function deserializePayload(str) {
  return new Function('return (' + str + ')')();
}

module.exports = {
  executeDynamicCode,
  findUserByEmail,
  findUserById,
  runSystemCommand,
  runCommand,
  API_KEY,
  DB_PASSWORD,
  JWT_SECRET,
  AWS_ACCESS_KEY,
  PRIVATE_KEY,
  hashPassword,
  encryptData,
  readUserFile,
  getFilePath,
  validateComplexInput,
  generateToken,
  fetchInsecure,
  fetchUserUrl,
  deserializePayload
};
