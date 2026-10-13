#!/usr/bin/env node
/**
 * Build-time content validation (supersedes the old check-assets.mjs).
 *
 * Imports the real content modules (src/content/*.ts — type-only imports,
 * so Node's native TS type-stripping resolves them without a loader) and
 * verifies invariants the TypeScript compiler cannot express:
 *
 *  - slugs are unique and kebab-case (they become URL paths)
 *  - completedAt is a real ISO date (YYYY-MM-DD), not in the future
 *  - required string fields are non-empty (accidental "" fails the build,
 *    not production with blank sections)
 *  - details arrays have at least one non-blank entry
 *  - image paths are unique and use the /images/ convention
 *  - feedback ids are unique
 *  - site config: https siteUrl without trailing slash, unique nav hrefs,
 *    plausible phone/email
 *  - every referenced image file exists under public/ (former asset check)
 *
 * Placeholders (empty image arrays / null image) remain valid by design —
 * see docs/adr/0005-media-placeholders.md.
 *
 * Fails the build early with a full report of every problem found, so a
 * half-copied entry is caught on one run instead of page by page.
 */

import { access } from "node:fs/promises";
import { join, resolve } from "node:path";

const CONTENT_DIR = resolve(import.meta.dirname, "../src/content");
const PUBLIC_DIR = resolve(import.meta.dirname, "../public");

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

const errors = [];
const fail = (message) => errors.push(message);

/** True when the string is present and has non-whitespace content. */
const nonBlank = (value) => typeof value === "string" && value.trim().length > 0;

/** Import content modules; friendly error if Node is too old for TS. */
async function loadContent() {
  try {
    const [{ projects }, { offers }, { feedbacks }, { siteConfig }] = await Promise.all(
      [
        import(join(CONTENT_DIR, "projects.ts")),
        import(join(CONTENT_DIR, "offers.ts")),
        import(join(CONTENT_DIR, "feedbacks.ts")),
        import(join(CONTENT_DIR, "site.ts")),
      ],
    );
    return { projects, offers, feedbacks, siteConfig };
  } catch (error) {
    if (error?.code === "ERR_UNKNOWN_FILE_EXTENSION") {
      console.error(
        "✖ This script reads the TS content modules with Node's built-in type stripping,\n" +
          "  which requires Node >= 22.18. Update Node (see .nvmrc) and retry.",
      );
      process.exit(1);
    }
    throw error;
  }
}

/** Slugs: kebab-case, unique, bounded length (URL sanity). */
function checkSlugs(entries, kind) {
  const seen = new Map();
  for (const [index, entry] of entries.entries()) {
    const label = `${kind}[${index}]`;
    if (!nonBlank(entry.slug)) {
      fail(`${label}: missing "slug"`);
      continue;
    }
    if (!KEBAB_CASE.test(entry.slug)) {
      fail(
        `${label} ("${entry.slug}"): slug must be kebab-case (a-z, 0-9, hyphens) — it becomes a URL path`,
      );
    }
    if (entry.slug.length > 80) {
      fail(`${label} ("${entry.slug}"): slug longer than 80 characters`);
    }
    if (seen.has(entry.slug)) {
      fail(
        `${label}: duplicate slug "${entry.slug}" (already used by ${kind}[${seen.get(entry.slug)}]) — URLs would collide`,
      );
    } else {
      seen.set(entry.slug, index);
    }
  }
}

/** details: at least one non-blank entry, every entry a non-blank string. */
function checkDetails(entry, label, details) {
  if (!Array.isArray(details) || details.length === 0) {
    fail(`${label} ("${entry.slug}"): "details" must have at least one entry`);
    return;
  }
  for (const [i, text] of details.entries()) {
    if (!nonBlank(text)) {
      fail(`${label} ("${entry.slug}"): details[${i}] is empty`);
    }
  }
}

/** Image paths: /images/ prefix, unique within the entry. */
function checkImagePaths(entry, label, images) {
  const seen = new Set();
  for (const image of images) {
    if (!nonBlank(image) || !image.startsWith("/images/")) {
      fail(
        `${label} ("${entry.slug}"): image "${image}" must be a /images/... path (null/[] = placeholder)`,
      );
      continue;
    }
    if (seen.has(image)) {
      fail(`${label} ("${entry.slug}"): duplicate image "${image}"`);
    }
    seen.add(image);
  }
}

function checkProjects(projects) {
  checkSlugs(projects, "projects");
  for (const project of projects) {
    const label = `projects[${project.slug ?? "?"}]`;
    for (const field of ["title", "summary", "location"]) {
      if (!nonBlank(project[field])) {
        fail(`${label}: "${field}" is empty`);
      }
    }
    checkDetails(project, label, project.details);
    checkImagePaths(project, label, project.images ?? []);

    // completedAt: real calendar date (rejects 2024-02-31), not the future.
    const match = ISO_DATE.exec(project.completedAt ?? "");
    if (!match) {
      fail(
        `${label}: completedAt "${project.completedAt}" must be an ISO date (YYYY-MM-DD)`,
      );
    } else {
      const [, y, m, d] = match;
      const date = new Date(`${project.completedAt}T00:00:00Z`);
      if (
        Number.isNaN(date.getTime()) ||
        date.getUTCFullYear() !== Number(y) ||
        date.getUTCMonth() + 1 !== Number(m) ||
        date.getUTCDate() !== Number(d)
      ) {
        fail(
          `${label}: completedAt "${project.completedAt}" is not a real calendar date`,
        );
      } else if (date.getTime() > Date.now()) {
        fail(
          `${label}: completedAt "${project.completedAt}" is in the future (a completed project cannot be)`,
        );
      }
    }
  }
}

function checkOffers(offers) {
  checkSlugs(offers, "offers");
  for (const offer of offers) {
    const label = `offers[${offer.slug ?? "?"}]`;
    for (const field of ["title", "summary"]) {
      if (!nonBlank(offer[field])) {
        fail(`${label}: "${field}" is empty`);
      }
    }
    checkDetails(offer, label, offer.details);

    const image = offer.image;
    if (image !== null && (!nonBlank(image) || !image.startsWith("/images/"))) {
      fail(
        `${label}: "image" must be null (placeholder) or a /images/... path, got "${image}"`,
      );
    }
  }
}

function checkFeedbacks(feedbacks) {
  const seen = new Set();
  for (const [index, feedback] of feedbacks.entries()) {
    const label = `feedbacks[${index}]`;
    for (const field of ["id", "name", "surname", "message"]) {
      if (!nonBlank(feedback[field])) {
        fail(`${label}: "${field}" is empty`);
      }
    }
    if (seen.has(feedback.id)) {
      fail(`${label}: duplicate id "${feedback.id}" — React keys would collide`);
    }
    seen.add(feedback.id);
  }
}

function checkSiteConfig(siteConfig) {
  const { siteUrl, nav, contact } = siteConfig;

  if (!nonBlank(siteUrl) || !siteUrl.startsWith("https://")) {
    fail(`siteConfig.siteUrl must be an https:// URL, got "${siteUrl}"`);
  } else if (siteUrl.endsWith("/")) {
    fail(
      `siteConfig.siteUrl must not end with "/" (canonical URLs are built from it), got "${siteUrl}"`,
    );
  }

  const hrefs = new Set();
  for (const link of nav) {
    if (!nonBlank(link.href) || !link.href.startsWith("/")) {
      fail(`siteConfig.nav: href "${link.href}" must start with "/"`);
    }
    if (link.href.length > 1 && link.href.endsWith("/")) {
      fail(
        `siteConfig.nav: href "${link.href}" must not end with "/" (canonicals have none)`,
      );
    }
    if (hrefs.has(link.href)) {
      fail(`siteConfig.nav: duplicate href "${link.href}"`);
    }
    hrefs.add(link.href);
    if (!nonBlank(link.label)) {
      fail(`siteConfig.nav: label for "${link.href}" is empty`);
    }
  }

  if (!nonBlank(contact.email) || !contact.email.includes("@")) {
    fail(
      `siteConfig.contact.email "${contact.email}" does not look like an email address`,
    );
  }
  if (!nonBlank(contact.phone) || !contact.phone.startsWith("+")) {
    fail(
      `siteConfig.contact.phone "${contact.phone}" should be in international format (+48 ...)`,
    );
  }
}

/** Former check-assets.mjs: every referenced image file exists under public/. */
async function checkAssets(modules) {
  const references = new Map(); // image path -> [module names]
  const collect = (moduleName, images) => {
    for (const image of images) {
      if (!nonBlank(image)) continue;
      const refs = references.get(image) ?? [];
      refs.push(moduleName);
      references.set(image, refs);
    }
  };

  for (const project of modules.projects) collect("projects", project.images ?? []);
  for (const offer of modules.offers) {
    if (offer.image) collect("offers", [offer.image]);
  }

  for (const [image, refs] of references) {
    const fsPath = join(PUBLIC_DIR, decodeURIComponent(image));
    try {
      await access(fsPath);
    } catch {
      fail(
        `missing image file "${image}" (referenced from ${refs.join(", ")}) — add it under public/ or use null/[] for a placeholder`,
      );
    }
  }

  return references.size;
}

async function main() {
  const started = Date.now();
  const { projects, offers, feedbacks, siteConfig } = await loadContent();

  checkProjects(projects);
  checkOffers(offers);
  checkFeedbacks(feedbacks);
  checkSiteConfig(siteConfig);
  const assetCount = await checkAssets({ projects, offers });

  if (errors.length > 0) {
    console.error(`✖ Content validation failed (${errors.length} problem(s)):\n`);
    for (const error of errors) {
      console.error(`  • ${error}`);
    }
    console.error(
      "\nFix the entries in src/content/ (PRZYKŁAD entries are replaced by real data).",
    );
    process.exit(1);
  }

  console.log(
    `✓ Content valid: ${projects.length} projects, ${offers.length} offers, ` +
      `${feedbacks.length} feedbacks, ${assetCount} image references exist ` +
      `(${Date.now() - started}ms)`,
  );
}

main().catch((error) => {
  console.error("Content check failed:", error);
  process.exit(1);
});
