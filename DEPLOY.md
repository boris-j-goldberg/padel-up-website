# Padel-Up Static Site — Deployment & Maintenance

## Source of truth
All website source lives in this folder: `web-site/`

It is versioned together with the rest of the padel-matching-app1 repository (git).

Never mix with the `web/` React application.

## Current pages (v1 — shipped)
- index.html — Home / landing (compact)
- how-it-works.html — Main explanatory page (videos + simplified flow + screenshots)
- privacy.html — Privacy Policy
- support.html — Support + FAQ

This is the first version being put into production. Further polish will happen after the initial live deployment.

## Local preview
1. Open `index.html` directly in any browser (works for quick check).
2. Recommended: serve statically so links and assets resolve perfectly:

```powershell
# from repo root
cd web-site
npx serve .
# or
python -m http.server 8080
```

Then visit http://localhost:8080

## Adding visuals (screenshots & clips)
1. Copy relevant files from your Dropbox:
   - `C:\Users\boris\Dropbox\Padel App\Videos` → `web-site/assets/videos/`
   - `C:\Users\boris\Dropbox\Padel App\screenshots` → `web-site/assets/images/`
2. Optimize:
   - Videos: short (15–40s), 720p or 1080p, h264, < 10–15 MB per clip.
   - Screenshots: PNG or JPG, 2x resolution for retina, max ~1200px wide.
3. Update `index.html`:
   - Replace the placeholder `<div class="media-placeholder">` blocks with real `<video>` or `<img>` tags.
   - Add captions or “Watch: Creating a game + approvals” etc.

## Styling / branding
- All colors, fonts and layout tokens are in `css/style.css` (CSS variables at top).
- The design uses the emerald green from the mobile app and the padel-up icon.
- To change primary color globally, edit only the `--primary` and related vars.

## Versioning & rollback
- Use normal git commits.
- Tag releases: `git tag site-v1.0.0`
- To rollback: checkout the tag or commit and re-deploy the files from that point.
- Keep a short CHANGELOG in this file or in the root documents if preferred.

## Google Sites deployment notes
Modern Google Sites has limited support for arbitrary full-page custom HTML/JS/CSS.

Current practical options (choose one):

### Option A — Recommended for full design control (suggested)
- Host the static files on a free static host that supports custom domains:
  - GitHub Pages (easiest if repo is public or private with Pages enabled)
  - Netlify (drag & drop or git)
  - Vercel
- Point your domain `padel-up.net` (or www) at the host.
- This gives you pixel-perfect control and the current nice styling.

### Option B — Stay inside Google Sites
- Recreate the layout using Google Sites’ built-in sections, text, image, and embed blocks.
- Use the HTML files here as the **content source of truth** (copy text, headings, structure).
- You can embed specific videos via YouTube/Vimeo if you host the clips there.
- Pros: you already have it set up.
- Cons: design flexibility is lower; you will lose some of the custom CSS polish.

### Option C — Hybrid
- Keep privacy.html / support.html content and paste improved versions into Google Sites pages.
- Use the Home as a reference for what the public landing should feel like.

## How to publish (once you pick a host)
1. Make sure `web-site/` contains the final files.
2. (Optional) create a production build folder if you later add a tiny build step.
3. Upload / push / deploy the folder contents.
4. Test on the live domain.
5. If using git-based hosting, merge to `main` (or a `site` branch) to trigger deploy.

## Staging vs Production
Simple pattern:
- `main` branch = production site
- A `site-staging` branch or a subfolder `/staging` for preview
- Or just open the files locally / via a Netlify draft deploy before promoting.

## Maintenance checklist before publishing
- [ ] All links work (Home ↔ Privacy ↔ Support)
- [ ] Images and videos load
- [ ] Store links point to current app pages
- [ ] Email address up to date
- [ ] Privacy policy date updated if content changed
- [ ] Mobile responsive check (open in phone browser or devtools)

## Questions / changes
Open an issue or just edit the files and commit. The source is the single place to edit.

Last updated: 2026-06-21 (initial rollout)
