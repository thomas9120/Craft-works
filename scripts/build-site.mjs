// Builds the GitHub Pages site: the catalog page as index.html, plus
// catalog.json holding the latest release of every app in its SUITE.
//
//   node scripts/build-site.mjs [page] [outDir]
//
// GITHUB_TOKEN (optional) lifts the API limit from 60 to 1,000+ requests an hour.
// PAGES_URL (optional) is the live site; apps that can't be checked this run keep
// the copy from its current catalog.json instead of disappearing.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const page = process.argv[2] || "craft-works.html";
const outDir = process.argv[3] || "_site";

const html = await readFile(page, "utf8");
const ids = [...html.matchAll(/\{"id":"([a-z0-9-]+)"/g)].map(m => m[1]);
if (!ids.length) throw new Error("no apps found in " + page);

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "craftworks-catalog"
};
if (process.env.GITHUB_TOKEN) headers.Authorization = "Bearer " + process.env.GITHUB_TOKEN;

// the page is stricter about what counts; this only skips releases still uploading
const PORTABLE = /-portable\.zip$|\.dmg$|\.AppImage$|\.tar\.gz$/;

async function publishedCatalog() {
  if (!process.env.PAGES_URL) return {};
  try {
    const res = await fetch(new URL("catalog.json", process.env.PAGES_URL.replace(/\/?$/, "/")));
    if (!res.ok) return {};
    const json = await res.json();
    return Object.fromEntries((json.apps || []).map(a => [a.id, a]));
  } catch {
    return {};
  }
}

const previous = await publishedCatalog();
const now = new Date().toISOString();
const apps = [];
let checked = 0;

for (const id of ids) {
  try {
    const res = await fetch(`https://api.github.com/repos/storytold/${id}/releases/latest`, { headers });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const rel = await res.json();
    const assets = (rel.assets || []).map(a => [a.name, a.size]);
    if (!assets.some(([name]) => PORTABLE.test(name))) throw new Error(rel.tag_name + " has no portable files yet");
    apps.push({ id, tag: rel.tag_name, published: rel.published_at, assets, checkedAt: now });
    checked++;
    console.log(`${id.padEnd(12)} ${rel.tag_name}`);
  } catch (err) {
    const kept = previous[id] ? " (keeping the published copy)" : "";
    console.log(`::warning::${id}: ${err.message}${kept}`);
    if (previous[id]) apps.push(previous[id]);
  }
}

if (!checked) {
  console.log("::error::No release could be checked; leaving the current deployment alone.");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, "index.html"), html);
await writeFile(join(outDir, "catalog.json"), JSON.stringify({ generatedAt: now, apps }) + "\n");
await writeFile(join(outDir, ".nojekyll"), "");
console.log(`catalog.json: ${checked} of ${ids.length} checked`);
