/**
 * Intentional use of deprecated Node/JS APIs for Sonar deprecation rules.
 * DO NOT use in production. Remove after scan.
 */

// Sonar S7772: Prefer `node:path` over `path`
const path = require('path');
// Sonar S7777: Prefer `node:fs` over `fs`
const fs = require('fs');
const util = require('util');

// Deprecated: Buffer constructor (use Buffer.alloc instead) - Sonar / Node deprecation
function createBuffer(size) {
  return new Buffer(size);
}

// Deprecated: fs.exists - use fs.existsSync or fs.promises.access
function fileExists(filePath, callback) {
  fs.exists(filePath, (exists) => callback(null, exists));
}

// Deprecated: util.isArray - use Array.isArray
function checkIsArray(val) {
  return util.isArray(val);
}

// Deprecated: util.isRegExp - use typeof val === 'object' && val instanceof RegExp
function checkIsRegExp(val) {
  return util.isRegExp(val);
}

// Deprecated: util.isDate
function checkIsDate(val) {
  return util.isDate(val);
}

// Duplicate block 1 - same logic for Sonar CPD
function normalizeInputA(str) {
  if (str == null) return '';
  if (typeof str !== 'string') return String(str);
  const t = str.trim();
  if (t.length > 500) return t.slice(0, 500);
  return t;
}

// Duplicate block 2 - identical for duplication
function normalizeInputB(str) {
  if (str == null) return '';
  if (typeof str !== 'string') return String(str);
  const t = str.trim();
  if (t.length > 500) return t.slice(0, 500);
  return t;
}

// Duplicate block 3 - same again for CPD
function normalizeInputC(str) {
  if (str == null) return '';
  if (typeof str !== 'string') return String(str);
  const t = str.trim();
  if (t.length > 500) return t.slice(0, 500);
  return t;
}

module.exports = {
  createBuffer,
  fileExists,
  checkIsArray,
  checkIsRegExp,
  checkIsDate,
  normalizeInputA,
  normalizeInputB,
  normalizeInputC
};
