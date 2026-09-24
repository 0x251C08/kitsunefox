/******************************************************************************
 * kitsunefox — user.js : QUIET Firefox defaults (usable privacy)
 *
 * An original configuration written for kitsunefox. It is NOT derived
 * from Arkenfox and follows the opposite trade-off: every pref below is
 * invisible in daily use. Anything that would break sites — WebRTC calls,
 * WebGL maps, DRM streaming, geolocation prompts, password saving,
 * history, sessions, clipboard, gamepads, push, hotel-WiFi logins —
 * is deliberately left at the Firefox default, and the sections at the
 * bottom say so in writing.
 *
 * Rule of this file: only prefs that DIFFER from stock Firefox are set.
 * If a pref already does the right thing out of the box, it is not
 * pinned here. Fewer overrides = fewer surprises after Firefox updates.
 *
 * WHAT STAYS WORKING (left at defaults on purpose):
 *   homepage + new-tab page, saved logins, form autofill, history,
 *   sessions + tab restore, WebRTC calls + screen sharing, WebGL,
 *   DRM (Netflix/Spotify), gamepads, push notifications, geolocation
 *   permission prompts, clipboard, disk cache (speed), captive portals.
 *
 * UPGRADING FROM kitsunefox v0.3.x:
 *   user.js can SET prefs but can never UNSET them, so values v0.3.x
 *   wrote (geo.enabled=false, webgl.disabled=true, media.peerconnection
 *   off, media.eme off, dom.push/gamepad/clipboardevents/netinfo off,
 *   XOriginPolicy=2, disk cache off, captive-portal off, locale pin)
 *   will STICK in your profile even though v0.4.0 no longer sets them.
 *   Pick one:
 *     a) Fresh profile (recommended): about:profiles → create + default,
 *        drop this file in, start Firefox. Done.
 *     b) Keep profile: open about:config, sort by Status, press "Reset"
 *        on each pref listed above, restart twice.
 *
 * USE:
 *   1. Fresh profile recommended (about:profiles → create + set default)
 *   2. Drop this file into the profile root (next to prefs.js), start Firefox
 *   3. user.js re-applies every launch; put personal tweaks in
 *      user-overrides.js (same folder).
 *****************************************************************************/

/* ===== QUIET STARTUP: skip the whatsnew page, keep the homepage =====
 * Homepage and new-tab page stay stock (about:home, enabled) so the
 * browser opens the way you expect. */
user_pref("browser.startup.homepage_override.mstone", "ignore");

/* ===== THEMES: let kitsunefox userChrome.css load =====
 * Firefox 69+ ignores chrome/userChrome.css and chrome/userContent.css
 * unless this is true. Without it every kitsunefox theme silently does
 * nothing (stock UI). */
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

/* ===== QUIET PHONE-HOME: telemetry, studies, experiments, crashes =====
 * No browsing data leaves the machine for Mozilla. Invisible. */
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("breakpad.reportURL", "");
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.coverage.opt-out", true);

/* ===== QUIET NEW TAB: no sponsored content, no telemetry ===== */
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredCheckboxes", false);
user_pref("browser.newtabpage.activity-stream.default.sites", "");
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);

/* ===== NO GUESSING AHEAD: prefetch and speculative connections =====
 * Firefox pre-loads links and opens connections to where it thinks you
 * will go next. Turning that off sends fewer requests and changes
 * nothing you can see. */
user_pref("network.prefetch-next", false);
user_pref("network.dns.disablePrefetch", true);
user_pref("network.predictor.enabled", false);
user_pref("network.http.speculative-parallel-limit", 0);
user_pref("browser.places.speculativeConnect.enabled", false);
user_pref("browser.urlbar.speculativeConnect.enabled", false);

/* ===== SAFE BROWSING minus the snooping =====
 * Malware/phishing blocklists stay on; only the "send downloaded files
 * to Mozilla to check" part goes off. */
user_pref("browser.safebrowsing.downloads.remote.enabled", false);

/* ===== TRACKER RESISTANCE that stays out of the way =====
 * Resist-fingerprinting spoofs dozens of tracking APIs. Letterboxing
 * stays OFF so pages fill the window instead of shrinking into gray
 * gutters — re-enable with `true` in user-overrides.js if you prefer
 * standard window sizes. Referers are trimmed to the origin cross-site
 * (full same-site referers still work, so logins and embeds are fine).
 * The two ICE prefs only matter behind a proxy and cost nothing. */
user_pref("privacy.resistFingerprinting", true);
user_pref("privacy.resistFingerprinting.letterboxing", false);
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true);
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);
user_pref("webgl.enable-debug-renderer-info", false);
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);
user_pref("media.peerconnection.ice.default_address_only", true);
user_pref("beacon.enabled", false);

/* ===== QUIET URL BAR: no keystroke exfiltration =====
 * Suggestions that phone home per keystroke go off; local history and
 * bookmark matches still work. */
user_pref("browser.search.suggest.enabled", false);
user_pref("browser.urlbar.suggest.searches", false);
user_pref("browser.urlbar.trending.featureGate", false);
user_pref("browser.urlbar.weather.featureGate", false);
user_pref("browser.urlbar.quicksuggest.enabled", false);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);

/* ===== HTTPS FIRST, STRONGER TLS =====
 * Plain-HTTP sites show a bypassable warning (per-site exception via
 * the padlock). Everything else here has no visible effect. */
user_pref("dom.security.https_only_mode", true);
user_pref("dom.security.https_only_mode_send_http_background_request", false);
user_pref("security.ssl.require_safe_negotiation", true);
user_pref("security.cert_pinning.enforcement_level", 2);

/* ===== VIDEOS WAIT FOR YOUR CLICK =====
 * Nothing autoplays until you press play. (0=allow, 1=block audible,
 * 5=block all.) */
user_pref("media.autoplay.default", 5);

/* ===== LESS CLUTTER: Pocket, screenshots, shopping, translate =====
 * Interface noise with no function you will miss. */
user_pref("extensions.pocket.enabled", false);
user_pref("extensions.screenshots.disabled", true);
user_pref("browser.shopping.experience2023.enabled", false);
user_pref("browser.translations.enable", false);

/* ===== LEFT AT FIREFOX DEFAULTS (convenience, on purpose) =====
 * Logins + password saving, form autofill, history, sessions and tab
 * restore, WebRTC calls + screen sharing, WebGL maps + 3D, DRM
 * streaming, gamepads, push notifications, geolocation permission
 * prompts, clipboard access, disk cache, captive-portal logins.
 * Nothing to set here — defaults already do the convenient thing. */

/* ===== END =====
 * Verify live state anytime in about:config (sorted by Status). */
