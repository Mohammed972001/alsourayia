// Home products section (T030): eight featured cards and a prominent link to /products, which keeps
// the full filterable gallery (components/ProductGallery.tsx). Server component: the home page no
// longer ships the filter state or renders all fourteen cards, which cut its DOM size.
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { getProductById, type Product } from '@/lib/products';
import { whatsappLink } from '@/lib/contact';
import { imageAlt } from '@/data/stock-images';
import { Icon } from '@/components/icons/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { ProductCard } from '@/components/product/ProductCard';

// The ad landing products first, then the rest of the range. Horse rubber is not stocked now.
const FEATURED_IDS = [
    'office-carpet',
    'rabal-gem',
    'mosque-carpets',
    'parket',
    'non-slip-rubber',
    'hospital-flooring',
    'vinyl-roll',
    'water-resistant-carpet',
];

export function FeaturedProducts() {
    const featured = FEATURED_IDS.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));

    return (
        <section id="products" className="py-16 md:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading
                    eyebrow="منتجاتنا"
                    title="تشكيلة السجاد والموكيت والأرضيات"
                    description="موكيت مساجد ومكاتب ومنازل، باركيه، فينيل، عشب صناعي وأرضيات مطاط في الرياض"
                />

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 tiles-in" data-reveal="tiles">
                    {featured.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            badge={product.category}
                            alt={imageAlt(product.image, `${product.name} - ${product.category} من موكيت ومفروشات السريع الرياض`)}
                            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            eager={index < 4}
                            style={{ '--i': index % 4 } as CSSProperties}
                        />
                    ))}
                </div>

                <div className="mt-8 md:mt-10 flex justify-center">
                    <Link
                        href="/products"
                        className="shine press inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border-2 border-ink text-ink font-bold text-sm hover:bg-ink hover:text-white transition-colors"
                    >
                        كل المنتجات
                        <Icon name="arrow-start" size={16} />
                    </Link>
                </div>

                {/* CTA */}
                <div
                    className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-5 rounded-3xl bg-cream border border-line p-6 md:p-10 text-center md:text-right"
                    data-reveal="clip"
                >
                    <div>
                        <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mb-1">لم تجد ما تبحث عنه؟</h3>
                        <p className="text-ink-muted text-sm md:text-base">أرسل لنا صورة المكان ومقاسه وسنقترح عليك الأنسب، مع معاينة وقياس مجاناً.</p>
                    </div>
                    <a
                        href={whatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shine press shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-white rounded-full text-sm font-bold hover:bg-ink-soft transition-colors"
                    >
                        <WhatsAppIcon className="w-4 h-4" />
                        تواصل عبر واتساب
                    </a>
                </div>
            </div>
        </section>
    );
}
