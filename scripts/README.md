# Website Scripts

Simple helper scripts for the Padel-Up static website.

## preview.cmd

Windows helper to start a local preview server.

Double-click `scripts\preview.cmd` (or run from repo root).

It will start `npx serve . -p 8080` and open your browser to the correct port.

Requires Node.js.

On other platforms: `npx serve . -p 8080` from the repo root.

The port is defined once at the top of `preview.cmd`. Update it there and in the docs if you ever change it.