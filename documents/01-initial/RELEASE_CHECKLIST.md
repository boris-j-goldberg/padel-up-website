# Padel-Up Website — Release Checklist

Use this checklist every time you update the public website.

## Before pushing

- [ ] Local preview works
  - Run `scripts\preview.cmd` (Windows) or `npx serve . -p 8080` from the repo root.
  - Open http://localhost:8080
  - (The canonical local port is defined at the top of `scripts/preview.cmd`)

- [ ] All pages load without errors
  - Home, How it Works, Privacy, Support

- [ ] Links are correct
  - Internal navigation
  - Store buttons
  - Contact email → support@padel-up.net

- [ ] Videos play

- [ ] Screenshots open in lightbox, look good on mobile

- [ ] Mobile / responsive view OK (use browser dev tools)

- [ ] Content up to date (no old Google Sites references)

- [ ] No sensitive info left in text

## Push & Deploy

- Commit with clear message
- Push to main of the website repo
- GitHub Pages auto-deploys

## Verify in production

- Test https://www.padel-up.net
- **Hard refresh** (important because of browser + CDN caching):
  - Windows/Linux: Ctrl + Shift + R
  - Mac: Cmd + Shift + R
  - Or open DevTools (F12) → Network tab → check "Disable cache", then reload
- Bumping the version (`npm run bump ...`) automatically adds `?v=NEW` to CSS/JS URLs.
  This makes most updates visible without a hard refresh after the first load.
- All links, videos, lightbox work

## After deployment (if URLs changed)

- Update app store listings
- Update documents/09-app site/app-description.txt
- Update in-app links if any

## Rollback

- Revert the commit in the repo and push. GitHub Pages will redeploy previous version.