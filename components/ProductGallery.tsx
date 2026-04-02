'use client';

import { useState } from 'react';
import { products, getCategories } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

export function ProductGallery() {
    const [selectedCategory, setSelectedCategory] = useState('الكل');
    const categories = getCategories();

    const filteredProducts = products.filter((product) => {
        return selectedCategory === 'الكل' || product.category === selectedCategory;
    });

    return (
        <section id="products" className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                        تشكيلة السجاد والموكيت
                    </h2>
                    <p className="text-[#6B7280] max-w-2xl mx-auto">
                        اكتشف مجموعتنا الواسعة من الموكيت والسجاد والمفروشات والأرضيات في الرياض
                    </p>
                </div>

                {/* Category Filter — text tabs with underline indicator */}
                <div className="flex flex-wrap justify-center gap-1 mb-12" role="tablist" aria-label="فلتر الفئات">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            role="tab"
                            aria-selected={selectedCategory === category}
                            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                                selectedCategory === category
                                    ? 'bg-[#1A1A1A] text-white'
                                    : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-gray-50'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products Grid — image-dominant */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                        <article key={product.id} className="group">
                            <Link href={`/products/${product.id}`} className="block">
                                {/* Image — dominant */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 mb-4">
                                    <Image
                                        src={product.image}
                                        alt={`${product.name} - ${product.category} من موكيت ومفروشات السريع الرياض`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading={index < 6 ? 'eager' : 'lazy'}
                                    />
                                </div>

                                {/* Text */}
                                <div>
                                    <span className="text-xs text-[#6B7280] mb-1 block">{product.category}</span>
                                    <h3 className="text-[#1A1A1A] group-hover:text-[#4A4A4A] transition-colors">
                                        {product.name}
                                    </h3>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-[#6B7280] mb-4">
                        لم تجد ما تبحث عنه؟ تواصل معنا مباشرة.
                    </p>
                    <a
                        href="https://wa.me/966541540047?text=السلام عليكم، أريد الاستفسار عن منتجات الموكيت والمفروشات"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-[#1A1A1A] text-white rounded-lg text-sm hover:bg-[#333] transition-colors"
                    >
                        تواصل عبر واتساب
                    </a>
                </div>
            </div>
        </section>
    );
}
