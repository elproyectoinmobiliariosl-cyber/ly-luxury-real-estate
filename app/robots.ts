import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Static export requires every route to declare it has no request-time
// dependency — this file has none (nothing here reads params/headers/etc).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/*/legal/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
