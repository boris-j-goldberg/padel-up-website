/**
 * Padel-Up Website — Central Configuration
 *
 * This is the single source of truth for values that need to appear
 * across multiple pages (version, contact info, future settings, etc.).
 *
 * Usage in HTML/JS:
 *   const cfg = window.PADEL_CONFIG;
 *   console.log(cfg.version);
 *
 * For future parameters, add them here and consume via JS or a small
 * initializer in site.js. Keep this file dependency-free.
 */
window.PADEL_CONFIG = {
  // Shown in page footers. Use a plain number; the UI adds the "v" prefix.
  version: "2",

  // Add future shared values below as needed.
  // Examples:
  // supportEmail: "support@padel-up.net",
  // store: {
  //   google: "https://play.google.com/store/apps/details?id=com.anonymous.padelup",
  //   apple: "https://apps.apple.com/us/app/padel-up/id6759841735"
  // }
};
