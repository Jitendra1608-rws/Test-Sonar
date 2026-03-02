/**
 * INLINE vulnerability patterns so Sonar Security/Duplication/Vulnerability rules detect them.
 * All issues are in THIS file with clear data flow (user input -> dangerous sink).
 * Remove this file after verifying your Sonar scan.
 */

const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

// ========== VULNERABILITY: eval with user input (S1523) ==========
function handleEval(userCode) {
  return eval(userCode);
}

// ========== VULNERABILITY: SQL injection (S3649) ==========
function getQuery(userEmail) {
  return "SELECT * FROM users WHERE email = '" + userEmail + "'";
}

// ========== VULNERABILITY: Command injection execSync (S2076) ==========
function runEcho(userInput) {
  return execSync('echo ' + userInput).toString();
}

// ========== VULNERABILITY: Command injection exec (S2076) ==========
function runLs(userDir) {
  exec('ls ' + userDir, () => {});
}

// ========== SECURITY HOTSPOT: Hardcoded credential (S2068) ==========
const PASSWORD = 'admin123';
const SECRET_KEY = 'sk_live_xxxxxxxxxxxxxxxx';

// ========== SECURITY HOTSPOT: Weak hashing MD5 (S4790) ==========
function hashPwd(pwd) {
  return crypto.createHash('md5').update(pwd).digest('hex');
}

// ========== SECURITY HOTSPOT: Weak randomness for security (S2245) ==========
function makeToken() {
  return Math.random().toString(36);
}

// ========== SECURITY HOTSPOT: Disabled certificate validation (S4830) ==========
function getInsecure(url) {
  https.get(url, { rejectUnauthorized: false }, () => {});
}

// ========== VULNERABILITY: Function constructor / unsafe deserialization (S3528) ==========
function unsafeDeserialize(userStr) {
  return new Function('return (' + userStr + ')')();
}

// ========== VULNERABILITY: Path traversal ==========
function readFile(userFilename) {
  return fs.readFileSync(path.join('/tmp', userFilename), 'utf8');
}

// ========== DUPLICATION: Block A (copy 1) - same as B and C for CPD ==========
function processOrderA(orderId, userId, amount, currency, status, notes) {
  if (!orderId || orderId.length === 0) return { error: 'Missing orderId' };
  if (!userId || userId.length === 0) return { error: 'Missing userId' };
  if (typeof amount !== 'number' || amount <= 0) return { error: 'Invalid amount' };
  if (!currency || currency.length !== 3) return { error: 'Invalid currency' };
  if (!status || !['pending', 'paid', 'shipped'].includes(status)) return { error: 'Invalid status' };
  const result = { orderId, userId, amount, currency, status, notes: notes || '' };
  return { success: true, data: result };
}

// ========== DUPLICATION: Block B (copy 2) ==========
function processOrderB(orderId, userId, amount, currency, status, notes) {
  if (!orderId || orderId.length === 0) return { error: 'Missing orderId' };
  if (!userId || userId.length === 0) return { error: 'Missing userId' };
  if (typeof amount !== 'number' || amount <= 0) return { error: 'Invalid amount' };
  if (!currency || currency.length !== 3) return { error: 'Invalid currency' };
  if (!status || !['pending', 'paid', 'shipped'].includes(status)) return { error: 'Invalid status' };
  const result = { orderId, userId, amount, currency, status, notes: notes || '' };
  return { success: true, data: result };
}

// ========== DUPLICATION: Block C (copy 3) ==========
function processOrderC(orderId, userId, amount, currency, status, notes) {
  if (!orderId || orderId.length === 0) return { error: 'Missing orderId' };
  if (!userId || userId.length === 0) return { error: 'Missing userId' };
  if (typeof amount !== 'number' || amount <= 0) return { error: 'Invalid amount' };
  if (!currency || currency.length !== 3) return { error: 'Invalid currency' };
  if (!status || !['pending', 'paid', 'shipped'].includes(status)) return { error: 'Invalid status' };
  const result = { orderId, userId, amount, currency, status, notes: notes || '' };
  return { success: true, data: result };
}

module.exports = {
  handleEval,
  getQuery,
  runEcho,
  runLs,
  PASSWORD,
  SECRET_KEY,
  hashPwd,
  makeToken,
  getInsecure,
  unsafeDeserialize,
  readFile,
  processOrderA,
  processOrderB,
  processOrderC
};
