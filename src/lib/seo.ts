import type { Metadata } from "next";
import media from "@/content/media.json";
import { products } from "@/content/products";
import { site, siteLive, siteUrl } from "@/content/site";
import type { Product } from "@/content/types";

export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "/" : path}`;

type PageMeta = { title: string; description: string; path: string; image?: string; absoluteTitle?: boolean };

/** Metadata for one page (constitution I): unique title and description, canonical, Open Graph. */
export function pageMetadata({ title, description, path, image = "mosque-12", absoluteTitle = true }: PageMeta): Metadata {
  const entry = (media as Record<string, { width: number; height: number; widths: number[] }>)[image];
  const ogWidth = entry ? (entry.widths.includes(1200) ? 1200 : entry.widths.at(-1)!) : 1200;
  const ogImage = entry ? `/media/${image}-${ogWidth}.webp` : undefined;
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: siteLive ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      siteName: site.name,
      url,
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: ogWidth, height: entry ? Math.round((entry.height * ogWidth) / entry.width) : undefined, alt: title }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: ogImage ? [ogImage] : undefined },
  };
}

// ---- JSON-LD (one graph per page, only what the page shows) -----------------------------------
const STORE_ID = `${siteUrl}/#store`;
const SITE_ID = `${siteUrl}/#website`;

export function storeNode() {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": STORE_ID,
    name: site.name,
    alternateName: [site.short, site.nameEn],
    legalName: site.legalName,
    description: site.about,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/media/showroom-1200.webp"),
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapUrl,
    openingHoursSpecification: site.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.dayOfWeek, opens: h.opens, closes: h.closes })),
    identifier: { "@type": "PropertyValue", propertyID: "الرقم الوطني الموحد", value: site.unifiedNumber },
    vatID: site.vatNumber,
    areaServed: [{ "@type": "City", name: site.city }, { "@type": "Country", name: "المملكة العربية السعودية" }],
    sameAs: site.social.map((s) => s.url),
    contactPoint: [
      { "@type": "ContactPoint", telephone: site.phone, contactType: "sales", availableLanguage: "ar" },
      { "@type": "ContactPoint", telephone: site.phone2, contactType: "sales", availableLanguage: "ar" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "أرضيات موكيت ومفروشات السريع",
      itemListElement: products.map((p) => ({ "@type": "OfferCatalog", name: p.name, url: absoluteUrl(`/products/${p.slug}`) })),
    },
  };
}

/** The product on its own page: what it is, a photo, and the owner's starting price per square metre when given. */
export function productNode(p: Product) {
  const url = absoluteUrl(`/products/${p.slug}`);
  const image = (media as Record<string, { widths: number[] }>)[p.images[0]];
  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: p.name,
    description: p.summary,
    url,
    ...(image ? { image: absoluteUrl(`/media/${p.images[0]}-${image.widths.at(-1)}.webp`) } : {}),
    brand: { "@id": STORE_ID },
    ...(p.priceFrom !== null
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "SAR",
            price: p.priceFrom,
            priceSpecification: { "@type": "UnitPriceSpecification", price: p.priceFrom, priceCurrency: "SAR", unitCode: "MTK", unitText: "متر مربع" },
            availability: "https://schema.org/InStock",
            seller: { "@id": STORE_ID },
          },
        }
      : {}),
  };
}

export function websiteNode() {
  return { "@type": "WebSite", "@id": SITE_ID, name: site.name, url: absoluteUrl("/"), inLanguage: "ar-SA", publisher: { "@id": STORE_ID } };
}

export function breadcrumbNode(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: absoluteUrl(t.path) })),
  };
}

export function faqNode(faq: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function webPageNode(path: string, name: string, description: string, type = "WebPage") {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "ar-SA",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": STORE_ID },
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": [storeNode(), websiteNode(), ...nodes] };
}
