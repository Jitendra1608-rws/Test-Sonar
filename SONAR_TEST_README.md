# SonarQube Test Hooks - Quick Reference

This project includes **intentional** code that triggers SonarQube/SonarCloud findings so you can verify your analysis setup.

## What Was Added

| Category | Location | What Sonar Will Flag |
|----------|----------|----------------------|
| **Duplications** | `utils/duplicatedLogic.js`, `utils/moreDuplication.js` | Copy-pasted blocks (validateUserInputA/B, formatPriceA/B, validateEmailFormatA/B, sanitizeForDisplayA/B) |
| **Security Issues** | `utils/securityIssues.js` | `eval()`, SQL concatenation, ReDoS regex |
| **Security Hotspots** | `utils/securityIssues.js` | Hardcoded secrets, MD5 hashing, path traversal, weak randomness |
| **Maintainability** | `utils/maintainability.js` | Too many parameters, high cognitive complexity, long function, empty catch, duplicate strings, boolean complexity |
| **Bugs** | `utils/bugPatterns.js` | Possible null dereference, unreachable code, identical branches, extending native prototype, `==` instead of `===` |
| **Coverage** | `routes/api.js`, `tests/api.test.js` | Only GET `/api/validate` is tested; other routes and utils are uncovered |

## How to Run

1. **Install dependencies** (including Jest for coverage):
   ```bash
   npm install
   ```

2. **Run tests with coverage** (generates `coverage/lcov.info` for Sonar):
   ```bash
   npm test
   ```

3. **Run SonarScanner** (requires [SonarScanner](https://docs.sonarqube.org/latest/analyzing-source-code/scanners/sonarscanner/) installed and `sonar-project.properties` configured for your server):
   ```bash
   sonar-scanner
   ```
   Or with SonarCloud:
   ```bash
   sonar-scanner -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=<token>
   ```

4. **Optional**: Point `sonar-project.properties` to your SonarQube/SonarCloud project key and adjust exclusions if needed.

## Expected Sonar Results

- **Duplications**: Multiple blocks in `utils/duplicatedLogic.js` and `utils/moreDuplication.js`
- **Security**: Issues and hotspots in `utils/securityIssues.js`
- **Maintainability**: Code smells and complexity in `utils/maintainability.js`
- **Bugs**: Issues in `utils/bugPatterns.js`
- **Coverage**: Lower coverage on `routes/api.js` and all of `utils/*` except what’s exercised by the one test

After confirming the analysis, you can remove or refactor these files and the test hooks.
