import { expect, test } from "@playwright/test";

/**
 * Smoke suite for the static export in out/ (the exact artifact Vercel ships).
 *
 * Goal: catch "the deploy is broken" mistakes in seconds — routing, SEO
 * plumbing, structured data, media pipeline, consent — not exhaustive
 * coverage. Data comes from src/content/*.ts, so assertions target
 * structure and invariants, never specific sample strings.
 *
 * Never runs on Vercel; see docs/adr/0014-testing-and-telemetry.md.
 */

const SITE_URL = "https://www.smlynski.pl";

test.describe("page shell", () => {
  test("home loads with the site title and lang=pl", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Sebastian Młyński/);
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("every header nav link resolves to a page with an h1", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("header a[href^='/']")
      .evaluateAll((links) => [...new Set(links.map((a) => a.getAttribute("href")))]);
    expect(hrefs.length).toBeGreaterThan(3);
    for (const href of hrefs) {
      const response = await page.goto(href!);
      expect(response?.status(), `${href} should return 200`).toBe(200);
      await expect(
        page.getByRole("heading", { level: 1 }),
        `${href} should have a visible h1`,
      ).toBeVisible();
    }
  });

  test("header and footer render on home", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("SEO plumbing", () => {
  // Next.js normalizes the home canonical to the bare origin (no slash).
  const canonicalCases: Array<[string, string]> = [
    ["/", SITE_URL],
    ["/projects", `${SITE_URL}/projects`],
    ["/offer", `${SITE_URL}/offer`],
    ["/contact", `${SITE_URL}/contact`],
  ];

  for (const [path, canonical] of canonicalCases) {
    test(`canonical on ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        canonical,
      );
    });
  }

  test("404 page has no canonical (must not claim to be a real page)", async ({
    page,
  }) => {
    await page.goto("/definitely-not-a-page");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test("sitemap.xml: all URLs on the www https host, includes slugs", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain(`<loc>${SITE_URL}/</loc>`);
    expect(body).toContain(`<loc>${SITE_URL}/projects</loc>`);
    expect(body).toContain(`${SITE_URL}/projects/`); // at least one slug
    expect(body).toContain(`${SITE_URL}/offer/`); // at least one slug
    // Every URL must be canonical-host https — catches a reverted siteUrl.
    expect(body).not.toMatch(/<loc>http:\/\//);
    expect(body).not.toMatch(/<loc>https:\/\/(?!www\.smlynski\.pl)/);
  });

  test("robots.txt points at the www sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });

  test("LocalBusiness JSON-LD parses with a real address", async ({ page }) => {
    await page.goto("/");
    const raw = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(raw).toBeTruthy();
    const data = JSON.parse(raw!);
    expect(data["@type"]).toBe("HomeAndConstructionBusiness");
    expect(data.address.addressLocality).toBeTruthy();
    expect(data.address.addressCountry).toBe("PL");
  });
});

test.describe("detail pages", () => {
  test("project detail: canonical, breadcrumb JSON-LD, gallery", async ({ page }) => {
    await page.goto("/projects");
    // Enter the first project from the listing (content-driven, no hardcoded slug).
    await page.locator("main a[href^='/projects/']").first().click();
    await expect(page).toHaveURL(/\/projects\/[a-z0-9-]+$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`^${SITE_URL}/projects/[a-z0-9-]+$`),
    );

    const crumb = await page.evaluate(() => {
      // hasText filters ignore <script> contents, so match in page JS instead.
      const raw = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((s) => s.textContent)
        .find((text) => text?.includes("BreadcrumbList"));
      return raw ? JSON.parse(raw) : null;
    });
    expect(crumb).toBeTruthy();
    expect(crumb["@type"]).toBe("BreadcrumbList");
    expect(crumb.itemListElement).toHaveLength(3);
    // First crumb is home on the canonical host; last crumb is the current
    // page and must NOT carry an item URL.
    expect(crumb.itemListElement[0].item).toBe(`${SITE_URL}/`);
    expect(crumb.itemListElement.at(-1).item).toBeUndefined();
  });

  test("offer detail renders with canonical + h1", async ({ page }) => {
    await page.goto("/offer");
    await page.locator("main a[href^='/offer/']").first().click();
    await expect(page).toHaveURL(/\/offer\/[a-z0-9-]+$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`^${SITE_URL}/offer/[a-z0-9-]+$`),
    );
  });

  test("missing project slug returns 404, not an empty shell", async ({ page }) => {
    const response = await page.goto("/projects/nie-ma-takiego");
    expect(response?.status()).toBe(404);
  });
});

test.describe("media pipeline", () => {
  test("hero uses <picture> with a WebP source and a jpg fallback", async ({
    page,
  }) => {
    await page.goto("/");
    const webp = page.locator('picture source[type="image/webp"]').first();
    await expect(webp).toHaveAttribute("srcset", /^\/optimized\/images\//);
    // The <img> fallback keeps the original path for legacy browsers.
    const img = page.locator("picture img").first();
    await expect(img).toHaveAttribute("src", /^\/images\//);
  });

  test("the preloaded hero image is the WebP, not the multi-MB original", async ({
    page,
  }) => {
    await page.goto("/");
    // Scoped to /optimized/ — the logo's preload sits first in the DOM.
    const href = await page
      .locator('link[rel="preload"][as="image"][href*="/optimized/"]')
      .first()
      .getAttribute("href");
    expect(href).toMatch(/^\/optimized\/images\/.*\.webp$/);
  });

  test("every image on the projects listing points into /images or /optimized", async ({
    page,
  }) => {
    await page.goto("/projects");
    const srcs = await page
      .locator("main img")
      .evaluateAll((imgs) => imgs.map((i) => i.getAttribute("src")));
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) {
      expect(src).toMatch(/^\/(images|optimized)\//);
    }
  });
});

test.describe("contact", () => {
  test("form renders its fields and submit button", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Matched by label text (Polish), not brittle ids.
    await expect(page.getByLabel(/imię i nazwisko/i)).toBeVisible();
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
    await expect(page.getByLabel(/wiadomość/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Wyślij" })).toBeVisible();
  });

  test("click-to-call works from the sticky header", async ({ page }) => {
    await page.goto("/");
    const tel = page.locator("header a[href^='tel:']").first();
    await expect(tel).toBeVisible();
    // International format, whitespace stripped.
    await expect(tel).toHaveAttribute("href", /^tel:\+48\d{9}$/);
  });

  test("honeypot field is present, off-screen, and hidden from a11y", async ({
    page,
  }) => {
    await page.goto("/contact");
    const honeypot = page.locator("form input[name='website']");
    await expect(honeypot).toHaveCount(1);
    // Must be off-screen but NOT display:none (bots skip display:none traps).
    const styles = await honeypot.evaluate((el) => {
      const wrapper = el.closest("div[aria-hidden='true']");
      const computed = wrapper ? getComputedStyle(wrapper) : null;
      return {
        display: computed?.display,
        position: computed?.position,
        left: computed?.left,
      };
    });
    expect(styles.display).not.toBe("none");
    expect(styles.position).toBe("absolute");
    // Far off-screen to the left.
    expect(parseInt(styles.left ?? "0", 10)).toBeLessThan(-1000);
  });
});

test.describe("consent & analytics", () => {
  const banner = (page: import("@playwright/test").Page) =>
    // NB: the aria-label reads "plikach" (genitive), not "plików".
    page.getByRole("region", { name: "Informacja o plikach cookie" });

  test("accepting hides the banner and persists the cookie across reloads", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(banner(page)).toBeVisible();

    await page.getByRole("button", { name: "Akceptuję wszystkie" }).click();
    await expect(banner(page)).toBeHidden();

    const cookie = (await page.context().cookies()).find(
      (c) => c.name === "cookie-consent",
    );
    expect(cookie?.value).toBe("true");

    // Decision must survive a fresh navigation — no banner reappearing.
    await page.reload();
    await expect(banner(page)).toBeHidden();
  });

  test("rejecting also persists and never shows the banner again", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Tylko niezbędne" }).click();
    await expect(banner(page)).toBeHidden();
    await page.reload();
    await expect(banner(page)).toBeHidden();
    const cookie = (await page.context().cookies()).find(
      (c) => c.name === "cookie-consent",
    );
    expect(cookie?.value).toBe("false");
  });

  test("GA4 is not injected at all when unconfigured (local builds)", async ({
    page,
  }) => {
    await page.goto("/");
    // NEXT_PUBLIC_GA_ID unset => no gtag scripts, nothing to consent to.
    const gaCount = await page.evaluate(
      () => document.querySelectorAll("script[src*='googletagmanager']").length,
    );
    expect(gaCount).toBe(0);
  });

  test("Consent Mode v2: denied by default, granted only after accept", async ({
    page,
  }) => {
    await page.goto("/");

    interface ConsentCmd extends Array<unknown> {
      0: "consent";
    }
    const consentCommands = await page.evaluate(() =>
      ((window as { dataLayer?: ConsentCmd[] }).dataLayer ?? []).filter(
        (cmd) => Array.isArray(cmd) && cmd[0] === "consent",
      ),
    );
    // Only meaningful when GA is configured (skipped in local builds).
    test.skip(
      consentCommands.length === 0,
      "GA not configured in this build (NEXT_PUBLIC_GA_ID unset)",
    );

    // Consent Mode v2: the default state must be denied for every category.
    const defaults = consentCommands.filter((cmd) => cmd[1] === "default");
    expect(defaults.length).toBeGreaterThan(0);
    for (const cmd of defaults) {
      const state = cmd[2] as Record<string, string>;
      expect(state.analytics_storage).toBe("denied");
      expect(state.ad_storage).toBe("denied");
    }

    // Accepting must push a consent update granting analytics_storage.
    await page.getByRole("button", { name: "Akceptuję wszystkie" }).click();
    const granted = await page
      .waitForFunction(
        () =>
          ((window as { dataLayer?: unknown[] }).dataLayer ?? []).some(
            (cmd) =>
              Array.isArray(cmd) &&
              cmd[0] === "consent" &&
              cmd[1] === "update" &&
              (cmd[2] as Record<string, string> | undefined)?.analytics_storage ===
                "granted",
          ),
        undefined,
        { timeout: 5_000 },
      )
      .then(() => true)
      .catch(() => false);
    expect(granted).toBe(true);
  });
});

test.describe("cookies policy page", () => {
  test("renders, has a canonical, and is linked from the footer", async ({ page }) => {
    await page.goto("/polityka-cookies");
    await expect(page).toHaveTitle(/Polityka plików cookie/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${SITE_URL}/polityka-cookies`,
    );
    // The cookie inventory must be described in plain language.
    await expect(page.getByText("Niezbędne", { exact: true })).toBeVisible();
    await expect(page.getByText("Statystyczne (Google Analytics)")).toBeVisible();
    // Both consent choices are explained.
    await expect(page.getByText("„Akceptuję wszystkie”")).toBeVisible();
    await expect(page.getByText("„Tylko niezbędne”")).toBeVisible();

    // Linked from the footer (discoverable for users + crawlers).
    await page.goto("/");
    await expect(page.locator("footer a[href='/polityka-cookies']")).toBeVisible();
  });

  test("cookie banner links to the cookies policy", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: "Informacja o plikach cookie" });
    await expect(banner).toBeVisible();
    await expect(banner.locator("a[href='/polityka-cookies']")).toBeVisible();
  });
});
