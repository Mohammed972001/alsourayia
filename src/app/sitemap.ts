import type { MetadataRoute } from "next";
import { guides } from "@/content/guides";
import { hubs, products } from "@/content/products";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// Last real content change per page; bump it when a page's content changes, not on every build.
const REDESIGN = "2026-11-11";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    ...hubs.map((h) => ({ path: `/products/category/${h.slug}`, priority: 0.9 })),
    ...products.map((p) => ({ path: `/products/${p.slug}`, priority: 0.8 })),
    { path: "/guides", priority: 0.5 },
    ...guides.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.6 })),
    { path: "/catalogs", priority: 0.5 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.7 },
    { path: "/faq", priority: 0.5 },
    { path: "/privacy", priority: 0.2 },
  ];
  return pages.map((p) => ({ url: absoluteUrl(p.path), lastModified: REDESIGN, priority: p.priority }));
}
