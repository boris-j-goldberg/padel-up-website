/**
 * Padel-Up Website — Central Configuration
 *
 * Single source of truth for values shown on multiple pages.
 *
 * Version here is displayed in every page footer.
 * Use semver (major.minor.patch). The UI adds the "v" prefix automatically.
 *
 * Bump it with:
 *   npm run bump patch
 *   npm run bump minor
 *   npm run bump major
 *
 * To also commit + create a git tag (site-vX.Y.Z):
 *   npm run bump patch -- --commit
 *
 * For future cross-page parameters, add them to this object.
 */
window.PADEL_CONFIG = {
  version: "3.0.0",

  // Add future shared values below as needed.
  // Examples:
  // supportEmail: "support@padel-up.net",
  // store: {
  //   google: "https://play.google.com/store/apps/details?id=com.anonymous.padelup",
  //   apple: "https://apps.apple.com/us/app/padel-up/id6759841735"
  // }
};
