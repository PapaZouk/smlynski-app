#!/usr/bin/env node
/**
 * Build-time asset verification.
 *
 * Scans the content modules (src/content/*.ts) for image references and
 * verifies each referenced file exists under public/. Missing assets fail
 * the build early instead of silently rendering placeholders in production.
 *
 * Placeholders (empty arrays / null) are allowed by design — see
 * docs/adr/0005-media-placeholders.md.
 */

import { readdirSync } from "node:fs";
import { access, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const CONTENT_DIR = resolve(import.meta.dirname, "../src/content");
const PUBLIC_DIR = resolve(import.meta.dirname, "../public");

/** Remove comments so doc examples are not treated as real references. */
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

/** Extract "/images/..." string literals from a TS content file. */
function extractImagePaths(source) {
  return [...source.matchAll(/"(\/images\/[^"]+)"/g)].map((match) => match[1]);
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const contentFiles = readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".ts"));

  const references = new Map(); // image path -> [files referencing it]

  for (const file of contentFiles) {
    const raw = await readFile(join(CONTENT_DIR, file), "utf8");
    const source = stripComments(raw);
    for (const imagePath of extractImagePaths(source)) {
      const refs = references.get(imagePath) ?? [];
      refs.push(file);
      references.set(imagePath, refs);
    }
  }

  const missing = [];
  for (const [imagePath, refs] of references) {
    const fsPath = join(PUBLIC_DIR, decodeURIComponent(imagePath));
    if (!(await fileExists(fsPath))) {
      missing.push({ imagePath, refs });
    }
  }

  if (missing.length > 0) {
    console.error("✖ Missing image assets referenced from content modules:\n");
    for (const { imagePath, refs } of missing) {
      console.error(`  ${imagePath}`);
      console.error(`    referenced from: ${refs.join(", ")}`);
    }
    console.error(
      "\nAdd the files under public/ or remove the references (empty = placeholder).",
    );
    process.exit(1);
  }

  console.log(`✓ All ${references.size} referenced image assets exist under public/`);
}

main().catch((error) => {
  console.error("Asset check failed:", error);
  process.exit(1);
});
