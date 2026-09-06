# SafarBook

This is the SafarBook travel site (Next.js + Tailwind + Mongoose).

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

How to push this repository to GitHub

Option A — manual (recommended if you prefer GitHub web UI):

1. Create a new repository on GitHub named `safarbook` (do NOT initialize with README).
2. In this project folder run:

```bash
git init
git add .
git commit -m "Initial commit - SafarBook"
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/safarbook.git
git branch -M main
git push -u origin main
```

Option B — using GitHub CLI (`gh`):

```bash
gh repo create safarbook --public --source=. --remote=origin --push
```

Notes
- Before pushing, make sure to add any secrets (MongoDB URI, JWT secret) to a `.env` file and DO NOT commit it.
- Example `.env` keys: `MONGODB_URI`, `JWT_SECRET`.

If you want, I can run the git commands here for you — tell me whether I should (and confirm your GitHub username or whether `gh` is installed and authenticated). 

Trigger redeploy note: small metadata change to trigger Vercel redeploy.
# SafarBook — Landing Site (Next.js + Tailwind)

This repository contains a simple Next.js landing site for SafarBook. It focuses on a clean, mobile-first, nature-inspired design and direct WhatsApp integration for lead generation and bookings.

Getting started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

Open http://localhost:3000

Notes
- The site uses a local JS data module at `data/trips.js` (so you can add more trips easily).
- All booking/customization actions open a WhatsApp message to `+91 8894480690` with pre-filled details.
- Styles via Tailwind; edit `tailwind.config.js` to change theme colors.

Deploy
- Deploy to Vercel for best performance. Connect this repo and push.
