# SonarQube Test Hooks - Default Scan

This project includes **intentional** code that triggers **SonarQube/SonarCloud default scan** findings. No custom rules are required—run a normal `sonar-scanner` and these issues will be reported.

## Default Scan – What Gets Detected

| Sonar rule / category | Location | What to expect |
|------------------------|----------|----------------|
| **S1523** – `eval` is dangerous | `utils/securityIssues.js` (executeDynamicCode), `routes/api.js` (/api/calc) | Security vulnerability |
| **S2076** – Command injection | `utils/securityIssues.js` (runSystemCommand, runCommand), `routes/api.js` (/api/ping, /api/dir) | exec/execSync with user input |
| **S3649** – SQL injection | `utils/securityIssues.js` (findUserByEmail), `routes/api.js` (/api/user) | String concatenation in SQL |
| **S2068** – Hardcoded credentials | `utils/securityIssues.js` (API_KEY, DB_PASSWORD, JWT_SECRET, etc.) | Security hotspot |
| **S4790** – Weak hashing (MD5) | `utils/securityIssues.js` (hashPassword) | Security hotspot |
| **S5542 / S5547** – Weak cipher (DES) | `utils/securityIssues.js` (encryptData) | Security hotspot |
| **S2245** – PRNG for security | `utils/securityIssues.js` (generateToken) | Math.random() for token |
| **S4830** – Disabled cert validation | `utils/securityIssues.js` (fetchInsecure) | rejectUnauthorized: false |
| **S5146** – Open redirect | `routes/api.js` (/api/redirect) | res.redirect(user-controlled URL) |
| **S3528** – Function constructor (eval-like) | `utils/securityIssues.js` (deserializePayload), `routes/api.js` (/api/payload) | new Function(userInput) |
| **ReDoS** (S2631 or equivalent) | `utils/securityIssues.js` (validateComplexInput) | Catastrophic backtracking regex |
| **Path traversal** | `utils/securityIssues.js` (readUserFile, getFilePath), `routes/api.js` (/api/file) | User input in path/fs |
| **Duplications** | `utils/duplicatedLogic.js`, `utils/moreDuplication.js` | Copy-pasted blocks |
| **Maintainability / Bugs** | `utils/maintainability.js`, `utils/bugPatterns.js` | Complexity, empty catch, etc. |

## How to Run (Default Scan)

1. **Install dependencies** (including Jest for coverage):
   ```bash
   npm install
   ```

2. **Run tests with coverage** (generates `coverage/lcov.info` for Sonar):
   ```bash
   npm test
   ```

3. **Run default Sonar scan** (no custom rules needed):
   ```bash
   sonar-scanner
   ```
   Or SonarCloud:
   ```bash
   sonar-scanner -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=<token>
   ```

4. In SonarQube/SonarCloud, open the project and check **Issues** and **Security Hotspots**. The items in the table above should appear with the listed rule keys (or equivalent in your Sonar version).

**Note:** Rule keys may vary slightly by product (SonarQube vs SonarCloud) and language (JavaScript vs Node.js). The code is written to match standard built-in security and hotspot rules so a default scan detects them.

After you have verified the analysis, you can remove or refactor these test hooks.
