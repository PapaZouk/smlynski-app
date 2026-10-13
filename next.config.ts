import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: no server runtime, deployable as static files on Vercel.
  // See docs/adr/0002-nextjs-static-export.md
  output: "export",

  // Pin the workspace root so Turbopack does not walk up the directory tree
  // and pick up stray lockfiles outside the repository.
  turbopack: {
    root: import.meta.dirname,
  },

  // Static export cannot use the image optimization server, so images are
  // served as-is. The <Media> component centralizes image handling so this
  // trade-off can be revisited in one place. See docs/adr/0005-media-placeholders.md
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
