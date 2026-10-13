#!/usr/bin/env node
/**
 * Build-time image optimization.
 *
 * Scans public/images/ for raster files (jpg/jpeg/png) above SIZE_THRESHOLD,
 * generates WebP versions (quality 75, max 1920px wide) under
 * public/optimized/, and writes a manifest to src/lib/image-manifest.json
 * consumed by the <Media>/<Lightbox> components (via <picture>).
 *
 * Design notes:
 * - public/optimized/ is fully gitignored and regenerated on every
 *   dev/build run — user-provided images under public/images/ are never
 *   ignored, so dropping real photos into the repo "just works".
 * - Incremental: files whose WebP is up to date (mtime) are skipped, so
 *   `predev` runs in milliseconds after the first run.
 * - Orphaned WebP files (source removed) are deleted.
 *
 * The static export serves images unoptimized (next/image loader is off),
 * so this script is the site's image optimization pipeline.
 * See docs/adr/0011-image-pipeline.md.
 */

import { readdir, stat, writeFile, unlink, mkdir } from "node:fs/promises";
import { join, relative, resolve, dirname, extname } from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = resolve(import.meta.dirname, "../public");
const IMAGES_DIR = join(PUBLIC_DIR, "images");
const OPTIMIZED_DIR = join(PUBLIC_DIR, "optimized");
const MANIFEST_PATH = resolve(import.meta.dirname, "../src/lib/image-manifest.json");

const RASTER_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const SIZE_THRESHOLD_BYTES = 100 * 1024; // skip small files (< 100 KB)
const WEBP_QUALITY = 75;
const MAX_WIDTH = 1920;

/** Recursively list files under a directory. */
async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function isUpToDate(sourcePath, targetPath) {
  try {
    const [source, target] = await Promise.all([stat(sourcePath), stat(targetPath)]);
    return target.mtimeMs >= source.mtimeMs;
  } catch {
    return false;
  }
}

/** Web path for a public file, e.g. public/images/a.jpg -> /images/a.jpg */
function webPath(publicPath) {
  return `/${relative(PUBLIC_DIR, publicPath).split("\\").join("/")}`;
}

async function main() {
  const started = Date.now();

  const allFiles = await listFiles(IMAGES_DIR);
  const candidates = [];
  for (const file of allFiles) {
    const ext = extname(file).toLowerCase();
    if (!RASTER_EXTENSIONS.has(ext)) {
      continue;
    }
    const info = await stat(file);
    if (info.size >= SIZE_THRESHOLD_BYTES) {
      candidates.push({ file, ext, size: info.size });
    }
  }

  const manifest = {};
  let generated = 0;
  let skipped = 0;

  for (const { file, ext } of candidates) {
    // Original: /images/projects/lazienka.jpg -> WebP: /optimized/images/projects/lazienka.webp
    const relativePath = relative(IMAGES_DIR, file).split("\\").join("/");
    const webpRelativePath = relativePath.replace(new RegExp(`\\${ext}$`), ".webp");
    const targetWebPath = `/optimized/images/${webpRelativePath}`;
    const targetFile = join(PUBLIC_DIR, targetWebPath.slice(1));

    if (await isUpToDate(file, targetFile)) {
      skipped += 1;
    } else {
      await mkdir(dirname(targetFile), { recursive: true });
      // .rotate() bakes EXIF orientation into the pixels — important for
      // phone photos, which Next.js would otherwise display unrotated
      // (no transformation happens with images.unoptimized).
      await sharp(file)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(targetFile);
      generated += 1;
    }

    const meta = await sharp(targetFile).metadata();
    manifest[webPath(file)] = {
      webp: targetWebPath,
      width: meta.width,
      height: meta.height,
    };
  }

  // Remove orphaned WebP files whose source no longer exists.
  let removed = 0;
  try {
    const existing = await listFiles(OPTIMIZED_DIR);
    const validTargets = new Set(
      Object.values(manifest).map((entry) => join(PUBLIC_DIR, entry.webp.slice(1))),
    );
    for (const file of existing) {
      if (!validTargets.has(file)) {
        await unlink(file);
        removed += 1;
      }
    }
  } catch {
    // optimized dir does not exist yet — nothing to clean.
  }

  // Sort keys for stable diffs.
  const sortedManifest = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );

  await writeFile(
    MANIFEST_PATH,
    `${JSON.stringify(sortedManifest, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `✓ Images: ${generated} generated, ${skipped} up to date, ${removed} orphans removed (${Date.now() - started}ms)`,
  );
}

main().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exit(1);
});
