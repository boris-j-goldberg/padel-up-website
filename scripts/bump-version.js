#!/usr/bin/env node
/**
 * Padel-Up Website version bumper
 *
 * Single source of truth: js/config.js  (what the website actually shows)
 *
 * Usage:
 *   npm run bump patch
 *   npm run bump minor
 *   npm run bump major
 *   npm run bump 2.1.0
 *
 * Print current version:
 *   npm run version
 *   npm run bump -- --current
 *
 * With git commit + annotated tag (site-vX.Y.Z):
 *   npm run bump patch -- --commit
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'js', 'config.js');

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function write(file, content) {
  fs.writeFileSync(file, content);
}

function parseSemver(v) {
  // Accepts "2", "2.0", "2.0.0", "v2.1.3" → [major, minor, patch]
  const cleaned = String(v).replace(/^v/, '').trim();
  const parts = cleaned.split('.').map((n) => parseInt(n, 10));
  while (parts.length < 3) parts.push(0);
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
}

function formatSemver(parts) {
  return parts.join('.');
}

function bumpVersion(current, typeOrVersion) {
  const types = ['major', 'minor', 'patch'];
  if (types.includes(typeOrVersion)) {
    const parts = parseSemver(current);
    if (typeOrVersion === 'major') {
      parts[0] += 1; parts[1] = 0; parts[2] = 0;
    } else if (typeOrVersion === 'minor') {
      parts[1] += 1; parts[2] = 0;
    } else {
      parts[2] += 1;
    }
    return formatSemver(parts);
  }
  // explicit version
  return formatSemver(parseSemver(typeOrVersion));
}

function updateConfigFile(currentVersion, newVersion) {
  let src = read(CONFIG_PATH);

  // Replace version: "..." inside the PADEL_CONFIG object
  // We do a targeted replace so we don't touch other possible "version" strings
  const re = /(version:\s*["'])([^"']+)(["'])/;
  if (!re.test(src)) {
    throw new Error('Could not find version field in js/config.js');
  }
  src = src.replace(re, `$1${newVersion}$3`);
  write(CONFIG_PATH, src);
}

/**
 * Update ?v=... cache buster on the main assets in all pages.
 * This forces browsers (and CDNs) to fetch fresh CSS/JS when the version changes.
 */
function updateHtmlAssetVersions(newVersion) {
  const htmlFiles = [
    path.join(ROOT, 'index.html'),
    path.join(ROOT, 'how-it-works.html'),
    path.join(ROOT, 'privacy.html'),
    path.join(ROOT, 'support.html'),
  ];

  // Matches href="css/style.css" or href="css/style.css?v=anything"
  // Same for the two JS files. We preserve the rest of the tag.
  const replacements = [
    { re: /(href="css\/style\.css)(?:\?v=[^"]*)?(")/g, repl: `$1?v=${newVersion}$2` },
    { re: /(src="js\/config\.js)(?:\?v=[^"]*)?(")/g,   repl: `$1?v=${newVersion}$2` },
    { re: /(src="js\/site\.js)(?:\?v=[^"]*)?(")/g,     repl: `$1?v=${newVersion}$2` },
  ];

  for (const file of htmlFiles) {
    let content = read(file);
    let changed = false;

    for (const { re, repl } of replacements) {
      if (re.test(content)) {
        content = content.replace(re, repl);
        changed = true;
      }
    }

    if (changed) {
      write(file, content);
    }
  }
}

function runGit(newVersion, doCommit) {
  if (!doCommit) return;

  try {
    const files = 'js/config.js index.html how-it-works.html privacy.html support.html';
    const status = execSync(`git status --porcelain ${files}`, { encoding: 'utf8' }).trim();
    if (status) {
      console.log('\nStaging changes...');
      execSync(`git add ${files}`, { stdio: 'inherit' });

      const msg = `chore(site): bump version to ${newVersion}`;
      execSync(`git commit -m "${msg}"`, { stdio: 'inherit' });

      const tag = `site-v${newVersion}`;
      execSync(`git tag -a ${tag} -m "Site version ${newVersion}"`, { stdio: 'inherit' });

      console.log(`\n✅ Committed and created tag ${tag}`);
    } else {
      console.log('\nNo changes to commit.');
    }
  } catch (e) {
    console.error('\nGit operation failed:');
    console.error(e.message);
    process.exit(1);
  }
}

function getCurrentVersion() {
  const src = read(CONFIG_PATH);
  const match = src.match(/version:\s*["']([^"']+)["']/);
  if (!match) {
    throw new Error('Could not find version in js/config.js');
  }
  return match[1];
}

function main() {
  const args = process.argv.slice(2);

  // --current → just print the version (used by "npm run version")
  if (args.includes('--current')) {
    try {
      console.log(getCurrentVersion());
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
    return;
  }

  const doCommit = args.includes('--commit') || args.includes('--tag');

  // Filter out flags to get the actual bump argument
  const bumpArg = args.find((a) => !a.startsWith('--'));

  if (!bumpArg) {
    // Friendly behavior when running "npm run bump" with no argument
    const current = getCurrentVersion();
    console.log(`Current version: ${current}`);
    console.error('\nUsage:');
    console.error('  npm run bump patch');
    console.error('  npm run bump minor');
    console.error('  npm run bump major');
    console.error('  npm run bump 2.3.1');
    console.error('');
    console.error('Print version:');
    console.error('  npm run version');
    console.error('');
    console.error('With automatic commit + tag:');
    console.error('  npm run bump patch -- --commit');
    process.exit(0);
  }

  const current = getCurrentVersion();
  const newVersion = bumpVersion(current, bumpArg);

  console.log(`Current: ${current}`);
  console.log(`New:     ${newVersion}`);

  if (newVersion === current) {
    console.log('Version unchanged.');
    return;
  }

  updateConfigFile(current, newVersion);
  updateHtmlAssetVersions(newVersion);

  console.log(`\nUpdated js/config.js and page asset URLs to ${newVersion}`);

  runGit(newVersion, doCommit);

  if (!doCommit) {
    console.log('\nNext steps (optional):');
    console.log(`  git add js/config.js index.html how-it-works.html privacy.html support.html`);
    console.log(`  git commit -m "chore(site): bump version to ${newVersion}"`);
    console.log(`  git tag -a site-v${newVersion} -m "Site version ${newVersion}"`);
  }
}

main();
