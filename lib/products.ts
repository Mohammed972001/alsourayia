import { productsDetails } from '@/data/products';

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  colors: { name: string; value: string }[];
  description: string;
  detailedDescription: string;
  features: string[];
  gallery: string[];
}

// Transform productsDetails to products format for backward compatibility
export const products: Product[] = productsDetails.map((product) => ({
  id: product.id,
  name: product.title.split(' - ')[0], // Get short name from title
  category: getCategoryFromId(product.id),
  image: product.images[0] || '/images/placeholder.jpg',
  colors: product.availableColors,
  description: product.description,
  detailedDescription: product.detailedDescription,
  features: product.features,
  gallery: product.images,
}));

// Helper function to get category name from product id
function getCategoryFromId(id: string): string {
  const categoryMap: Record<string, string> = {
    'mosque-carpets': 'موكيت مساجد',
    'office-flooring': 'أرضيات مكتبية',
    'water-resistant-carpet': 'باركيه',
    'artificial-grass': 'عشب صناعي',
    'vinyl-roll': 'فينيل',
    'parket': 'باركيه',
    'mokite': 'موكيت',
    'hospital-flooring': 'أرضيات طبية',
    'vinyl-mosque': 'فينيل مساجد',
    'garden-flooring': 'تنسيق حدائق',
    'shlal': 'شلالات ونوافير',
    'planets': 'نباتات',
    'turky-mshager': 'موكيت تركي',
  };
  return categoryMap[id] || 'أخرى';
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

// Get unique categories
export function getCategories(): string[] {
  const categories = products.map(p => p.category);
  return ['الكل', ...Array.from(new Set(categories))];
}
