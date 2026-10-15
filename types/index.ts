export interface ProductDetails {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  metaDescription: string;
  keywords: string[];
  imageDir?: string;
  /** Show the folder's newest photos first (WhatsApp file names sort by date). */
  newestFirst?: boolean;
  images: string[];
  availableColors: { name: string; value: string }[];
  price: number;
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

