export interface ProductDetails {
  id: string;
  /** Date of the last real change to this page's own copy or photos (sitemap lastmod). */
  updatedAt: string;
  title: string;
  description: string;
  /** Two or three quotable sentences under the H1: what, for whom, where, how to reach the shop (T035). */
  summary?: string;
  detailedDescription: string;
  metaDescription: string;
  keywords: string[];
  imageDir?: string;
  /** Show the folder's newest photos first (WhatsApp file names sort by date). */
  newestFirst?: boolean;
  images: string[];
  availableColors: { name: string; value: string }[];
  /** The owner's starting price per square metre (2026-11-03). */
  startingPriceSar?: number;
  /** Common market values or the supplier's catalogue, at the owner's request; the page says the quote confirms them. */
  specs?: { label: string; value: string }[];
  features: string[];
  faqs?: { question: string; answer: string }[];
  /** Ids of products to cross-link from this product page. */
  related?: string[];
}

export interface ContainerItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

export interface ContainerSection {
  id: string;
  title: string;
  items: ContainerItem[];
}

