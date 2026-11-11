import type { MetadataRoute } from "next";
import { siteLive } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// Everything stays out of search until launch (SITE_LIVE=1). AI crawlers are welcome once live (GEO).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteLive ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
