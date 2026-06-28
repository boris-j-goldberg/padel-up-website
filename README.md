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
npx serve . -p 8080
```

Or on Windows just double-click `scripts\preview.cmd` (it forces the same port).

## Deployment (GitHub Pages + GoDaddy)

This site is deployed using **GitHub Pages** on `www.padel-up.net`.

The content in this folder is the source of truth.

See the dedicated guide:
- `GO_DADDY_DNS_INSTRUCTIONS.md` — exact DNS changes needed at GoDaddy
- `DEPLOY.md` — general deployment notes

### Quick local preview
```bash
npx serve . -p 8080
```
or double-click `scripts\preview.cmd` on Windows.

## Site configuration (version, future shared values)

- **Version** shown in every page footer comes from **one place only**: `js/config.js` (`window.PADEL_CONFIG.version`).
- Use semver (e.g. `2.1.0`). The UI shows it as `v2.1.0`.
- Print the current version:

  ```bash
  npm run version
  ```

- Bump the version (updates only `js/config.js`):

  ```bash
  npm run bump patch     # 2.0.0 → 2.0.1
  npm run bump minor     # 2.0.1 → 2.1.0
  npm run bump major
  npm run bump 2.3.0     # set explicit version
  ```

- To also create a git commit + annotated tag (`site-vX.Y.Z`):

  ```bash
  npm run bump patch -- --commit
  ```

- Version bumps also rewrite the asset URLs (`css/style.css?v=...`, `js/config.js?v=...`, etc.).
  This is the main mechanism for busting browser + CDN caches on GitHub Pages.
  After a deploy you will often still need one hard refresh (Ctrl/Cmd + Shift + R) to get the updated HTML itself.

- For other cross-page values in the future (emails, store URLs, feature flags, etc.), add them in the same `js/config.js` object.
- The local dev server port lives at the top of `scripts/preview.cmd` (and is referenced from docs).

This keeps duplication to zero for parameters that must be consistent.

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
