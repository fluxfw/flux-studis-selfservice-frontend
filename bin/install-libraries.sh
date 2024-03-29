#!/usr/bin/env sh

set -e

bin="`dirname "$0"`"
root="$bin/.."
libs="$root/.."

checkAlreadyInstalled() {
    if [ `ls "$libs" | wc -l` != "1" ]; then
        echo "Already installed" >&2
        exit 1
    fi
}

installLibrary() {
    (mkdir -p "$libs/$1" && cd "$libs/$1" && wget -O - "$2" | tar -xz --strip-components=1)
}

checkAlreadyInstalled

installLibrary flux-button-group https://github.com/fluxfw/flux-button-group/archive/refs/tags/v2023-07-27-1.tar.gz

installLibrary flux-color-scheme https://github.com/fluxfw/flux-color-scheme/archive/refs/tags/v2023-07-27-1.tar.gz

installLibrary flux-form https://github.com/fluxfw/flux-form/archive/refs/tags/v2023-07-27-1.tar.gz

installLibrary flux-http-api https://github.com/fluxfw/flux-http-api/archive/refs/tags/v2023-06-19-1.tar.gz

installLibrary flux-loading-spinner https://github.com/fluxfw/flux-loading-spinner/archive/refs/tags/v2023-07-27-1.tar.gz

installLibrary flux-localization-api https://github.com/fluxfw/flux-localization-api/archive/refs/tags/v2023-07-27-1.tar.gz

installLibrary flux-overlay https://github.com/fluxfw/flux-overlay/archive/refs/tags/v2023-07-27-2.tar.gz

installLibrary flux-pwa-api https://github.com/fluxfw/flux-pwa-api/archive/refs/tags/v2023-07-27-1.tar.gz

installLibrary flux-pwa-generator https://github.com/fluxfw/flux-pwa-generator/archive/refs/tags/v2023-07-27-1.tar.gz

installLibrary flux-settings-storage https://github.com/fluxfw/flux-settings-storage/archive/refs/tags/v2023-07-18-1.tar.gz

installLibrary flux-shutdown-handler https://github.com/fluxfw/flux-shutdown-handler/archive/refs/tags/v2023-03-16-1.tar.gz

installLibrary flux-style-sheet-manager https://github.com/fluxfw/flux-style-sheet-manager/archive/refs/tags/v2023-07-27-1.tar.gz
