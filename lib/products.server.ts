import { productsDetails } from '@/data/products';
import { getImagesFromDir } from './getProductImages';
import type { Product } from './products';

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
    'rabal-gem': 'أرضيات رياضية',
    'non-slip-rubber': 'أرضيات مطاط',
    'horse-rubber': 'أرضيات خيول',
    'office-carpet': 'موكيت مكاتب',
    'turky-mshager': 'موكيت تركي',
  };
  return categoryMap[id] || 'أخرى';
}

/**
 * Server-only: resolves product images dynamically from filesystem.
 * Use this in Server Components (e.g., product detail pages) to get
 * ALL images from the product's directory, not just the hardcoded subset.
 */
export function getProductWithDynamicImages(id: string): Product | undefined {
  const productData = productsDetails.find(p => p.id === id);
  if (!productData) return undefined;

  let images = productData.images;
  if (productData.imageDir) {
    const dirImages = getImagesFromDir(productData.imageDir);
    if (dirImages.length > 0) images = dirImages;
  }

  return {
    id: productData.id,
    name: productData.title.split(' - ')[0],
    category: getCategoryFromId(productData.id),
    image: images[0] || '/images/placeholder.jpg',
    colors: productData.availableColors,
    description: productData.description,
    detailedDescription: productData.detailedDescription,
    features: productData.features,
    gallery: images,
  };
}
