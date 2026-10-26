# Craft Apps — Inventory

All apps from the [@storytold](https://github.com/storytold) GitHub org whose name ends in "craft" and which
ship as an installable end-user application. Scraped from the GitHub API on **2026-10-26**.

Source of truth for "the suite" is `craft-launcher/crates/core/src/catalog.rs`, which defines
`SUITE: [CraftApp; 13]` — the thirteen apps the official launcher knows about. ArtCraft, ArtCraft-X
and AniCraft are craft-named apps but are *not* in that 13-app suite.

---

## 1. The Craft App Suite (13 apps)

All 13 ship full release matrices and are installable today. All are Apache-2.0, pure Rust.

| # | id | Name | What it is | Repo | Latest |
|---|----|------|-----------|------|--------|
| 1 | `photocraft` | PhotoCraft | Image editing (Photoshop-style) | [storytold/photocraft](https://github.com/storytold/photocraft) | v0.16.0 |
| 2 | `vectorcraft` | VectorCraft | Vector illustration (Illustrator-style) | [storytold/vectorcraft](https://github.com/storytold/vectorcraft) | v0.17.0 |
| 3 | `filmcraft` | FilmCraft | Video editing, color and sound (Premiere-style) | [storytold/filmcraft](https://github.com/storytold/filmcraft) | v0.13.0 |
| 4 | `lightcraft` | LightCraft | Photo library and raw development (Lightroom-style) | [storytold/lightcraft](https://github.com/storytold/lightcraft) | v0.14.0 |
| 5 | `pdfcraft` | PdfCraft | Reading, organizing and protecting PDFs (Acrobat-style) | [storytold/pdfcraft](https://github.com/storytold/pdfcraft) | v0.14.0 |
| 6 | `effectcraft` | EffectCraft | Motion graphics and visual effects (After Effects-style) | [storytold/effectcraft](https://github.com/storytold/effectcraft) | v0.17.0 |
| 7 | `designcraft` | DesignCraft | Page layout and publishing (InDesign-style) | [storytold/designcraft](https://github.com/storytold/designcraft) | v0.13.0 |
| 8 | `figcraft` | FigCraft | Interface design and prototyping (Figma-style) | [storytold/figcraft](https://github.com/storytold/figcraft) | v0.11.2 |
| 9 | `wordcraft` | WordCraft | Writing and document design (Word-style) | [storytold/wordcraft](https://github.com/storytold/wordcraft) | v0.11.0 |
| 10 | `soundcraft` | SoundCraft | Recording, editing and mixing audio (Pro Tools-style) | [storytold/soundcraft](https://github.com/storytold/soundcraft) | v0.13.1 |
| 11 | `deckcraft` | DeckCraft | Presentations and slide shows (PowerPoint-style) | [storytold/deckcraft](https://github.com/storytold/deckcraft) | v0.11.1 |
| 12 | `cadcraft` | CADCraft | Computer-aided design and drafting (AutoCAD-style) | [storytold/cadcraft](https://github.com/storytold/cadcraft) | v0.13.0 |
| 13 | `gridcraft` | GridCraft | Spreadsheets and data (Excel-style) | [storytold/gridcraft](https://github.com/storytold/gridcraft) | v0.12.1 |

Website page per app: `https://getartcraft.com/apps/<id>`

---

## 2. Other craft apps (outside the 13-app suite)

| Name | Repo | Latest | Status |
|------|------|--------|--------|
| ArtCraft | [storytold/artcraft](https://github.com/storytold/artcraft) | artcraft-v0.41.0 | Flagship "intentional crafting engine". Ships Windows/macOS only (`.exe`, `.msi`, `.dmg`, `.app.tar.gz`). |
| ArtCraft-X | [storytold/artcraftx](https://github.com/storytold/artcraftx) | none | AI image/video/audio/3D creation desktop app. README: "Builds are Forthcoming". |
| AniCraft | [storytold/AniCraft](https://github.com/storytold/AniCraft) | none | 2D animation editor. No releases yet. |

`artcraft-services` (backend/web frontend for ArtCraft), `crafthub`, `craft-launcher`,
`craft-repo-status-app`, `craft-contrib`, `craft-libs`, `craft-fonts`, `craft-i18n`,
`craft-ai-integrations`, `craft-common-actions`, `craft-launcher-assets` are **not** end-user
apps and are excluded (but see §5 — the launcher's catalog is the reference we should copy).

---

## 3. Release asset matrix (per suite app)

Roughly 28 assets per release. Same pattern for all 13:

**Windows**
- `<id>-<ver>-windows-x64.msi`
- `<id>-<ver>-windows-x86.msi`
- `<id>-<ver>-windows-arm64.msi`
- `<id>-<ver>-windows-x64-portable.zip`
- `<id>-<ver>-windows-x86-portable.zip`
- `<id>-<ver>-windows-arm64-portable.zip`

**macOS**
- `<id>-<ver>-macos-universal.dmg` (universal binary)
- (ArtCraft only: `ArtCraft_<ver>_universal.app.tar.gz` — updater bundle)

**Linux** — for each of `x86_64`, `aarch64`, plus `riscv64` (deb/rpm/tar.gz only):
- `<id>-<ver>-linux-x86_64.AppImage` (+ `.zsync`)
- `<id>-<ver>-linux-x86_64.deb`
- `<id>-<ver>-linux-x86_64.rpm`
- `<id>-<ver>-linux-x86_64.flatpak`
- `<id>-<ver>-linux-x86_64.pkg.tar.zst` (Arch)
- `<id>-<ver>-linux-x86_64.tar.gz`

**FreeBSD**
- `<id>-<ver>-freebsd-x86_64.tar.gz`

**Extras (per app, where available)**
- `SHA256SUMS.txt` — not present on all releases (ArtCraft, DeckCraft, DesignCraft,
  EffectCraft, FigCraft, FilmCraft, GridCraft, LightCraft, PdfCraft releases lacked it;
  PhotoCraft, SoundCraft, VectorCraft, WordCraft, CADCraft have it)
- `<id>-cli-<ver>-macos-universal.zip`
- `<id>-web-<ver>.zip`

### Naming / identity conventions (important for install & uninstall)

- Bundle / desktop / Flatpak id: `ai.storyteller.<id>`
- Asset stem and binary and package name: `<id>` (all lowercase)
- **Former ids:** `pdfcraft` shipped as `printcraft` / "PrintCraft" until v0.2.1. Uninstall must
  also look for `PrintCraft` registrations and `printcraft-*` assets.
- Tag format differs: suite apps use `v<semver>`; ArtCraft uses `artcraft-v<semver>`.
- Every suite release is marked non-prerelease.

---

## 4. Platform support summary

| Platform | Coverage |
|----------|----------|
| Windows x64 / x86 / arm64 | MSI + portable zip (all 13) |
| macOS universal | DMG (all 13) |
| Linux x86_64 / aarch64 | AppImage, deb, rpm, flatpak, pacman pkg, tar.gz |
| Linux riscv64 | deb, rpm, tar.gz |
| FreeBSD x86_64 | tar.gz |
| Web (wasm) | separate `-web` asset, not a normal install |

---

## 5. v1 scope (decided)

`index.html` — a browser-only catalog, no install/uninstall. It covers **only the 13 suite apps**
(ArtCraft, ArtCraft-X and AniCraft are deferred until they have portable builds) and **only portable
artifacts**: Windows portable zips, macOS DMG, Linux AppImage + tar.gz, FreeBSD tar.gz. Installers
(`.msi`, `.deb`, `.rpm`, `.flatpak`, `.pkg.tar.zst`) and the `-cli` / `-server` side builds are filtered
out of the UI by `parseAsset()`. Data is a bundled snapshot, refreshed live from the GitHub Releases
API in the browser.

## 6. Notes for the install/uninstall manager

- **Reuse the catalog shape** from `craft-launcher/crates/core/src/catalog.rs`:
  `id`, `name`, `tagline`, brand colors (`color`, `ink_light`, `ink_dark`), `repo`,
  `former_ids`, `former_names`. Brand colors make the manager's UI consistent with the site.
- **Version source:** GitHub Releases API only (`/repos/storytold/<id>/releases`). No other
  distribution channel found (no Homebrew cask, winget manifest, AUR or Flathub listing was
  referenced by the repos).
- **Uninstall needs install-method awareness** — MSI needs `msiexec /x`, AppImage is a stray
  file + `.desktop` entry, deb/rpm/flatpak/pacman need the native package manager, portable
  zips and DMGs need app-bundle + `~/Library` / `%APPDATA%` cleanup.
- **Checksums** are only available on some releases, so verify-with-SHA256 must degrade
  gracefully.
- Deferred: ArtCraft / ArtCraft-X / AniCraft, pending upstream portable builds.
