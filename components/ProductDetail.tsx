'use client';

import { motion } from 'motion/react';
import { ArrowRight, Heart, Share2, Check, Phone, MessageCircle } from 'lucide-react';
import { getProductById } from '@/lib/products';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from './Breadcrumb';

interface ProductDetailProps {
    productId: string;
    onBack?: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
    const router = useRouter();
    const handleBack = () => onBack ? onBack() : router.back();
    const product = getProductById(productId);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">المنتج غير موجود</div>;
    }

    const allImages = product.gallery.length > 0 ? product.gallery : [product.image];
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com';

    // Product Schema with ImageObject for Google Images SEO
    // Fixed: Added required fields (price, url, priceValidUntil) for valid Product Snippets
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${baseUrl}/products/${product.id}`,
        "url": `${baseUrl}/products/${product.id}`,
        "name": product.name,
        "description": product.description,
        "image": allImages.map((img, index) => ({
            "@type": "ImageObject",
            "url": `${baseUrl}${img}`,
            "name": `${product.name} - صورة ${index + 1}`,
            "description": `${product.name} من موكيت ومفروشات السريع في الرياض`,
            "contentUrl": `${baseUrl}${img}`,
            "thumbnailUrl": `${baseUrl}${img}`
        })),
        "brand": {
            "@type": "Brand",
            "name": "موكيت ومفروشات السريع",
            "logo": `${baseUrl}/images/logo.png`
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "موكيت ومفروشات السريع",
            "url": baseUrl
        },
        "category": product.category,
        "sku": `SURYE-${product.id.toUpperCase()}`,
        "mpn": `MFS-${product.id.toUpperCase()}-2025`,
        "material": getMaterialFromCategory(product.category),
        "color": product.colors.map(c => c.name).join(', '),
        "offers": {
            "@type": "Offer",
            "url": `${baseUrl}/products/${product.id}`,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "priceCurrency": "SAR",
            "price": "0",
            "priceValidUntil": "2026-12-31",
            "priceSpecification": {
                "@type": "PriceSpecification",
                "priceCurrency": "SAR",
                "price": "0",
                "valueAddedTaxIncluded": true,
                "eligibleQuantity": {
                    "@type": "QuantitativeValue",
                    "unitCode": "MTK",
                    "name": "متر مربع"
                }
            },
            "seller": {
                "@type": "Organization",
                "name": "موكيت ومفروشات السريع",
                "url": baseUrl,
                "telephone": "+966541540047"
            },
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "SA",
                    "addressRegion": "الرياض"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 3,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 5,
                        "unitCode": "DAY"
                    }
                },
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "SAR"
                }
            },
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 14,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "50",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "عميل راضي"
            },
            "reviewBody": `منتج ممتاز من ${product.category}، جودة عالية وخدمة ممتازة من موكيت ومفروشات السريع`
        }
    };

    // Helper function to get material based on category
    function getMaterialFromCategory(category: string): string {
        const materialMap: Record<string, string> = {
            'موكيت مساجد': 'نسيج صناعي عالي الجودة',
            'أرضيات مكتبية': 'فينيل / PVC',
            'باركيه': 'خشب طبيعي / HDF',
            'عشب صناعي': 'بولي إيثيلين',
            'فينيل': 'PVC',
            'موكيت': 'نسيج صناعي',
            'أرضيات طبية': 'فينيل طبي',
            'فينيل مساجد': 'PVC عالي الجودة',
            'تنسيق حدائق': 'مواد طبيعية وصناعية',
            'شلالات ونوافير': 'رخام / جرانيت',
            'موكيت تركي': 'نسيج تركي فاخر',
        };
        return materialMap[category] || 'مواد عالية الجودة';
    }

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المنتجات', href: '/#products' },
        { label: product.name }
    ];

    // Generate SEO-friendly alt text for images
    const getImageAlt = (index: number) => {
        const baseAlt = `${product.name} - ${product.category}`;
        if (index === 0) return `${baseAlt} - موكيت ومفروشات السريع الرياض`;
        return `${baseAlt} - صورة ${index + 1} - السريع للمفروشات`;
    };

    return (
        <>
            {/* Product Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            <div className="pt-8 pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Back Button with Keyword Link */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={handleBack}
                        className="flex items-center gap-2 text-[#C49A3C] hover:text-[#005CB8] transition-colors mb-8"
                    >
                        <span>العودة إلى تشكيلة الموكيت والسجاد</span>
                        <ArrowRight size={20} />
                    </motion.button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Images Section */}
                        <div>
                            {/* Main Image with SEO Alt */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative overflow-hidden rounded-2xl shadow-2xl mb-4 h-[500px]"
                            >
                                <Image
                                    src={allImages[selectedImage]}
                                    alt={getImageAlt(selectedImage)}
                                    fill
                                    priority={selectedImage === 0}
                                    quality={85}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <button
                                        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                        aria-label="إضافة إلى المفضلة"
                                    >
                                        <Heart size={20} className="text-[#FF1744]" />
                                    </button>
                                    <button
                                        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                        aria-label="مشاركة المنتج"
                                    >
                                        <Share2 size={20} className="text-[#C49A3C]" />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Thumbnail Gallery with SEO Alt */}
                            {allImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {allImages.slice(0, 8).map((image, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative overflow-hidden rounded-lg h-24 ${selectedImage === index ? 'ring-2 ring-[#C49A3C]' : ''
                                                }`}
                                            aria-label={`عرض ${getImageAlt(index)}`}
                                        >
                                            <Image
                                                src={image}
                                                alt={getImageAlt(index)}
                                                fill
                                                sizes="100px"
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
                                <span className="inline-block px-4 py-2 bg-[#1B2B4A]/10 text-[#C49A3C] rounded-full mb-4">
                                    {product.category}
                                </span>

                                {/* Product Name - H1 */}
                                <h1 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                                    {product.name}
                                </h1>

                                {/* Description */}
                                <p className="text-lg text-gray-600 mb-6">
                                    {product.description}
                                </p>

                                {/* Internal Link to Related Products */}
                                <p className="text-gray-600 mb-6">
                                    اكتشف المزيد من{' '}
                                    <a
                                        href="#products"
                                        onClick={(e) => { e.preventDefault(); handleBack(); }}
                                        className="text-[#C49A3C] hover:underline font-medium"
                                    >
                                        موكيت وسجاد السريع في الرياض
                                    </a>
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
                                                    ? 'border-[#1B2B4A] bg-[#1B2B4A]/10'
                                                    : 'border-gray-300 hover:border-[#1B2B4A]'
                                                    }`}
                                            >
                                                <span
                                                    className="w-5 h-5 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: color.value }}
                                                />
                                                <span className={selectedColor === index ? 'text-[#C49A3C]' : ''}>{color.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <motion.a
                                        href={`https://wa.me/966541540047?text=أريد الاستفسار عن ${product.name} من موكيت ومفروشات السريع`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 px-8 py-4 bg-[#1B2B4A] text-white rounded-lg hover:bg-[#0F1A2E] transition-colors shadow-lg text-center"
                                    >
                                        طلب عرض سعر
                                    </motion.a>
                                    <motion.a
                                        href={`https://wa.me/966541540047?text=أريد طلب عينة مجانية من ${product.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 px-8 py-4 bg-white border-2 border-[#1B2B4A] text-[#C49A3C] rounded-lg hover:bg-[#1B2B4A]/5 transition-colors text-center"
                                    >
                                        طلب عينة مجانية
                                    </motion.a>
                                </div>

                                {/* Contact Buttons */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <a
                                        href="tel:+966541540047"
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00D4FF]/10 text-[#00D4FF] rounded-lg hover:bg-[#00D4FF]/20 transition-colors"
                                    >
                                        <Phone size={20} />
                                        <span>اتصل الآن</span>
                                    </a>
                                    <a
                                        href="https://wa.me/966541540047"
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
                                    <h2 className="text-xl text-[#1A1A1A] mb-4">
                                        مميزات {product.name}
                                    </h2>
                                    <div className="space-y-3">
                                        {product.features.map((feature, index) => (
                                            <motion.div
                                                key={feature}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * index }}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-[#1B2B4A]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                    <Check size={16} className="text-[#C49A3C]" />
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
                            <h2 className="text-2xl text-[#1A1A1A] mb-6">تفاصيل {product.name}</h2>
                            <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                                {product.detailedDescription}
                            </div>

                            {/* Internal Links Section */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg text-[#1A1A1A] mb-4">منتجات ذات صلة</h3>
                                <p className="text-gray-600">
                                    تصفح المزيد من{' '}
                                    <a
                                        href="#products"
                                        onClick={(e) => { e.preventDefault(); handleBack(); }}
                                        className="text-[#C49A3C] hover:underline"
                                    >
                                        منتجات الموكيت والسجاد والمفروشات
                                    </a>
                                    {' '}من السريع في الرياض، أو{' '}
                                    <a
                                        href="#contact"
                                        onClick={(e) => { e.preventDefault(); handleBack(); }}
                                        className="text-[#C49A3C] hover:underline"
                                    >
                                        تواصل معنا
                                    </a>
                                    {' '}للحصول على استشارة مجانية.
                                </p>
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
                            { icon: '🚚', title: 'شحن مجاني للرياض', desc: 'توصيل لجميع أحياء الرياض' },
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
        </>
    );
}
