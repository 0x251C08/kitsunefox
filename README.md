# kitsunefox 🦊

A hardened + themed Firefox configuration focused on privacy, reduced browser noise, and a customizable Firefox interface.

`kitsunefox` combines:

- a hardened `user.js`
- multiple Firefox `userChrome.css` themes
- a cosmetic `userContent.css` cleanup layer

It is **not** a Firefox fork and **not** a browser extension.

## v0.1.0

The first public release establishes the basic kitsunefox layout:

```text
kitsunefox/
├── user.js
├── userContent.css
├── userChrome-*.css
└── theme directories/
````

### Tested on

* Firefox 155
* Waterfox 6.7.3
* Arch Linux

Other Firefox versions and operating systems may work, but have not yet been explicitly tested.

---

## Features

### Hardened Firefox configuration

`user.js` applies a stricter privacy-oriented Firefox configuration inspired by the Arkenfox project.

Current hardening includes changes around:

* telemetry and Firefox studies
* sponsored content
* speculative networking and prefetching
* browser history and shutdown cleanup
* fingerprinting resistance
* WebRTC and media APIs
* WebGL
* HTTPS-only behavior
* password and form storage
* URL-bar suggestions
* geolocation
* push notifications
* DRM
* autoplay

The file is commented so the purpose and expected breakage of stricter settings can be reviewed directly.

### Firefox interface themes

kitsunefox includes multiple `userChrome.css` styles for Firefox's own interface.

Themes and palettes currently include variants based around:

* Catppuccin
* Gruvbox
* Nord
* Tokyo Night
* Kanagawa
* Everforest
* One Dark
* Rose Pine
* Ayu
* Cyberpunk
* GitHub Dark
* Base16

and additional styles included in the repository.

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
kitsunefox/user.js
```

into the profile root, next to Firefox's `prefs.js`.

Restart Firefox.

`user.js` is applied when Firefox starts.

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
kitsunefox/userChrome-mocha.css
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
kitsunefox/userContent.css
```

to:

```text
chrome/userContent.css
```

Restart Firefox again.

---

# Important compatibility notes

kitsunefox intentionally uses some aggressive privacy settings.

Depending on your needs, the default `user.js` can break or disable functionality including:

* WebRTC calls and browser screen sharing
* WebGL-based sites and 3D applications
* DRM services such as some streaming platforms
* browser password saving
* browser autofill
* browser history
* web push notifications
* gamepad APIs
* geolocation
* autoplay
* some cross-site login or embed flows

`privacy.resistFingerprinting` and letterboxing are also enabled.

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

# Known limitations

* `userChrome.css` relies on Firefox's legacy browser UI customization support and may require maintenance after Firefox UI changes.
* `userContent.css` performs cosmetic hiding rather than network-level blocking.
* Strict `user.js` settings intentionally reduce compatibility with some sites and browser features.
* v0.1.0 has currently been explicitly tested on Firefox 155 and Waterfox 6.7.3 under Arch Linux.

No other known bugs are currently documented.

---

# Credits

The kitsunefox privacy configuration is inspired by the excellent [arkenfox user.js](https://github.com/arkenfox/user.js) project.

The current `user.js` documents preferences checked against Arkenfox v144 while marking kitsunefox-specific stricter or additional settings separately.

---

# License

MIT.

See [`LICENSE`](LICENSE).

---

**kitsunefox**

Harden Firefox underneath.
Make it yours on top. 🦊
