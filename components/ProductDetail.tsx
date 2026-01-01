'use client';

import { motion } from 'motion/react';
import { ArrowRight, Heart, Share2, Check, Phone, MessageCircle } from 'lucide-react';
import { getProductById } from '@/lib/products';
import { useState } from 'react';
import Image from 'next/image';

interface ProductDetailProps {
    productId: string;
    onBack: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
    const product = getProductById(productId);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">المنتج غير موجود</div>;
    }

    const allImages = product.gallery.length > 0 ? product.gallery : [product.image];

    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className="flex items-center gap-2 text-[#0088FF] hover:text-[#005CB8] transition-colors mb-8"
                >
                    <span>العودة إلى المنتجات</span>
                    <ArrowRight size={20} />
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images Section */}
                    <div>
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative overflow-hidden rounded-2xl shadow-2xl mb-4 h-[500px]"
                        >
                            <Image
                                src={allImages[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                                    <Heart size={20} className="text-[#FF1744]" />
                                </button>
                                <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                                    <Share2 size={20} className="text-[#0088FF]" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Thumbnail Gallery */}
                        {allImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {allImages.slice(0, 8).map((image, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative overflow-hidden rounded-lg h-24 ${selectedImage === index ? 'ring-2 ring-[#0088FF]' : ''
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info Section */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Category Badge */}
                            <span className="inline-block px-4 py-2 bg-[#0088FF]/10 text-[#0088FF] rounded-full mb-4">
                                {product.category}
                            </span>

                            {/* Product Name */}
                            <h1 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                                {product.name}
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-gray-600 mb-6">
                                {product.description}
                            </p>

                            {/* Colors */}
                            <div className="mb-6">
                                <p className="text-gray-700 mb-2">الألوان المتوفرة</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color, index) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(index)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${selectedColor === index
                                                ? 'border-[#0088FF] bg-[#0088FF]/10'
                                                : 'border-gray-300 hover:border-[#0088FF]'
                                                }`}
                                        >
                                            <span
                                                className="w-5 h-5 rounded-full border border-gray-300"
                                                style={{ backgroundColor: color.value }}
                                            />
                                            <span className={selectedColor === index ? 'text-[#0088FF]' : ''}>{color.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <motion.a
                                    href={`https://wa.me/966540079507?text=أريد الاستفسار عن ${product.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 px-8 py-4 bg-[#0088FF] text-white rounded-lg hover:bg-[#005CB8] transition-colors shadow-lg text-center"
                                >
                                    طلب عرض سعر
                                </motion.a>
                                <motion.a
                                    href={`https://wa.me/966540079507?text=أريد طلب عينة مجانية من ${product.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 px-8 py-4 bg-white border-2 border-[#0088FF] text-[#0088FF] rounded-lg hover:bg-[#0088FF]/5 transition-colors text-center"
                                >
                                    طلب عينة مجانية
                                </motion.a>
                            </div>

                            {/* Contact Buttons */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <a
                                    href="tel:+966540079507"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00D4FF]/10 text-[#00D4FF] rounded-lg hover:bg-[#00D4FF]/20 transition-colors"
                                >
                                    <Phone size={20} />
                                    <span>اتصل الآن</span>
                                </a>
                                <a
                                    href="https://wa.me/966540079507"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366]/10 text-[#25D366] rounded-lg hover:bg-[#25D366]/20 transition-colors"
                                >
                                    <MessageCircle size={20} />
                                    <span>واتساب</span>
                                </a>
                            </div>

                            {/* Features */}
                            <div className="bg-gradient-to-br from-[#E6F5FF] to-white rounded-2xl p-6">
                                <h3 className="text-xl text-[#1A1A1A] mb-4">
                                    المميزات
                                </h3>
                                <div className="space-y-3">
                                    {product.features.map((feature, index) => (
                                        <motion.div
                                            key={feature}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#0088FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <Check size={16} className="text-[#0088FF]" />
                                            </div>
                                            <span className="text-gray-700">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Detailed Description */}
                {product.detailedDescription && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-16 bg-white rounded-2xl shadow-lg p-8"
                    >
                        <h2 className="text-2xl text-[#1A1A1A] mb-6">تفاصيل المنتج</h2>
                        <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                            {product.detailedDescription}
                        </div>
                    </motion.div>
                )}

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        { icon: '🚚', title: 'شحن مجاني', desc: 'لجميع مناطق المملكة' },
                        { icon: '✅', title: 'ضمان الجودة', desc: 'منتجات أصلية 100%' },
                        { icon: '🔄', title: 'إرجاع سهل', desc: 'خلال 14 يوم' },
                    ].map((badge) => (
                        <div
                            key={badge.title}
                            className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg"
                        >
                            <div className="text-4xl">{badge.icon}</div>
                            <div>
                                <h4 className="text-lg text-[#1A1A1A] mb-1">{badge.title}</h4>
                                <p className="text-gray-600">{badge.desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
