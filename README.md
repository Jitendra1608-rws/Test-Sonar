# Node.js Basic App

A simple Node.js app with Express, routing, and a basic UI.

## Structure

```
├── app.js              # Entry point, Express setup
├── package.json
├── routes/
│   ├── index.js        # Home route (/)
│   ├── about.js        # About route (/about)
│   └── contact.js      # Contact route (/contact)
├── views/
│   ├── partials/       # Header & footer
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   └── 404.ejs
└── public/
    └── css/
        └── style.css
```

## Run

```bash
npm start
```

Then open http://localhost:3000

## Routes

- `/` — Home
- `/about` — About
- `/contact` — Contact
- Any other path — 404 page
