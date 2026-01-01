'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Eye, Grid3x3, List } from 'lucide-react';
import { products, getCategories } from '@/lib/products';
import Image from 'next/image';

interface ProductGalleryProps {
    onProductClick: (productId: string) => void;
}

export function ProductGallery({ onProductClick }: ProductGalleryProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState('الكل');

    const categories = getCategories();

    const filteredProducts = products.filter((product) => {
        return selectedCategory === 'الكل' || product.category === selectedCategory;
    });

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
                    <span className="inline-block px-4 py-2 bg-[#0088FF]/10 text-[#0088FF] rounded-full mb-4">
                        منتجاتنا
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
                        تشكيلة فريدة من السجاد والموكيت
                    </h2>
                </motion.div>

                {/* Filters */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === category
                                        ? 'bg-[#0088FF] text-white'
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
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                    ? 'bg-[#0088FF] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Grid3x3 size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                    ? 'bg-[#0088FF] text-white'
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
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer ${viewMode === 'list' ? 'flex gap-6' : ''
                                    }`}
                                onClick={() => onProductClick(product.id)}
                            >
                                {/* Image */}
                                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-1/3' : 'h-64'}`}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="p-3 bg-white rounded-full hover:bg-[#0088FF] hover:text-white transition-colors"
                                        >
                                            <Heart size={20} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onProductClick(product.id);
                                            }}
                                            className="p-3 bg-white rounded-full hover:bg-[#0088FF] hover:text-white transition-colors"
                                        >
                                            <Eye size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                    <div className="mb-2">
                                        <span className="inline-block px-3 py-1 bg-[#0088FF]/10 text-[#0088FF] rounded-full">
                                            {product.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl text-[#1A1A1A] mb-2">
                                        {product.name}
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
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onProductClick(product.id);
                                            }}
                                            className="px-6 py-2 bg-[#0088FF] text-white rounded-lg hover:bg-[#005CB8] transition-colors"
                                        >
                                            عرض التفاصيل
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://wa.me/966540079507"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#0088FF] transition-colors"
                    >
                        تواصل معنا للمزيد
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
