import { productsDetails } from '@/data/products';
import { mergedCategories } from './merged-categories';

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

// Categories that held a single product duplicated that product's page, and
// Google indexed the thin category instead of the product. They now redirect
// (308, next.config.ts) to the product; only real hubs keep a category page.
export { mergedCategories };

/** The page a category link should open: its hub, or its only product. */
export function categoryHref(slug: string): string {
  const productId = mergedCategories[slug];
  return productId ? `/products/${productId}` : `/products/category/${slug}`;
}

/** Category slugs that still have their own page. */
export const hubCategorySlugs = Object.keys(categorySlugMap).filter((slug) => !mergedCategories[slug]);

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
  return hubCategorySlugs.map(slug => ({ slug }));
}

export interface CategoryContent {
  /** <title> without the brand: app/layout.tsx appends « | موكيت ومفروشات السريع». */
  title: string;
  description: string;
  /** The H1; it carries the searched spelling of the ad keyword. */
  heading: string;
  /** One line under the H1, confirmed promises only. */
  promise: string;
  /** 120–180 words in the market's own words; the searched spellings appear here verbatim. */
  intro: string;
  /** One line per product in the category: what it is for, linked to its page. */
  items: { productId: string; label: string; text: string }[];
  /** «ما الفرق بين …» in plain prose, one paragraph per type, no prices. */
  comparison: { heading: string; paragraphs: string[] };
  faqs: { question: string; answer: string }[];
  outro: string;
  /** Prefilled WhatsApp message for the hub's buttons. */
  whatsappMessage: string;
}

// Hand-written copy for categories that group several distinct products,
// so the category page answers "which one do I need?" instead of repeating
// the product pages. The searched spellings (no hamza: «ارضيات», «باركيه ارضيات»)
// are kept verbatim in title, H1, intro and description because Google Ads
// rates the landing page against the keyword as typed.
export const categoryContent: Record<string, CategoryContent> = {
  parquet: {
    title: 'باركيه ارضيات وتركيب باركيه الرياض',
    description:
      'محلات باركيه في الرياض: باركيه ارضيات خشب وSPC وباركيه ضد الماء مع توريد وتركيب باركيه، معاينة وقياس مجاناً وعينة مجانية قبل الطلب، وتوصيل لكل مدن المملكة.',
    heading: 'باركيه ارضيات في الرياض: باركيه خشب وباركيه SPC وباركيه ضد الماء',
    promise: 'معاينة وقياس مجاناً، وعينة مجانية قبل الطلب، وتوريد وتركيب باركيه في الرياض، وتوصيل لكل مدن المملكة.',
    intro:
      'تبحث عن محلات باركيه في الرياض؟ معرض موكيت ومفروشات السريع في حراج بن قاسم يعرض باركيه ارضيات بالأنواع التي يسأل عنها الناس: باركيه خشب لغرف النوم والمجالس والصالات، وباركيه SPC الذي يتحمل الماء للمطابخ والملاحق والمداخل، ومشمع باركيه (فينيل بشكل الخشب) للمحلات والشقق المؤجرة. الفرق بينها ليس في الشكل فقط، بل في مكان التركيب: الغرفة الجافة غير المطبخ، والبيت غير المحل. لذلك نبدأ بسؤالك عن المكان قبل أن نعرض عليك العينات. تركيب باركيه عندنا يبدأ بمعاينة وقياس مجاناً في مكانك، ثم عينة مجانية تراها بجانب أثاثك وتحت إضاءة غرفتك، ثم عرض السعر على الواتساب بعد القياس، ثم التوريد والتركيب. ومن خارج الرياض نوصّل إلى كل مدن المملكة. في هذه الصفحة تجد أنواع باركيه الرياض المتوفرة عندنا، والفرق بينها بكلمات بسيطة، وأجوبة الأسئلة التي تصلنا كل يوم على الواتساب.',
    items: [
      { productId: 'parket', label: 'باركيه خشب', text: 'لغرف النوم والمجالس والصالات وغرفة المكتب في البيت، حيث لا يصل الماء إلى الأرض. ألوان بلوط وجوز وخشب فاتح، ونتفق على اتجاه الألواح قبل التركيب.' },
      { productId: 'water-resistant-carpet', label: 'باركيه ضد الماء (SPC)', text: 'شكل الخشب في المطابخ والملاحق وغرف الغسيل والمداخل. الألواح نفسها لا تتأثر بالماء المنسكب ولا بالمسح اليومي.' },
      { productId: 'vinyl-roll', label: 'مشمع باركيه (فينيل بشكل الخشب)', text: 'بديل الباركيه للمحلات والمستودعات والشقق المؤجرة: يُفرش كلفّة واحدة فوق البلاط بوصلات قليلة ويُمسح يوميًا.' },
    ],
    comparison: {
      heading: 'ما الفرق بين باركيه خشب وباركيه SPC ومشمع باركيه؟',
      paragraphs: [
        'باركيه خشب هو الألواح التي يقصدها أغلب من يبحث عن باركيه ارضيات لبيته: ملمس ودفء الخشب، ويُفرش في الغرف الجافة التي يُمشى فيها بالنعال والجوارب. يتأثر بالماء الراكد وبالرطوبة الصاعدة من الأرض، لذلك نبعده عن المطبخ ودورات المياه، ونفحص استواء الأرضية والمسافة تحت الأبواب في المعاينة.',
        'باركيه SPC ألواح بقلب حجري مضغوط وطبقة علوية بشكل الخشب، وهو ما يُباع في السوق باسم باركيه ضد الماء. يتحمل الانسكاب والمسح اليومي، فيناسب المطبخ المفتوح على الصالة والملحق والمداخل، ويُركّب فوق البلاط المستوي. يبدو من بعيد مثل الخشب، ويختلف عنه في الملمس تحت القدم.',
        'مشمع باركيه هو فينيل رول مطبوع بشكل الخشب، يُقص على مقاس المكان ويُفرش كقطعة شبه متصلة. هو الأخف والأسرع في الفرش، ويختاره أصحاب المحلات والشقق المؤجرة حين يريدون شكل الباركيه دون تكسير البلاط. سطحه لا يمتص الماء، لكنه أرق من الألواح، فتظهر عليه حفر الأرضية التي تحته إن لم تُعالج قبل الفرش.',
      ],
    },
    faqs: [
      { question: 'هل تركيب الباركيه يتم فوق البلاط أو الرخام الموجود؟', answer: 'في الغالب نعم، بشرط أن تكون الأرضية ثابتة ومستوية. نفحصها في المعاينة والقياس، ونخبرك إن كانت تحتاج تسوية قبل التركيب، ونقيس المسافة تحت الأبواب لأن الأرضية الجديدة ترفع المستوى قليلًا.' },
      { question: 'أي نوع يناسب المطبخ: باركيه خشب أم باركيه ضد الماء؟', answer: 'المطبخ والملحق وأي مكان يصله الماء أو الرطوبة يناسبه باركيه ضد الماء (SPC) أو مشمع باركيه، لأن الباركيه الخشبي يتأثر بالماء المنسكب. غرف النوم والمجالس تناسبها ألواح الخشب.' },
      { question: 'هل توردون الباركيه فقط أم مع التركيب؟', answer: 'نورّد ونركّب. في الرياض نبدأ بمعاينة وقياس مجاناً في مكانك، ثم عينة مجانية، ثم عرض السعر على الواتساب بعد القياس. ومن خارج الرياض نوصّل إلى كل مدن المملكة.' },
      { question: 'كيف أعرف سعر الباركيه للمتر؟', answer: 'السعر يعتمد على النوع واللون والمساحة وحالة الأرضية، لذلك نعطيك عرض السعر بعد المعاينة والقياس. أرسل مقاسات الغرف وصورها على الواتساب لنرتب الموعد.' },
    ],
    outro: 'لم تحسم النوع بعد؟ أرسل صورة المكان وقياسه التقريبي على الواتساب، ونقترح عليك المناسب قبل المعاينة والقياس.',
    whatsappMessage: 'أريد الاستفسار عن باركيه ارضيات من موكيت ومفروشات السريع',
  },
  'rubber-flooring': {
    title: 'ارضيات مطاط وربل جيم في الرياض',
    description:
      'ارضيات مطاط (ارضيات ربل) في الرياض: ربل جيم وارضيات مطاطية للجيم، وربل حمامات ضد الانزلاق، وبلاط مطاط. توريد وتركيب مع معاينة وقياس مجاناً وعينة.',
    heading: 'ارضيات مطاط (ارضيات ربل) في الرياض: ربل جيم وربل حمامات وبلاط مطاط',
    promise: 'معاينة وقياس مجاناً، وعينة مجانية قبل الطلب، وتوريد وتركيب في الرياض، وتوصيل لكل مدن المملكة.',
    intro:
      'كلمة «ربل» تُطلق في السوق على ارضيات مطاط عمومًا، لكن مكان الاستخدام هو الذي يحدد النوع: ارضية مطاط لصالة أوزان غير ارضية حمام مبلل. في معرض موكيت ومفروشات السريع بحراج بن قاسم تجد ارضيات ربل بالاستخدامين اللذين يصلنا السؤال عنهما كل يوم: ربل جيم، وهو ارضيات مطاطية للجيم تمتص صدمة الأوزان وتخفف الصوت وتحمي البلاط، ويُفرش في ارضيات صالة رياضية أو ارضيات نادي رياضي أو جيم منزلي في غرفة أو ملحق، ويأتي رولًا أو بلاط مطاط يُرصّ قطعة بجانب قطعة. وربل حمامات بسطح منقوش ضد الانزلاق لدورات المياه وأماكن الوضوء وحمامات المدارس والمستشفيات، ويندرج تحت ما يبحث عنه الناس باسم ارضيات ضد الانزلاق. وإلى جانبهما نوفر فوم ارضيات للاطفال لغرف اللعب والحضانات، نعرضه عليك في المعاينة عند الحاجة. نبدأ بمعاينة وقياس مجاناً في مكانك، ونحضر العينات لتراها وتلمسها، ثم نرسل عرض السعر على الواتساب بعد القياس، ثم التوريد والتركيب. ومن خارج الرياض نوصّل إلى كل مدن المملكة.',
    items: [
      { productId: 'rabal-gem', label: 'ربل جيم', text: 'للنوادي والصالات الرياضية والجيم المنزلي. يمتص صدمة الأوزان ويحمي الأرضية والأجهزة ويقلل الضوضاء، ولا ينزلق مع العرق.' },
      { productId: 'non-slip-rubber', label: 'ربل حمامات ضد الانزلاق', text: 'لدورات المياه وأماكن الوضوء والمناطق المبللة. سطحه منقوش يمنح القدم قبضة على الأرض المبللة، ولا يمتص الماء، ويتحمل المطهرات.' },
    ],
    comparison: {
      heading: 'ما الفرق بين ربل جيم رول وبلاط مطاط وفوم الأطفال؟',
      paragraphs: [
        'ربل جيم رول لفّة طويلة من المطاط تُفرش على طول الصالة بوصلات قليلة، فتناسب مناطق الأجهزة والكارديو والممرات الواسعة، ويصعب أن تتحرك تحت الأجهزة الثقيلة. تحتاج أرضية مستوية ونظيفة، ونقصها على مقاس المكان في التركيب.',
        'بلاط مطاط قطع مربعة سميكة تُرصّ متجاورة، ويختارها أصحاب النوادي لمنطقة الأوزان الحرة لأن القطعة التي تتضرر من سقوط الأوزان تُستبدل وحدها، ولأن السماكة الأكبر تمتص الصدمة وتخفف الصوت على الجيران في الجيم المنزلي. وهو نفسه ما يُستخدم بسطح منقوش في ربل حمامات دورات المياه.',
        'فوم ارضيات للاطفال قطع خفيفة متشابكة من الإسفنج المضغوط، ملمسها ناعم ودافئ ويسهل فكها وتركيبها وغسلها، لذلك مكانها غرف اللعب والحضانات، وليس صالات الأوزان: الفوم لا يتحمل سقوط الدمبل ولا أرجل الأجهزة الثقيلة.',
      ],
    },
    faqs: [
      { question: 'هل يُركّب ربل الجيم فوق البلاط الموجود؟', answer: 'غالبًا نعم، فوق البلاط أو الخرسانة أو الرخام، بعد التأكد من استواء الأرضية ونظافتها في المعاينة. لا حاجة لتكسير الأرضية القديمة.' },
      { question: 'ما السماكة المناسبة لصالة الأوزان أو الجيم المنزلي؟', answer: 'تعتمد على نوع التمارين ومكان الصالة: الأوزان الحرة تحتاج سماكة أكبر من منطقة الكارديو، والجيم في شقة يحتاج تخفيف الصوت عن الجيران. نقترح السماكة بعد معرفة الاستخدام والمعاينة.' },
      { question: 'هل ارضيات ضد الانزلاق تناسب دورات مياه المساجد وأماكن الوضوء؟', answer: 'نعم، ربل الحمامات مصمم للأماكن التي تبقى مبللة طوال اليوم: سطحه منقوش ولا يمتص الماء ويتحمل المطهرات. نراجع في المعاينة ميول الأرضية ومكان الصفاية حتى لا يتجمع الماء.' },
      { question: 'كيف أحصل على عرض سعر لأرضيات المطاط؟', answer: 'أرسل مساحة المكان بالتقريب وصورًا له ونوع الاستخدام على الواتساب. المعاينة والقياس مجاناً في الرياض، ويصلك عرض السعر بعد القياس. ومن خارج الرياض نوصّل إلى كل مدن المملكة.' },
    ],
    outro: 'إذا لم تكن متأكدًا من النوع المناسب، أرسل لنا صورة المكان عبر واتساب ونساعدك في الاختيار قبل المعاينة والقياس.',
    whatsappMessage: 'أريد الاستفسار عن ارضيات مطاط (ربل) من موكيت ومفروشات السريع',
  },
};
