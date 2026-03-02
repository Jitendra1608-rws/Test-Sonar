/**
 * Intentional issues for Sonar / Open IA / security scans.
 * DO NOT use in production. Remove after verifying scan results.
 */

const { execSync, exec } = require('child_process');
// Sonar S7777: Prefer `node:fs` over `fs`
const fs = require('fs');
// Sonar S7772: Prefer `node:path` over `path`
const path = require('path');
const crypto = require('crypto');
const https = require('https');

// --- Vulnerability: eval (Sonar S1523, Semgrep, CodeQL) ---
function runEval(userInput) {
  return eval(userInput);
}

// --- Vulnerability: SQL injection (Sonar S3649) ---
function buildQuery(userId) {
  return "SELECT * FROM accounts WHERE id = '" + userId + "'";
}

// --- Vulnerability: Command injection (Sonar S2076) ---
function runShell(cmd) {
  return execSync(cmd).toString();
}
function runList(dir) {
  exec('dir ' + dir, (err, out) => (err ? null : out));
}

// --- Security Hotspot: Hardcoded secrets (Sonar S2068) ---
const DB_PASS = 'rootpassword';
const API_SECRET = 'sk-1234567890abcdef';
const ENCRYPT_KEY = 'abcdef1234567890';

// --- Security Hotspot: Weak crypto MD5 (Sonar S4790) ---
function checksum(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

// --- Security Hotspot: Weak PRNG for security (Sonar S2245) ---
function randomId() {
  return Math.floor(Math.random() * 1e9).toString(36);
}

// --- Security Hotspot: Disabled SSL verification (Sonar S4830) ---
function getUrl(url) {
  https.get(url, { rejectUnauthorized: false }, (res) => {
    res.on('data', () => {});
  });
}

// --- Vulnerability: Unsafe deserialization / Function (Sonar S3528) ---
function parsePayload(str) {
  return new Function('return ' + str)();
}

// --- Vulnerability: Path traversal ---
function loadFile(name) {
  return fs.readFileSync(path.join('/app/data', name), 'utf8');
}

// --- Duplication: same block repeated for CPD ---
function validateA(x) {
  if (!x || typeof x !== 'string') return false;
  const t = x.trim();
  if (t.length < 2) return false;
  if (t.length > 200) return false;
  return true;
}
function validateB(x) {
  if (!x || typeof x !== 'string') return false;
  const t = x.trim();
  if (t.length < 2) return false;
  if (t.length > 200) return false;
  return true;
}

module.exports = {
  runEval,
  buildQuery,
  runShell,
  runList,
  DB_PASS,
  API_SECRET,
  ENCRYPT_KEY,
  checksum,
  randomId,
  getUrl,
  parsePayload,
  loadFile,
  validateA,
  validateB
};
