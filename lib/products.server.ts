import { productsDetails } from '@/data/products';
import { getImagesFromDir } from './getProductImages';
import { getCategoryFromId, type Product } from './products';

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
    if (dirImages.length > 0) {
      const ordered = productData.newestFirst ? [...dirImages].reverse() : dirImages;
      // The hand-picked `images` list leads (best installation photos first); the rest of the folder follows.
      const lead = productData.images.filter((src) => ordered.includes(src));
      images = [...lead, ...ordered.filter((src) => !lead.includes(src))];
    }
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
    faqs: productData.faqs,
    related: productData.related,
  };
}
