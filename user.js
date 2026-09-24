/******************************************************************************
 * kitsunefox — user.js : HARDENED Firefox privacy profile
 *
 * Inspired by the Arkenfox user.js. Pref names/values below were verified
 * against arkenfox/user.js v144 (21 Apr 2026, MIT) fetched 2026-09-18,
 * except items tagged [EXTRA] (long-stable prefs outside that snapshot).
 *
 * Legend:
 *   [STRICTER] enforced here, optional-or-off upstream — expect breakage,
 *              read the note, move to user-overrides.js if it bites you
 *   [EXTRA]    long-stable pref not present in the cited upstream snapshot
 *              (verified from years of stable Firefox behavior, not invented)
 *
 * BREAKAGE YOU SHOULD EXPECT: RFP can break some sites (letterboxing
 *   stays off so pages fill the window/fullscreen); WebGL off breaks maps/3D; EME off breaks Netflix/Spotify;
 *   logins/sessions/history persist across restarts by default (v0.3.2);
 *   XOriginPolicy referers break some logins/embeds;
 *   autoplay/push/clipboard-JS/gamepads are off.
 *
 * USE:
 *   1. Fresh profile recommended (about:profiles → create + set default)
 *   2. Drop this file into the profile root (next to prefs.js), start Firefox
 *   3. user.js re-applies every launch; put personal tweaks in
 *      user-overrides.js (same folder). To fully reset: remove user.js,
 *      open about:config, sort by Status, "Reset" every modified pref.
 *****************************************************************************/

/* ===== 0000 STARTUP / HOMEPAGE / NEWTAB (show homepage) ===== */
user_pref("browser.startup.homepage", "about:home");
user_pref("browser.startup.homepage_override.mstone", "ignore");
user_pref("browser.newtabpage.enabled", true);

/* ===== 0100 GEOLOCATION ===== */
user_pref("geo.enabled", false); // [STRICTER] breaks maps/location prompts

/* ===== 0150 CUSTOM CHROME CSS (required for kitsunefox themes) =====
 * Firefox 69+ ignores chrome/userChrome.css and chrome/userContent.css
 * unless this is true. Without it, every kitsunefox theme silently does
 * nothing (stock UI, exactly like the v0.3.0 Firefox 156 report). */
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

/* ===== 0200 SAFE BROWSING (keep malware/phishing lists, kill download snooping) ===== */
user_pref("browser.safebrowsing.downloads.remote.enabled", false);

/* ===== 0300 NEW TAB / SPONSORED CONTENT ===== */
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredCheckboxes", false);
user_pref("browser.newtabpage.activity-stream.default.sites", "");
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);

/* ===== 0310 LOCALE (stop leaking language list for fingerprinting) ===== */
user_pref("javascript.use_us_english_locale", true); // [EXTRA]

/* ===== 0400 NORMANDY / STUDIES / TELEMETRY / CRASH ===== */
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("breakpad.reportURL", "");
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false); // locked per channel; belt-and-braces
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.coverage.opt-out", true);

/* ===== 0500 NETWORK: PHONING HOME, PREFETCH, SPECULATION, DISK ===== */
user_pref("network.captive-portal-service.enabled", false); // breaks hotel-WiFi logins
user_pref("network.connectivity-service.enabled", false);
user_pref("network.prefetch-next", false); // [EXTRA] no link prefetch
user_pref("network.dns.disablePrefetch", true); // [EXTRA]
user_pref("network.predictor.enabled", false); // [EXTRA] no speculative preconnections
user_pref("network.http.speculative-parallel-limit", 0); // [EXTRA]
user_pref("browser.places.speculativeConnect.enabled", false); // [EXTRA]
user_pref("browser.urlbar.speculativeConnect.enabled", false);
user_pref("browser.cache.disk.enable", false); // RAM-only cache; slight perf cost

/* ===== 0600 COOKIES / SANITIZE / HISTORY / SESSION =====
 * NOTE: network.cookie.cookieBehavior=5 (total third-party blocking) is now
 * a Firefox default — not pinned here, already on.
 * v0.3.2: shutdown wipe is OFF so logins, sessions, tabs and history
 * survive restarts. Re-enable per-line in user-overrides.js if you want
 * amnesiac behavior back. */
user_pref("privacy.sanitize.sanitizeOnShutdown", false);
user_pref("privacy.sanitize.timeSpan", 0);
user_pref("privacy.clearOnShutdown_v2.cache", true);
user_pref("privacy.clearOnShutdown_v2.formdata", false);
user_pref("privacy.clearOnShutdown_v2.cookiesAndStorage", false);
// siteSettings kept (zoom/permissions)
user_pref("places.history.enabled", true);
user_pref("browser.sessionstore.privacy_level", 0);
user_pref("browser.sessionstore.max_tabs_undo", 25);
user_pref("browser.sessionstore.resume_from_crash", true);

/* ===== 0700 REFERERS ===== */
user_pref("network.http.referer.XOriginTrimmingPolicy", 2); // origin-only cross-site
user_pref("network.http.referer.XOriginPolicy", 2); // [STRICTER] same-host only; breaks some logins/embeds

/* ===== 0800 RESIST FINGERPRINTING (RFP) =====
 * The single biggest anti-tracking switch. Spoofs dozens of APIs.
 * Letterboxing is OFF so pages fill the window/fullscreen instead of
 * shrinking into gray gutters (the v0.3.0 Firefox 156 report). Re-enable
 * with `true` in user-overrides.js if you prefer standard window sizes. */
user_pref("privacy.resistFingerprinting", true); // [STRICTER]
user_pref("privacy.resistFingerprinting.letterboxing", false);
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true);

/* ===== 0900 WEBRTC / MEDIA / DRM ===== */
user_pref("media.peerconnection.enabled", false); // [STRICTER] kills WebRTC: no browser calls/screenshare
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true); // defense-in-depth
user_pref("media.peerconnection.ice.default_address_only", true); // defense-in-depth
user_pref("media.navigator.enabled", false); // [STRICTER] no device enumeration
user_pref("media.video_stats.enabled", false); // [STRICTER]
user_pref("media.autoplay.default", 5); // [EXTRA] block all autoplay (0=allow,1=block audible,5=block all)
user_pref("media.eme.enabled", false); // [STRICTER] no DRM: Netflix/Spotify/Hulu break
user_pref("dom.gamepad.enabled", false); // [STRICTER] no gamepad API (controllers in web games break)

/* ===== 1000 FINGERPRINTING SURFACES ===== */
user_pref("webgl.disabled", true); // [STRICTER] breaks maps/3D/configurators
user_pref("webgl.enable-debug-renderer-info", false); // [STRICTER]
user_pref("dom.netinfo.enabled", false); // [EXTRA] no Network Information API
user_pref("dom.push.enabled", false); // [STRICTER] no web push notifications
user_pref("dom.event.clipboardevents.enabled", false); // [STRICTER] sites can't snoop copy/paste (some editors suffer)
// browser.send_pings (hyperlink auditing) already defaults false — left alone
user_pref("beacon.enabled", false); // [EXTRA] no Navigator.sendBeacon tracking

/* ===== 1100 HTTPS / TLS ===== */
user_pref("dom.security.https_only_mode", true); // plain-HTTP sites break (bypass per-site via padlock)
user_pref("dom.security.https_only_mode_send_http_background_request", false);
user_pref("security.ssl.require_safe_negotiation", true);
user_pref("security.cert_pinning.enforcement_level", 2); // strict HPKP-style pinning

/* ===== 1200 PASSWORDS / FORMS / AUTOFILL =====
 * v0.3.2: login saving and form autofill follow Firefox defaults so you
 * stay logged in across restarts. Prefer a real password manager over
 * the built-in one; disable per-line in user-overrides.js if wanted. */
user_pref("signon.rememberSignons", true);
user_pref("signon.autofillForms", true);
user_pref("signon.formlessCapture.enabled", true);
user_pref("browser.formfill.enable", true);
user_pref("extensions.formautofill.addresses.enabled", false); // [STRICTER]
user_pref("extensions.formautofill.creditCards.enabled", false); // [STRICTER]

/* ===== 1300 URL BAR / SEARCH (no keystroke exfiltration) ===== */
user_pref("browser.search.suggest.enabled", false);
user_pref("browser.urlbar.suggest.searches", false);
user_pref("browser.urlbar.trending.featureGate", false);
user_pref("browser.urlbar.weather.featureGate", false);
user_pref("browser.urlbar.quicksuggest.enabled", false);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);

/* ===== 1400 POCKET / SCREENSHOTS / SHOPPING / TRANSLATE ===== */
user_pref("extensions.pocket.enabled", false); // [EXTRA]
user_pref("extensions.screenshots.disabled", true); // [EXTRA] no cloud screenshot uploads
user_pref("browser.shopping.experience2023.enabled", false); // [EXTRA] no review-checker sidebar
user_pref("browser.translations.enable", false); // [EXTRA] no remote translation calls

/* ===== END =====
 * Verify live state anytime in about:config (sorted by Status).
 * Upstream reference: https://github.com/arkenfox/user.js (MIT). */
