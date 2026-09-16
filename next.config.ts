import type { NextConfig } from "next";

// Temporary: static export so this first preview can be deployed by simple
// drag-and-drop while the automated Netlify pipeline connection is sorted
// out. Once Airtable data + the contact form need server-side rendering,
// this flips back to a normal (non-export) Next.js build on Netlify.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
