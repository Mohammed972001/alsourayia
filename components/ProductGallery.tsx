'use client';

import { useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { products, getCategories } from '@/lib/products';
import { whatsappLink } from '@/lib/contact';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import Image from 'next/image';
import Link from 'next/link';

export function ProductGallery() {
    const [selectedCategory, setSelectedCategory] = useState('الكل');
    const categories = getCategories();
    const gridTopRef = useRef<HTMLParagraphElement>(null);

    // With the sticky filter, a short result list can land above the viewport — bring it back
    const selectCategory = (category: string) => {
        setSelectedCategory(category);
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
                    eyebrow="منتجاتنا"
                    title="تشكيلة السجاد والموكيت"
                    description="اكتشف مجموعتنا الواسعة من الموكيت والسجاد والمفروشات والأرضيات في الرياض"
                />

                {/* Category filter — sticky swipe rail on phones, wraps on desktop */}
                <div className="sticky top-16 z-30 -mx-4 px-4 py-3 mb-6 md:mb-10 bg-white/90 backdrop-blur-xl md:static md:bg-transparent md:backdrop-blur-none md:py-0">
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
                                    className={`snap-start shrink-0 px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
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

                {/* Products grid — keyed by filter so cards re-enter on change */}
                <div key={selectedCategory} className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {filteredProducts.map((product, index) => (
                        <article
                            key={product.id}
                            data-reveal
                            style={{ '--d': `${(index % 3) * 80}ms` } as React.CSSProperties}
                            className="group"
                        >
                            <Link
                                href={`/products/${product.id}`}
                                className="press flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-line hover:shadow-[0_18px_40px_-20px_rgba(20,20,20,0.35)] hover:-translate-y-1 transition-all duration-500"
                            >
                                <div className="relative aspect-square md:aspect-[4/3] overflow-hidden bg-cream">
                                    <Image
                                        src={product.image}
                                        alt={`${product.name} - ${product.category} من موكيت ومفروشات السريع الرياض`}
                                        fill
                                        sizes="(max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading={index < 4 ? 'eager' : 'lazy'}
                                    />
                                    <span className="absolute top-2.5 right-2.5 md:top-4 md:right-4 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] md:text-xs font-medium text-ink">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-3 md:p-5">
                                    <h3 className="font-display text-sm md:text-lg font-semibold text-ink leading-snug line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <span className="mt-auto pt-3 flex items-center justify-between text-xs md:text-sm text-ink-muted">
                                        عرض التفاصيل
                                        <span className="w-7 h-7 md:w-9 md:h-9 grid place-items-center rounded-full bg-cream text-ink group-hover:bg-ink group-hover:text-white transition-colors duration-300">
                                            <ArrowLeft size={14} />
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div
                    className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-5 rounded-3xl bg-cream border border-line p-6 md:p-10 text-center md:text-right"
                    data-reveal
                >
                    <div>
                        <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mb-1">لم تجد ما تبحث عنه؟</h3>
                        <p className="text-ink-muted text-sm md:text-base">أرسل لنا صورة المكان وسنقترح عليك الأنسب مع عرض سعر مجاني.</p>
                    </div>
                    <a
                        href={whatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-white rounded-full text-sm font-bold hover:bg-ink-soft transition-colors"
                    >
                        <WhatsAppIcon className="w-4 h-4" />
                        تواصل عبر واتساب
                    </a>
                </div>
            </div>
        </section>
    );
}
