export interface ProductDetails {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  metaDescription: string;
  keywords: string[];
  imageDir?: string;
  images: string[];
  availableColors: { name: string; value: string }[];
  price: number;
  features: string[];
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

