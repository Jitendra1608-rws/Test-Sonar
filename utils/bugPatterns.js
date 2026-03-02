/**
 * Intentional bug patterns for SonarQube bug detection testing.
 */

// Bug: Possibly undefined / null dereference
function getFirstItem(arr) {
  return arr[0].id; // arr or arr[0] may be undefined
}

// Bug: Unreachable code
function alwaysReturns() {
  return true;
  console.log('never runs'); // unreachable
}

// Bug: Identical branches (dead code)
function getStatus(code) {
  if (code > 0) {
    return 'active';
  } else {
    return 'active'; // same as above - one branch is redundant
  }
}

// Bug: Array prototype mutation
function addHelper() {
  Array.prototype.extra = function () { return this.length; }; // eslint-disable-line no-extend-native
}

// Code smell: Use of == instead of ===
function looseCompare(a, b) {
  return a == b; // prefer ===
}

module.exports = { getFirstItem, alwaysReturns, getStatus, addHelper, looseCompare };
