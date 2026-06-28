# Website Scripts

Simple helper scripts for the Padel-Up static website.

## preview.cmd

Windows helper to start a local preview server.

Double-click `scripts\preview.cmd` (or run from repo root).

It will start `npx serve . -p 8080` and open your browser to the correct port.

Requires Node.js.

On other platforms: `npx serve . -p 8080` from the repo root.

The port is defined once at the top of `preview.cmd`. Update it there and in the docs if you ever change it.

---

## Version bumping

The **single source of truth** for the site version is `js/config.js`.

Use these commands (requires Node):

```bash
npm run version          # print current version (e.g. 2.1.0)
npm run bump patch
npm run bump minor
npm run bump major
npm run bump 2.1.0
```

To also commit the change and create a git tag (`site-vX.Y.Z`):

```bash
npm run bump patch -- --commit
```

See the root `README.md` for more details.