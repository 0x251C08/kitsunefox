# kitsunefox 🦊

A hardened + themed Firefox configuration focused on privacy, reduced browser noise, and a customizable Firefox interface.

> [!NOTE]
> This is the original kitsunefox repo, if you want to access forks, click the forks button to [view all forks of kitsunefox](https://github.com/0x251C08/kitsunefox/forks).

`kitsunefox` combines:

- a hardened `user.js`
- multiple Firefox `userChrome.css` themes
- a cosmetic `userContent.css` cleanup layer

It is **not** a Firefox fork and **not** a browser extension.

## v0.5.0

10 new compact themes: `vercel`, `matrix`, `orng`, `lucent-orng`, `flexoki`, `flexoki-dark`, `flexoki-light`, `synthwave84`, `aura`, `bit16` (custom retro-1980s CGA theme). 71 styles total (67 theme dirs + 4 Catppuccin root files).

## v0.4.0

* `user.js` rewritten from scratch as an original kitsunefox configuration. New philosophy: **usable privacy** — every pref is invisible in daily use, and anything that would break sites is left at the Firefox default. Only prefs that differ from stock are set (~45 instead of ~90). Convenience kept: homepage, saved logins, history, sessions, WebRTC calls, WebGL, DRM streaming, gamepads, push, geolocation prompts, clipboard, disk cache, hotel-WiFi logins.
* New `./install-themes-only.sh`: installs just the theme CSS into your Firefox profile — no `user.js`, no hardening, never launches the browser. Opposite of `launcher/` (the graphical setup, which installs a desktop entry that *starts* the browser).
* Upgrading from v0.3.x: `user.js` can set prefs but never unset them, so either use a fresh profile or reset the dropped v0.3.x prefs in `about:config` (full list in the `user.js` header). No theme changes.

## v0.3.2

Stay-logged-in release: logins, sessions, tabs and history now survive browser restarts and closing the browser.

* Shutdown wipe off (`sanitizeOnShutdown = false`, cookies/storage/formdata kept; only cache still clears).
* History on, session restore on (`privacy_level = 0`, 25 closed tabs undoable, crash resume on).
* Login saving and form autofill follow Firefox defaults (`rememberSignons`/`autofillForms` on; address and credit-card autofill stay off).
* To go back to amnesiac behavior, override per-line in `user-overrides.js`. No theme changes from v0.3.1.

## v0.3.1

Fixes the "theme doesn't apply" failure reported on Firefox 156 (stock-looking UI despite a correct `chrome/userChrome.css`, as in the Discord-login screenshot):

* `user.js` now sets `toolkit.legacyUserProfileCustomizations.stylesheets = true`, so Firefox 69+ actually loads `chrome/userChrome.css` / `chrome/userContent.css`. Previously this was a manual `about:config` step, and skipping it silently disabled all 61 styles.
* Removed the stale nested `kitsunefox/` snapshot directory (v0.1.0-era duplicate that shadowed real paths and confused installation).
* Content fills the window again: `privacy.resistFingerprinting.letterboxing` is now `false` (RFP itself stays on). Previously letterboxing shrank pages into gray gutters, as in the screenshot.
* Startup shows the Firefox homepage (`about:home`, new-tab page on) instead of a blank screen.
* No theme changes; still 61 styles (57 theme dirs + 4 Catppuccin root files). Verified on Firefox 156.

## v0.3.0

61 styles (57 theme dirs + 4 Catppuccin root files) + hardened `user.js` + cosmetic `userContent.css`. New in v0.3.0: 24 compact themes — `coffee-shops`, `darcula`, `dotrb`, `dracula`, `evergarden`, `jade-necklace`, `japan-night`, `liminal`, `neo-sploosh`, `onedark-pro`, `rainbow`, `shades-of-jade`, `solarized`, `solarized-dark`, `solarized-light`, `solarized-osaka`, `travels`, `void`, `vs-code-dark`, `vs-code-dark-2019`, `vs-code-light`, `vs-code-light-2019`, `vs-code-minimal`, `vs-code-seti`. No functional change to `user.js`/`userContent.css` from v0.2.0.

## v0.2.0

33 themes + hardened `user.js` + cosmetic `userContent.css`. New in v0.2.0: `retro82`, `cp437-dos`, `hackerman`, `sakura` (#ff9cae), `zenburn`, `tokyo-night-storm`, `material3-expressive`, `oceanic-next`, `gruvbox-material`, `moonlight`.

```text
./
├── user.js
├── userContent.css
├── userChrome-*.css          # catppuccin frappe/latte/macchiato/mocha
└── <theme>/userChrome.css    # 67 theme directories (see below)
````

### Tested on

* Firefox 156
* Firefox 155
* Waterfox 6.7.3
* Arch Linux

Other Firefox versions and operating systems may work, but have not yet been explicitly tested.

---

## Features

### Hardened Firefox configuration

`user.js` is an original kitsunefox configuration (not derived from Arkenfox): quiet, usable privacy with zero intended breakage.

It changes:

* telemetry, studies, experiments and crash reporting (all off)
* sponsored content on the new-tab page (off)
* link prefetching and speculative connections (off)
* remote safe-browsing download checks (off, blocklists stay on)
* fingerprinting resistance (on, without letterboxing) + cross-site referer trimming
* urlbar search suggestions and sponsored suggestions (off)
* HTTPS-only mode + stricter TLS (plain HTTP needs a per-site bypass)
* autoplay (videos wait for your click)
* Pocket, screenshots upload, shopping sidebar, translations (off)

It deliberately leaves at Firefox defaults so things keep working:

* homepage, saved logins, form autofill, history, sessions and tab restore
* WebRTC calls and screen sharing, WebGL, DRM streaming, gamepads
* push notifications, geolocation permission prompts, clipboard, disk cache

The file documents every choice, including the full "left at default" list.

### Firefox interface themes

kitsunefox includes 71 `userChrome.css` styles for Firefox's own interface (67 theme dirs + 4 Catppuccin root files).

| Theme | Vibe |
|---|---|
| `amberbyte` | warm amber |
| `arc-blueberry` | Arc blue |
| `aura` *(new, unreleased)* | midnight violet glow |
| `ayu` / `ayu-dark` / `ayu-light` / `ayu-mirage` | Ayu variants |
| `base16` / `base16-light` | Base16 |
| `bit16` *(new, unreleased)* | custom retro-1980s CGA |
| `bluedotrb` | blue dot |
| `coffee-shops` *(new in v0.3.0)* | warm coffeehouse |
| `cp437-dos` *(new in v0.2.0)* | DOS amber/CP437 terminal |
| `cyberpunk` | neon 2077 |
| `darcula` *(new in v0.3.0)* | Darcula IDE |
| `dotrb` *(new in v0.3.0)* | dot red-blue |
| `dracula` *(new in v0.3.0)* | Dracula |
| `everforest` | forest |
| `evergarden` *(new in v0.3.0)* | evergarden |
| `flexoki` / `flexoki-dark` / `flexoki-light` *(new, unreleased)* | Flexoki paper/dark/bright |
| `github-dark` | GitHub dark |
| `gruvbox` / `gruvbox-light` / `gruvbox-v2` / `gruvbox-material` *(new)* | Gruvbox variants |
| `hackerman` *(new)* | green phosphor |
| `jade-necklace` *(new in v0.3.0)* | jade green |
| `japan-night` *(new in v0.3.0)* | Japan night |
| `kanagawa` | Kanagawa wave |
| `liminal` *(new in v0.3.0)* | liminal space |
| `lucent-orng` *(new, unreleased)* | cream tangerine |
| `material3-expressive` *(new)* | M3 Expressive |
| `matrix` *(new, unreleased)* | phosphor green |
| `monokai` | Monokai |
| `moonlight` *(new)* | indigo moonlight |
| `neo-sploosh` *(new in v0.3.0)* | neon sploosh |
| `nord` | Nord |
| `oceanic-next` *(new)* | Oceanic Next |
| `onedark` | One Dark |
| `onedark-pro` *(new in v0.3.0)* | One Dark Pro |
| `orng` *(new, unreleased)* | burnt ember orange |
| `osaka-jade` | Osaka jade |
| `rainbow` *(new in v0.3.0)* | rainbow |
| `retro82` *(new)* | 80s synthwave |
| `rose-pine` | Rosé Pine |
| `sakura` *(new)* | #ff9cae soft pink |
| `shades-of-jade` *(new in v0.3.0)* | jade shades |
| `solarized` / `solarized-dark` / `solarized-light` / `solarized-osaka` *(new in v0.3.0)* | Solarized variants |
| `solitude` | solitude |
| `synthwave84` *(new, unreleased)* | outrun neon pink |
| `tokyo-night` / `tokyo-night-storm` *(new)* | Tokyo Night variants |
| `travels` *(new in v0.3.0)* | travels |
| `vantablack` | pure black |
| `void` *(new in v0.3.0)* | void black |
| `vs-code-dark` / `vs-code-dark-2019` / `vs-code-light` / `vs-code-light-2019` / `vs-code-minimal` / `vs-code-seti` *(new in v0.3.0)* | VS Code variants |
| `vercel` *(new, unreleased)* | Geist monochrome |
| `zenburn` *(new)* | low-contrast Zenburn |
| `userChrome-frappe/latte/macchiato/mocha.css` | Catppuccin |

Pick one: `cp <theme>/userChrome.css chrome/userChrome.css` (see Installation §5).

These can change Firefox UI elements such as:

* tabs
* URL bar
* navigation bar
* panels
* bookmarks bar
* sidebar
* borders
* highlights
* interface colors

### Cosmetic page cleanup

`userContent.css` hides many common webpage annoyances, including:

* advertising containers
* sponsored content
* cookie and consent banners
* newsletter popups
* floating video
* chat/support widgets
* push-notification prompts
* some anti-adblock overlays
* other common page clutter

This is **cosmetic filtering only**.

CSS can hide page elements, but it cannot prevent their network requests.

For actual request blocking, use a content blocker such as uBlock Origin.

---

# Installation

A fresh Firefox profile is recommended.

## 1. Locate your Firefox profile

Open:

```text
about:profiles
```

Find the profile you want to use and open its **Root Directory**.

## 2. Install the hardened configuration

Copy:

```text
user.js
```

into the profile root, next to Firefox's `prefs.js`.

Restart Firefox.

`user.js` is applied when Firefox starts. It also sets `toolkit.legacyUserProfileCustomizations.stylesheets = true` (new in v0.3.1), so step 3 below is now automatic on fresh profiles — still verify it in `about:config` if a theme doesn't apply.

## 3. Enable custom Firefox CSS

Open:

```text
about:config
```

Find:

```text
toolkit.legacyUserProfileCustomizations.stylesheets
```

and set it to:

```text
true
```

## 4. Create the chrome directory

Inside the Firefox profile root, create:

```text
chrome/
```

## 5. Choose a theme

Pick the kitsunefox `userChrome` stylesheet you want.

For example:

```text
userChrome-mocha.css
```

Copy it to:

```text
chrome/userChrome.css
```

Firefox expects the active interface stylesheet to be named exactly:

```text
userChrome.css
```

Restart Firefox.

## 6. Optional: install the page cleanup layer

Copy:

```text
userContent.css
```

to:

```text
chrome/userContent.css
```

Restart Firefox again.

---

## 7. Optional: Linux launcher

A small POSIX `sh` launcher is included at `launcher/kitsunefox`.

It resolves a browser command and optionally a named profile, then execs the
browser with all passed arguments preserved. It writes nothing and never
creates or mutates profiles.

* `KITSUNEFOX_BROWSER` — optional. Override the browser command (a single
  executable name or absolute path). Default: the first of `firefox`,
  `firefox-esr`, `waterfox` found in `PATH`.
* `KITSUNEFOX_PROFILE` — optional. The Firefox Profile Manager **name** of the
  profile to launch, passed through with `-P NAME`. It is the
  profile *name* (as shown in `about:profiles` / the Profile Manager) — not
  the `--name` argument, and not a filesystem path for `--profile`. The
  profile must already exist in the browser; the launcher does not create it.
  Unset: launches the browser's default/current profile.

To use it:

```text
cp launcher/kitsunefox ~/.local/bin/kitsunefox
chmod +x ~/.local/bin/kitsunefox
```

Optional desktop entry:

```text
cp launcher/kitsunefox.desktop ~/.local/share/applications/
```

Graphical desktop sessions may not include `~/.local/bin` in `PATH`. If the
desktop entry cannot find `kitsunefox`, edit its `Exec=` line to use the
launcher's absolute path, for example:

```text
Exec=/home/USER/.local/bin/kitsunefox %U
```

The desktop entry launches the browser without forcing a profile. To launch a
named profile through it, set `KITSUNEFOX_PROFILE` in the `Exec=` line:

```text
Exec=env KITSUNEFOX_PROFILE=NAME kitsunefox %U
```

Remove the entry by deleting `~/.local/share/applications/kitsunefox.desktop`.

---

## 8. Themes only (no hardening, no launcher)

If you want just the look — none of the `user.js` privacy changes and none of the graphical launcher setup — use the themes-only installer:

```text
./install-themes-only.sh --list
./install-themes-only.sh mocha
./install-themes-only.sh dracula --profile default-release --no-content
```

It copies the chosen theme to `<profile>/chrome/userChrome.css` (plus `userContent.css` unless `--no-content`) and touches nothing else: no `user.js`, no `prefs.js`, and it never launches the browser. Use `--profile NAME` for a named profile or `--profile-path PATH` for an exact directory. Afterwards, set `toolkit.legacyUserProfileCustomizations.stylesheets = true` in `about:config` and restart Firefox.

---

# Important compatibility notes

Since v0.4.0 the default `user.js` is designed for zero breakage: calls, screen sharing, WebGL, DRM streaming, password saving, history, geolocation prompts, push, gamepads and clipboard all work.

What can still differ from stock Firefox:

* plain-HTTP sites show a bypassable warning (per-site exception via the padlock)
* videos wait for your click (autoplay blocked)
* `privacy.resistFingerprinting` is on and can make some sites look or behave oddly; letterboxing stays off so pages fill the window (set it `true` in `user-overrides.js` if you prefer standard window sizes)
* some cross-site login or embed flows (referers trimmed cross-site)

Logins, sessions, tabs and browser history persist across restarts by default (since v0.3.2).

Review `user.js` before using it if compatibility is more important to you than maximum hardening.

---

# Customization

The simplest way to customize kitsunefox is to treat the repository files as a starting point.

For hardening changes, edit your local copy of:

```text
user.js
```

For interface changes, modify or replace:

```text
chrome/userChrome.css
```

For webpage cosmetic changes:

```text
chrome/userContent.css
```

Keep a backup of your changes before replacing files with a newer kitsunefox release.

---

# Removing kitsunefox

## Remove the interface theme

Delete:

```text
chrome/userChrome.css
```

and restart Firefox.

## Remove page filtering

Delete:

```text
chrome/userContent.css
```

and restart Firefox.

## Stop applying the hardened configuration

Remove:

```text
user.js
```

from the Firefox profile root.

Restart Firefox.

Some preferences previously written by `user.js` may remain stored in the profile.

For a completely clean state, creating a new Firefox profile is the simplest option.

---

# Troubleshooting: theme doesn't apply

Symptom: stock-looking UI despite copying a theme (like the v0.3.0 Firefox 156 screenshot).

1. `about:config` → `toolkit.legacyUserProfileCustomizations.stylesheets` must be `true` (v0.3.1 `user.js` sets this; older copies need a restart after flipping it).
2. The file must be named exactly `chrome/userChrome.css` (lowercase `chrome/`, capital `C` in `userChrome.css`) inside the profile's **Root Directory** from `about:profiles` — not the Local Directory, not `userChrome-mocha.css`.
3. Restart Firefox after both steps. Keep `user.js` in the profile root (next to `prefs.js`), not inside `chrome/`.

Note: `userChrome.css` only themes Firefox's own interface, never web pages — Discord/websites keep their own look. Gray gutters around page content were RFP letterboxing (off by default since v0.3.1).

---

# Known limitations

* `userChrome.css` relies on Firefox's legacy browser UI customization support and may require maintenance after Firefox UI changes.
* `userContent.css` performs cosmetic hiding rather than network-level blocking.
* `user.js` can set prefs but never unset them: upgrading from v0.3.x keeps some dropped v0.3.x values (WebGL/WebRTC/DRM/push off etc.) until you reset them in `about:config` or use a fresh profile — see the `user.js` header.
* v0.4.0 rewrites `user.js` as an original usable-privacy config and adds `install-themes-only.sh`; no theme changes (tested on Firefox 156, Arch).

No other known bugs are currently documented.

---

# Credits

The kitsunefox `user.js` is an original configuration written for this project: usable privacy with zero intended breakage, kept as a deliberate alternative to maximum-hardening configurations such as the [arkenfox user.js](https://github.com/arkenfox/user.js) project.

---

# License

MIT.

See [`LICENSE`](LICENSE).

---

**kitsunefox**

Harden Firefox underneath.
Make it yours on top. 🦊
