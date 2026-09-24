#!/bin/sh
# kitsunefox — install ONLY a theme. No user.js, no hardening, no browser
# setup. This script copies CSS files and nothing else.
#
# Contrast with launcher/ (the graphical setup): that installs a desktop
# entry + wrapper that STARTS the browser. This script never launches
# anything — it only drops theme files into your Firefox profile's
# chrome/ folder.
#
# Usage:
#   ./install-themes-only.sh --list
#   ./install-themes-only.sh <theme> [--profile NAME] [--profile-path PATH]
#                            [--no-content]
#
# Examples:
#   ./install-themes-only.sh --list
#   ./install-themes-only.sh mocha
#   ./install-themes-only.sh dracula --profile default-release --no-content
#
# After installing: open about:config, set
#   toolkit.legacyUserProfileCustomizations.stylesheets = true,
# then restart Firefox. (The full kitsunefox user.js sets this for you;
# this script deliberately does not touch prefs.)

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROFILE_NAME=""
PROFILE_PATH=""
WITH_CONTENT=1

usage() {
    sed -n '2,/^#$/p' "$0" | sed 's/^# \{0,1\}//'
    echo "Available themes:"
    list_themes
}

list_themes() {
    for d in "$SCRIPT_DIR"/*/; do
        [ -f "$d/userChrome.css" ] && echo "  $(basename "$d")"
    done
    echo "  frappe / latte / macchiato / mocha  (catppuccin root files)"
}

err() { echo "install-themes-only: $*" >&2; exit 1; }

THEME=""
while [ $# -gt 0 ]; do
    case "$1" in
        -h|--help) usage; exit 0 ;;
        --list) list_themes; exit 0 ;;
        --profile) PROFILE_NAME="${2:?--profile needs a name}"; shift 2 ;;
        --profile-path) PROFILE_PATH="${2:?--profile-path needs a path}"; shift 2 ;;
        --no-content) WITH_CONTENT=0; shift ;;
        -*) err "unknown option: $1 (see --help)" ;;
        *) [ -z "$THEME" ] || err "only one theme at a time"; THEME="$1"; shift ;;
    esac
done
[ -n "$THEME" ] || { usage >&2; exit 1; }

# Resolve the theme source file.
case "$THEME" in
    frappe|latte|macchiato|mocha)
        SRC="$SCRIPT_DIR/userChrome-$THEME.css" ;;
    *) SRC="$SCRIPT_DIR/$THEME/userChrome.css" ;;
esac
[ -f "$SRC" ] || err "unknown theme '$THEME' (see --list)"

# Resolve the Firefox profile directory.
if [ -z "$PROFILE_PATH" ]; then
    INI=""
    for base in "$HOME/.mozilla/firefox" "$HOME/.config/mozilla/firefox"; do
        if [ -f "$base/profiles.ini" ]; then INI="$base/profiles.ini"; BASE="$base"; break; fi
    done
    [ -n "${INI:-}" ] || err "no Firefox profiles.ini found (tried ~/.mozilla/firefox and ~/.config/mozilla/firefox)"
    if [ -n "$PROFILE_NAME" ]; then
        # Print the Path= of the section whose Name= matches.
        PROFILE_PATH=$(awk -v name="$PROFILE_NAME" '
            /^\[/ { sect=$0 } $1=="Name=" && $2==name { want=sect }
            sect==want && $1=="Path=" { sub(/^Path=/,""); print; exit }' \
            FS='=' "$INI")
        [ -n "${PROFILE_PATH:-}" ] || err "no profile named '$PROFILE_NAME' in $INI"
    else
        # Prefer Default=1, else the first Install Default=, else the first Path=.
        PROFILE_PATH=$(awk -F= '
            /^\[Profile/ { p=1; path=""; def=0 }
            /^\[/ && !/^\[Profile/ { p=0 }
            p && $1=="Path" { path=$2 }
            p && $1=="Default" && $2=="1" { print path; exit }
            p && $1=="Path" && !seen++ { first=path }
            END { if (!done) print first }' "$INI")
        [ -n "${PROFILE_PATH:-}" ] || err "could not pick a profile from $INI (use --profile)"
    fi
    case "$PROFILE_PATH" in
        /*) ;; # absolute already
        *) PROFILE_PATH="$BASE/$PROFILE_PATH" ;;
    esac
fi
[ -d "$PROFILE_PATH" ] || err "profile directory not found: $PROFILE_PATH"

# Install.
mkdir -p "$PROFILE_PATH/chrome"
cp -- "$SRC" "$PROFILE_PATH/chrome/userChrome.css"
echo "installed '$THEME' -> $PROFILE_PATH/chrome/userChrome.css"
if [ "$WITH_CONTENT" -eq 1 ]; then
    cp -- "$SCRIPT_DIR/userContent.css" "$PROFILE_PATH/chrome/userContent.css"
    echo "installed page cleanup -> $PROFILE_PATH/chrome/userContent.css"
fi

# Warn if Firefox will ignore the files.
if ! grep -q 'toolkit.legacyUserProfileCustomizations.stylesheets", true' \
        "$PROFILE_PATH/prefs.js" 2>/dev/null; then
    cat <<EOF
NOTE: Firefox will ignore these files until you enable custom CSS:
  1. open about:config
  2. set toolkit.legacyUserProfileCustomizations.stylesheets = true
  3. restart Firefox
EOF
else
    echo "custom stylesheets already enabled in this profile; restart Firefox to apply."
fi
