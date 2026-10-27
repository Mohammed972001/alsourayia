'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { products, getCategories } from '@/lib/products';
import { whatsappLink } from '@/lib/contact';
import { imageAlt } from '@/data/stock-images';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { ProductCard } from '@/components/product/ProductCard';

export function ProductGallery({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
    const [selectedCategory, setSelectedCategory] = useState('الكل');
    // Until the visitor filters, the grid tiles in with the page; after that, cards replay `.card-in`.
    const [filtered, setFiltered] = useState(false);
    const categories = getCategories();
    const gridTopRef = useRef<HTMLParagraphElement>(null);

    // With the sticky filter, a short result list can land above the viewport; bring it back
    const selectCategory = (category: string) => {
        setSelectedCategory(category);
        setFiltered(true);
        const top = gridTopRef.current?.getBoundingClientRect().top ?? 0;
        if (top < 0) {
            window.scrollTo({ top: top + window.scrollY - 140, behavior: 'smooth' });
        }
    };

    const filteredProducts = products.filter((product) => {
        return selectedCategory === 'الكل' || product.category === selectedCategory;
    });

    return (
        <section id="products" className="py-16 md:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading
                    as={headingAs}
                    eyebrow="منتجاتنا"
                    title="تشكيلة السجاد والموكيت والأرضيات"
                    description="موكيت مساجد ومكاتب ومنازل، باركيه، فينيل، عشب صناعي وأرضيات مطاط في الرياض"
                />

                {/* Category filter: sticky swipe rail on phones, wraps on desktop */}
                <div className="sticky top-[var(--header-now)] z-30 -mx-4 px-4 py-3 mb-6 md:mb-10 bg-white/90 backdrop-blur-xl md:static md:bg-transparent md:backdrop-blur-none md:py-0">
                    <div
                        className="flex md:flex-wrap md:justify-center gap-2 overflow-x-auto no-scrollbar snap-x"
                        role="tablist"
                        aria-label="فلتر الفئات"
                    >
                        {categories.map((category) => {
                            const active = selectedCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => selectCategory(category)}
                                    role="tab"
                                    aria-selected={active}
                                    className={`snap-start shrink-0 px-3.5 py-1.5 text-[13px] font-semibold rounded-full border transition-all duration-300 ${
                                        active
                                            ? 'bg-ink border-ink text-white shadow-md shadow-ink/20'
                                            : 'bg-white border-line text-ink-soft hover:border-ink/40 hover:text-ink'
                                    }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <p ref={gridTopRef} className="text-xs md:text-sm text-ink-muted mb-4" aria-live="polite">
                    {filteredProducts.length} منتج
                </p>

                {/* Products grid, keyed by filter so cards re-enter on change */}
                <div
                    key={selectedCategory}
                    className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 ${filtered ? '' : 'tiles-in'}`}
                    {...(filtered ? {} : { 'data-reveal': 'tiles' })}
                >
                    {filteredProducts.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            badge={product.category}
                            alt={imageAlt(product.image, `${product.name} - ${product.category} من موكيت ومفروشات السريع الرياض`)}
                            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            eager={index < 4}
                            className={filtered ? 'card-in' : ''}
                            style={{ '--i': filtered ? index : index % 4 } as CSSProperties}
                        />
                    ))}
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
