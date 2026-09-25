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
  faqs?: { question: string; answer: string }[];
  related?: string[];
}

// Maps URL slug → Arabic category name
export const categorySlugMap: Record<string, string> = {
  'mosque-carpets': 'موكيت مساجد',
  'office-flooring': 'أرضيات مكتبية',
  'parquet': 'باركيه',
  'artificial-grass': 'عشب صناعي',
  'vinyl': 'فينيل',
  'carpet': 'موكيت',
  'hospital-flooring': 'أرضيات طبية',
  'mosque-vinyl': 'فينيل مساجد',
  'rubber-flooring': 'أرضيات مطاط',
  'office-carpet': 'موكيت مكاتب',
  'turkish-carpet': 'موكيت تركي',
};

// Maps Arabic category name → URL slug
export const categoryToSlug: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugMap).map(([slug, name]) => [name, slug])
);

// Transform productsDetails to products format (uses hardcoded images from data)
export const products: Product[] = productsDetails.map((product) => ({
  id: product.id,
  name: product.title.split(' - ')[0],
  category: getCategoryFromId(product.id),
  image: product.images[0] || '/images/placeholder.jpg',
  colors: product.availableColors,
  description: product.description,
  detailedDescription: product.detailedDescription,
  features: product.features,
  gallery: product.images,
  faqs: product.faqs,
  related: product.related,
}));

export function getCategoryFromId(id: string): string {
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
    'rabal-gem': 'أرضيات مطاط',
    'non-slip-rubber': 'أرضيات مطاط',
    'horse-rubber': 'أرضيات مطاط',
    'office-carpet': 'موكيت مكاتب',
    'turky-mshager': 'موكيت تركي',
  };
  return categoryMap[id] || 'أخرى';
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getCategories(): string[] {
  const categories = products.map(p => p.category);
  return ['الكل', ...Array.from(new Set(categories))];
}

export function getProductsByCategory(categoryName: string): Product[] {
  return products.filter(p => p.category === categoryName);
}

export function generateCategoryStaticParams() {
  return Object.keys(categorySlugMap).map(slug => ({ slug }));
}

export interface CategoryContent {
  title: string;
  description: string;
  heading: string;
  intro: string;
  /** One line per product in the category: what it is for, linked to its page. */
  items: { productId: string; label: string; text: string }[];
  outro: string;
}

// Hand-written copy for categories that group several distinct products,
// so the category page answers "which one do I need?" instead of repeating
// the product pages.
export const categoryContent: Record<string, CategoryContent> = {
  'rubber-flooring': {
    title: 'أرضيات مطاط (ربل) في الرياض: ربل جيم ومطاط دورات المياه ومطاط الخيل',
    description: 'أرضيات المطاط في الرياض من موكيت ومفروشات السريع: ربل جيم للصالات الرياضية، ومطاط دورات المياه ضد الانزلاق، ومطاط إسطبلات الخيل. اعرف أي نوع يناسب مكانك.',
    heading: 'أرضيات المطاط (الربل): أي نوع تحتاج؟',
    intro: 'كلمة «ربل» تُطلق في السوق على أرضيات المطاط عمومًا، لكن مكان الاستخدام هو الذي يحدد النوع المناسب. نوفر ثلاثة أنواع، لكل منها استخدامه:',
    items: [
      { productId: 'rabal-gem', label: 'ربل جيم', text: 'للنوادي والصالات الرياضية والجيم المنزلي. يمتص صدمة الأوزان ويحمي الأرضية ويقلل الضوضاء.' },
      { productId: 'non-slip-rubber', label: 'مطاط دورات المياه', text: 'للحمامات وأماكن الوضوء والمناطق المبللة. سطحه منقوش ضد الانزلاق ولا يمتص الماء ويتحمل المطهرات.' },
      { productId: 'horse-rubber', label: 'مطاط الخيل', text: 'لإسطبلات الخيول وممراتها وأماكن غسيلها. يتحمل وزن الخيل والبول والغسيل، ومقاوم للحريق.' },
    ],
    outro: 'إذا لم تكن متأكدًا من النوع المناسب، أرسل لنا صورة المكان عبر واتساب ونساعدك في الاختيار قبل المعاينة والقياس.',
  },
};
