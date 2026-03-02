# SonarQube Test Hooks – Security, Duplication, Vulnerabilities

This project includes **intentional** code so that a default Sonar scan reports **Security**, **Vulnerability**, and **Duplication** issues. If they don’t show up, use the steps below.

## If Issues Don’t Show (Security / Duplication / Vulnerability)

1. **Quality profile**  
   In SonarQube: **Quality Profiles** → choose **Sonar way** (or **Sonar way recommended**) for JavaScript/TypeScript.  
   In SonarCloud this is usually the default.

2. **What is analyzed**  
   `sonar-project.properties` sets:
   - `sonar.sources=app.js,routes,utils,sonar-demo-issues.js`  
   So only these paths are analyzed. Don’t remove them.

3. **Where to look in the UI**  
   - **Security / Vulnerabilities**: **Issues** (filter by “Vulnerability” or “Security”)  
   - **Security Hotspots**: **Security Hotspots** tab (review and confirm)  
   - **Duplication**: **Duplications** tab or project **Measures** (e.g. “Duplicated Lines”)

4. **Re-run**  
   Run `sonar-scanner` again after changing the quality profile or `sonar-project.properties`.

## What Gets Detected (Default Scan)

| Type | Rule / category | File(s) |
|------|------------------|--------|
| **Vulnerability** | S1523 eval | `routes/api.js` (/run), `utils/securityIssues.js`, `sonar-demo-issues.js` |
| **Vulnerability** | S2076 Command injection | `routes/api.js` (/cmd, /ping, /dir), `utils/securityIssues.js`, `sonar-demo-issues.js` |
| **Vulnerability** | S3649 SQL injection | `routes/api.js` (/lookup, /user), `utils/securityIssues.js`, `sonar-demo-issues.js` |
| **Vulnerability** | S5146 Open redirect | `routes/api.js` (/redirect) |
| **Vulnerability** | S3528 Function (eval-like) | `utils/securityIssues.js`, `sonar-demo-issues.js` |
| **Hotspot** | S2068 Hardcoded credentials | `utils/securityIssues.js`, `sonar-demo-issues.js` |
| **Hotspot** | S4790 Weak hashing (MD5) | `utils/securityIssues.js`, `sonar-demo-issues.js` |
| **Hotspot** | S2245 PRNG for security | `utils/securityIssues.js`, `sonar-demo-issues.js` |
| **Hotspot** | S4830 Disabled cert validation | `utils/securityIssues.js` |
| **Duplication** | CPD | `utils/duplicatedLogic.js`, `utils/moreDuplication.js`, `sonar-demo-issues.js` (processOrderA/B/C) |

**Inline issues** (request data → dangerous sink in the same file) are in `routes/api.js`: `/run` (eval), `/lookup` (SQL), `/cmd` (execSync), `/redirect` (redirect). These help taint analysis detect them.

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

4. In the project on SonarQube/SonarCloud:
   - Open **Issues** and filter by **Vulnerability** or **Security**.
   - Open **Security Hotspots** and resolve/review.
   - Open **Duplications** (or the duplication measure) to see duplicated blocks.

**Note:** Rule keys can differ by product/version (e.g. `javascript:S1523` vs `js:S1523`). Use **Sonar way** so the built-in security and duplication rules are active.

After you have verified the analysis, you can remove or refactor the test hooks (e.g. `sonar-demo-issues.js`, inline vulns in `routes/api.js`, and the intentional issues in `utils/`).
