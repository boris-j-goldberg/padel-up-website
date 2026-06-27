# GoDaddy DNS Setup for GitHub Pages (www.padel-up.net only)

This guide is for keeping your domain at GoDaddy while hosting the site on GitHub Pages.

## Current situation (before change)
You currently have:
- CNAME `www` → `ghs.googlehosted.com.`   (points to old Google Sites)

We will change only the `www` record.

## Step 1: Create the dedicated GitHub repo first (do this before changing DNS)

1. Go to GitHub and create a **new public repository**.
   Recommended name: `padel-up-site` or `padel-up-website`

2. Do **not** initialize it with a README (you will push files manually).

3. Clone the new repo locally.

4. Copy **everything** from this `web-site/` folder into the root of the new repo (including the `CNAME` file and `.nojekyll`).

5. Make sure these two files exist at the very root:
   - `CNAME` (contains exactly: `www.padel-up.net`)
   - `.nojekyll` (empty file or with the comment we have)

6. Commit and push to the `main` branch.

## Step 2: Configure GitHub Pages in the new repo

1. Go to your new repo → **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
3. Click **Save**.
4. Under "Custom domain", enter:
   ```
   www.padel-up.net
   ```
5. Click **Save**.

GitHub will now wait for the DNS to be correct.

## Step 3: Change DNS at GoDaddy (minimal change)

Log into GoDaddy → My Products → DNS for `padel-up.net`

**Find this record:**
- Type: CNAME
- Name/Host: `www`
- Value/Points to: `ghs.googlehosted.com.`

**Change it to:**
- Type: CNAME
- Name/Host: `www`
- Value/Points to: `YOUR_GITHUB_USERNAME.github.io.`

Example:
```
www   CNAME   yourusername.github.io.
```

**Important notes:**
- Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username (the one that owns the new repo).
- Keep the trailing dot `.` at the end if GoDaddy allows it.
- Do **NOT** change any of these records:
  - The SPF TXT records (they contain `resend.com` and `amazonses.com`)
  - The `_domainconnect` record
- You can later delete the two `google-site-verification` TXT records once the site is fully moved off Google Sites.

## Step 4: Wait and verify

- DNS changes usually propagate in 5–60 minutes (sometimes up to a few hours).
- Go back to GitHub repo → Settings → Pages.
- GitHub should eventually show **"DNS check successful"**.
- Once it does, check the box **"Enforce HTTPS"**.

## After everything works

- Test `https://www.padel-up.net`
- Update any links in the mobile app and app store descriptions to use the new `https://www.padel-up.net/...` URLs.
- You can then clean up or redirect the old Google Sites pages.

## Troubleshooting

- If HTTPS stays grayed out: wait longer, or remove the custom domain in GitHub settings, save, then add it again.
- Make sure the `CNAME` file in the repo exactly matches `www.padel-up.net` (no extra spaces, no https://).
- Clear your browser cache or test in incognito.

## Summary of DNS change (one line)

Change only this:

**Before:**
CNAME www → ghs.googlehosted.com.

**After:**
CNAME www → yourusername.github.io.