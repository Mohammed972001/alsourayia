'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Eye, Grid3x3, List } from 'lucide-react';
import { products, getCategories } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

export function ProductGallery() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState('الكل');

    const categories = getCategories();

    const filteredProducts = products.filter((product) => {
        return selectedCategory === 'الكل' || product.category === selectedCategory;
    });

    // Generate SEO-friendly alt text
    const getProductImageAlt = (product: typeof products[0]) => {
        return `${product.name} - ${product.category} من موكيت ومفروشات السريع الرياض`;
    };

    return (
        <section id="products" className="py-20 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-[#C49A3C]/10 text-[#C49A3C] rounded-full mb-4">
                        منتجاتنا
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
                        تشكيلة فريدة من <span className="text-[#C49A3C]">السجاد والموكيت</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        اكتشف مجموعتنا الواسعة من{' '}
                        <strong>الموكيت والسجاد والمفروشات والأرضيات</strong>
                        {' '}في الرياض. جودة عالية وتصميمات عصرية من{' '}
                        <strong>مفروشات السريع</strong>.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2" role="tablist" aria-label="فلتر الفئات">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    role="tab"
                                    aria-selected={selectedCategory === category}
                                    className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === category
                                        ? 'bg-[#1B2B4A] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                aria-label="عرض شبكي"
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                    ? 'bg-[#1B2B4A] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Grid3x3 size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                aria-label="عرض قائمة"
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                    ? 'bg-[#1B2B4A] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Grid/List */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={viewMode}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={
                            viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                                : 'space-y-6'
                        }
                    >
                        {filteredProducts.map((product, index) => (
                            <motion.article
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all ${viewMode === 'list' ? 'flex gap-6' : ''
                                    }`}
                            >
                                {/* Image with SEO-friendly Link */}
                                <Link href={`/products/${product.id}`} className={`relative overflow-hidden block ${viewMode === 'list' ? 'w-1/3' : 'h-64'}`}>
                                    <Image
                                        src={product.image}
                                        alt={getProductImageAlt(product)}
                                        fill
                                        sizes={viewMode === 'list' ? '33vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading={index < 6 ? 'eager' : 'lazy'}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <span
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            className="p-3 bg-white rounded-full hover:bg-[#0088FF] hover:text-white transition-colors cursor-pointer"
                                            aria-label="إضافة إلى المفضلة"
                                        >
                                            <Heart size={20} />
                                        </span>
                                        <span
                                            className="p-3 bg-white rounded-full hover:bg-[#0088FF] hover:text-white transition-colors"
                                            aria-label="عرض التفاصيل"
                                        >
                                            <Eye size={20} />
                                        </span>
                                    </div>
                                </Link>

                                {/* Content */}
                                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                    <div className="mb-2">
                                        <span className="inline-block px-3 py-1 bg-[#C49A3C]/10 text-[#C49A3C] rounded-full text-sm">
                                            {product.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl text-[#1A1A1A] mb-2">
                                        <Link href={`/products/${product.id}`} className="hover:text-[#C49A3C] transition-colors">
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-gray-600">الألوان:</span>
                                        <div className="flex gap-1">
                                            {product.colors.slice(0, 3).map((color) => (
                                                <span
                                                    key={color.name}
                                                    className="w-5 h-5 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: color.value }}
                                                    title={color.name}
                                                />
                                            ))}
                                            {product.colors.length > 3 && (
                                                <span className="text-gray-500 text-sm">+{product.colors.length - 3}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="px-6 py-2 bg-[#1B2B4A] text-white rounded-lg hover:bg-[#0F1A2E] transition-colors"
                                        >
                                            عرض التفاصيل
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* CTA with Internal Links */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600 mb-4">
                        لم تجد ما تبحث عنه؟ تصفح جميع أنواع{' '}
                        <Link href="/#about" className="text-[#C49A3C] hover:underline">
                            الموكيت والسجاد من السريع
                        </Link>
                        {' '}أو تواصل معنا مباشرة.
                    </p>
                    <a
                        href="https://wa.me/966541540047?text=السلام عليكم، أريد الاستفسار عن منتجات الموكيت والمفروشات"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#0088FF] transition-colors"
                    >
                        تواصل معنا للمزيد من المنتجات
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
