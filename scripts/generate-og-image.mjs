#!/usr/bin/env node
/**
 * Generates the site-level social/brand images from public/images/logo-white.png:
 *
 *  - public/og-default.jpg      1200×630 — default og:image / twitter card
 *  - public/apple-touch-icon.png 180×180 — iOS home-screen icon + JSON-LD logo
 *
 * Design notes:
 * - Both outputs are gitignored and regenerated on every dev/build run,
 *   the same convention as scripts/optimize-images.mjs (ADR 0011).
 * - The card uses the design tokens from src/styles/globals.css (ADR 0008):
 *   warm near-black "ink" background, goldenrod accent, paper text.
 * - SVG is rasterized by sharp (librsvg) — fonts fall back to whatever the
 *   platform provides (Arial/Liberation Sans), which covers Polish diacritics.
 *
 * See docs/adr/0017-seo-canonicals.md for why these assets exist.
 */

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = resolve(import.meta.dirname, "../public");
const LOGO_PATH = resolve(PUBLIC_DIR, "images/logo-white.png");
const OG_PATH = resolve(PUBLIC_DIR, "og-default.jpg");
const ICON_PATH = resolve(PUBLIC_DIR, "apple-touch-icon.png");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const ICON_SIZE = 180;

// Design tokens (src/styles/globals.css).
const INK_950 = "#12100e";
const GOLD_500 = "#d4982a";
const GOLD_400 = "#dfb042";
const PAPER = "#f7f5f1";
const INK_400 = "#a89f94";

const FONT = 'font-family="Arial, Helvetica, sans-serif"';

async function main() {
  const logoData = `data:image/png;base64,${(await readFile(LOGO_PATH)).toString("base64")}`;

  // --- Default social card (1200×630) -------------------------------------
  const logoWidth = 330;
  const logoHeight = Math.round((logoWidth * 300) / 625); // keep 625:300 ratio
  const cardSvg = `
<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${INK_950}"/>
  <rect width="${OG_WIDTH}" height="8" fill="${GOLD_500}"/>
  <image href="${logoData}" xlink:href="${logoData}" x="80" y="72" width="${logoWidth}" height="${logoHeight}"/>
  <text x="80" y="340" ${FONT} font-size="64" font-weight="bold" fill="${PAPER}">Sebastian Młyński</text>
  <text x="80" y="410" ${FONT} font-size="40" font-weight="bold" fill="${GOLD_400}">Usługi Remontowo-Budowlane</text>
  <rect x="80" y="456" width="160" height="4" fill="${GOLD_500}"/>
  <text x="80" y="530" ${FONT} font-size="27" fill="${INK_400}">Gdańsk · Gdynia · Sopot · Rumia · Wejherowo</text>
</svg>`;

  await sharp(Buffer.from(cardSvg))
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(OG_PATH);

  // --- Apple touch icon (180×180) -----------------------------------------
  const iconLogoWidth = 120;
  const iconLogoHeight = Math.round((iconLogoWidth * 300) / 625);
  const iconSvg = `
<svg width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 ${ICON_SIZE} ${ICON_SIZE}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="${ICON_SIZE}" height="${ICON_SIZE}" fill="${INK_950}"/>
  <rect width="${ICON_SIZE}" height="6" fill="${GOLD_500}"/>
  <image href="${logoData}" xlink:href="${logoData}"
    x="${(ICON_SIZE - iconLogoWidth) / 2}" y="${ICON_HEIGHT_OFFSET(iconLogoHeight)}"
    width="${iconLogoWidth}" height="${iconLogoHeight}"/>
</svg>`;

  await sharp(Buffer.from(iconSvg)).png().toFile(ICON_PATH);

  console.log("✓ og-default.jpg + apple-touch-icon.png generated");
}

/** Vertically center the logo, nudged below the gold accent bar. */
function ICON_HEIGHT_OFFSET(height) {
  return Math.round((ICON_SIZE - height) / 2) + 3;
}

main().catch((error) => {
  console.error("OG image generation failed:", error);
  process.exit(1);
});
