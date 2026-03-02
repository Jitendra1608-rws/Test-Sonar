# Node.js Basic App (with intentional bugs)

A **basic** Node.js + Express app that includes **intentional buggy code** for testing code-quality and security scanners (e.g. SonarQube/SonarCloud). Use for demos and learning—**do not use in production**.

## What’s included (on purpose)

| Type | Examples |
|------|----------|
| **Duplication** | Repeated validation/format logic in `utils/duplicatedLogic.js`, `utils/moreDuplication.js`, `utils/deprecated-apis.js`, `sonar-demo-issues.js` |
| **Security issues** | Hardcoded secrets, weak crypto (MD5), weak PRNG, disabled SSL verification, path traversal |
| **Vulnerabilities** | `eval()` with user input, SQL/NoSQL injection patterns, command injection, open redirect, XSS (unescaped output in views), unsafe deserialization |
| **Deprecations** | `new Buffer()`, `fs.exists`, `util.isArray` / `util.isRegExp` / `util.isDate` |

See **[SONAR_TEST_README.md](SONAR_TEST_README.md)** for full list of issues and how to run a Sonar scan.

## Structure

```
├── app.js                 # Entry point (hardcoded secret, large body limit)
├── package.json
├── routes/
│   ├── index.js           # Home, /debug (command injection), /go (open redirect)
│   ├── about.js           # /user (SQL), /config (unsafe deserialize)
│   ├── contact.js         # Reflected XSS via userName
│   └── api.js             # eval, SQL, exec, redirect, path traversal, etc.
├── utils/
│   ├── duplicatedLogic.js # Duplicate validate/format functions
│   ├── moreDuplication.js # More duplicate blocks
│   ├── securityIssues.js  # eval, SQL, exec, secrets, MD5, PRNG, SSL off
│   ├── deprecated-apis.js # Deprecated Buffer/fs/util usage + duplicates
│   └── maintainability.js # Complex logic, empty catch, duplicate strings
├── lib/
│   └── scan-issues.js     # Same vulnerability/duplication patterns
├── sonar-demo-issues.js   # Inline vulns + duplication for Sonar
├── views/                 # index.ejs, contact.ejs use <%- %> (XSS risk)
└── tests/
    └── api.test.js        # Partial coverage for Sonar
```

## Run

```bash
npm install
npm start
```

Then open **http://localhost:7000**

- `/` — Home  
- `/about` — About  
- `/contact` — Contact  
- `/api/validate`, `/api/run`, `/api/lookup`, `/api/cmd`, `/api/redirect`, etc. — API routes with intentional issues  

## Test & Sonar

```bash
npm test
sonar-scanner
```

See **SONAR_TEST_README.md** for Quality Profile and where to find Security, Vulnerabilities, and Duplications in SonarQube/SonarCloud.
