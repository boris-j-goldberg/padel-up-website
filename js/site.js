/**
 * Padel-Up Website — Small shared behaviors
 *
 * Currently just populates the site version from config into any
 * element with class "site-version".
 *
 * Add other cross-page utilities here when needed.
 */
(function () {
  function initVersion() {
    var cfg = window.PADEL_CONFIG || {};
    var v = cfg.version != null ? cfg.version : "1";
    var nodes = document.querySelectorAll(".site-version");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = "v" + v;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVersion);
  } else {
    initVersion();
  }
})();
