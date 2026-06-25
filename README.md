# Padel-Up Website (Static)

This directory contains the **static marketing / informational website** for Padel-Up.

**Important distinction:**
- `web/` (sibling) = the full React + Vite web application (currently behind mobile, to be reorganized later).
- `web-site/` = this folder = simple, fast, static HTML/CSS/JS site for:
  - Home / landing
  - Privacy Policy
  - Support
  - (future: How it Works, etc.)

## Purpose
- Provide professional public pages at padel-up.net (currently placeholder on Google Sites).
- Host accurate Privacy Policy and Support info.
- Visually explain the app using screenshots + video clips.
- Styled consistently with the Padel-Up mobile app icon and branding.

## Branding Guidelines (initial)
See `css/style.css` for CSS variables.

Primary colors (inspired by app + padel court):
- Primary: #059669 (emerald green)
- Primary light: #10b981
- Dark: #0f172a
- Muted text: #64748b
- Backgrounds: #f8fafc / white cards
- Accent (for CTAs): #f59e0b (amber for padel ball vibe)

## Page Structure (planned)
- index.html (Home)
- privacy.html
- support.html

## Assets
- icons copied from `documents/09-app site/icons/`
- Add optimized screenshots and short videos (mp4 or YouTube embeds) under `assets/`

## How to preview locally
Open any .html file directly in a browser, or run a simple server:
```
cd web-site
npx serve .
```

## Deployment (GitHub Pages + GoDaddy)

This site is deployed using **GitHub Pages** on `www.padel-up.net`.

The content in this folder is the source of truth.

See the dedicated guide:
- `GO_DADDY_DNS_INSTRUCTIONS.md` — exact DNS changes needed at GoDaddy
- `DEPLOY.md` — general deployment notes

### Quick local preview
```bash
cd web-site
npx serve .
```

### Important
This folder will be copied into a **dedicated Git repository** for the website (recommended for clean GitHub Pages setup). The main app repo will only keep a reference.

## Versions
Use git commits / branches / tags for versions of the site content.
Consider a `staging/` branch or separate folder for pre-prod.

## Current status — v1 (shipped to production)

This is the **first public version** of the site.

- [x] 4 pages:
  - Home (very compact landing)
  - How it Works (videos + simplified 4-step flow + Getting started section + lightbox on screenshots)
  - Privacy
  - Support
- [x] Two real videos integrated
- [x] Real screenshots from the app used
- [x] Consistent branding (pale green + bold blue)
- [x] All pages use `support@padel-up.net`
- [x] "How it Works" is the main detailed page; Home links to the two main sections (videos / simple flow)

**Known limitations in v1** (to be polished later):
- Home page is intentionally very minimal (user request for no scrolling + focus on store buttons + short explanation).
- Visual density and some layout details will be improved in follow-up iterations.
- Some screenshots could still be better cropped/selected.

## Deployment
See `DEPLOY.md`.

## Next (post-v1)
- Polish Home page visual feel and information density
- Curate / replace screenshots
- Possible layout and copy improvements based on real usage
- Decide long-term hosting (recommended: proper static host + custom domain)
