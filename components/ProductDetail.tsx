'use client';

import { ArrowRight, Check, Phone, MessageCircle } from 'lucide-react';
import { getProductById } from '@/lib/products';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from './Breadcrumb';

interface ProductDetailProps {
    productId: string;
    dynamicGallery?: string[];
    onBack?: () => void;
}

export function ProductDetail({ productId, dynamicGallery, onBack }: ProductDetailProps) {
    const router = useRouter();
    const handleBack = () => onBack ? onBack() : router.back();
    const product = getProductById(productId);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-[#4A4A4A]">المنتج غير موجود</div>;
    }

    const allImages = dynamicGallery && dynamicGallery.length > 0
        ? dynamicGallery
        : product.gallery.length > 0 ? product.gallery : [product.image];
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com';

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
        "category": product.category,
        "sku": `SURYE-${product.id.toUpperCase()}`,
        "mpn": `MFS-${product.id.toUpperCase()}-2025`,
        "color": product.colors.map(c => c.name).join(', '),
        "offers": {
            "@type": "Offer",
            "url": `${baseUrl}/products/${product.id}`,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "priceCurrency": "SAR",
            "price": "0",
            "priceValidUntil": "2026-12-31",
            "seller": {
                "@type": "Organization",
                "name": "موكيت ومفروشات السريع",
                "url": baseUrl,
                "telephone": "+966541540047"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "50",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    const breadcrumbItems = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المنتجات', href: '/#products' },
        { label: product.name }
    ];

    const getImageAlt = (index: number) => {
        const baseAlt = `${product.name} - ${product.category}`;
        if (index === 0) return `${baseAlt} - موكيت ومفروشات السريع الرياض`;
        return `${baseAlt} - صورة ${index + 1}`;
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            <Breadcrumb items={breadcrumbItems} />

            <div className="pt-8 pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Back */}
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors mb-8 text-sm"
                    >
                        <span>العودة إلى المنتجات</span>
                        <ArrowRight size={16} />
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Images */}
                        <div>
                            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4 aspect-[4/3]">
                                <Image
                                    src={allImages[selectedImage]}
                                    alt={getImageAlt(selectedImage)}
                                    fill
                                    priority={selectedImage === 0}
                                    quality={85}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>

                            {allImages.length > 1 && (
                                <div className="grid grid-cols-6 gap-2">
                                    {allImages.slice(0, 12).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative overflow-hidden rounded-md aspect-square ${
                                                selectedImage === index ? 'ring-2 ring-[#1A1A1A]' : 'opacity-60 hover:opacity-100'
                                            } transition-all`}
                                            aria-label={`عرض ${getImageAlt(index)}`}
                                        >
                                            <Image
                                                src={image}
                                                alt={getImageAlt(index)}
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            <span className="text-xs text-[#6B7280] mb-2 block">{product.category}</span>
                            <h1 className="text-2xl md:text-3xl text-[#1A1A1A] mb-4">{product.name}</h1>
                            <p className="text-[#4A4A4A] mb-8 leading-relaxed">{product.description}</p>

                            {/* Colors */}
                            <div className="mb-8">
                                <p className="text-sm text-[#6B7280] mb-3">الألوان المتوفرة</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color, index) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(index)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm ${
                                                selectedColor === index
                                                    ? 'border-[#1A1A1A] bg-[#F9FAFB]'
                                                    : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                        >
                                            <span
                                                className="w-4 h-4 rounded-full border border-gray-200"
                                                style={{ backgroundColor: color.value }}
                                            />
                                            <span className="text-[#4A4A4A]">{color.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                                <a
                                    href={`https://wa.me/966541540047?text=أريد الاستفسار عن ${product.name} من موكيت ومفروشات السريع`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 px-6 py-3.5 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors text-center text-sm"
                                >
                                    طلب عرض سعر
                                </a>
                                <a
                                    href={`https://wa.me/966541540047?text=أريد طلب عينة مجانية من ${product.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 px-6 py-3.5 border border-gray-200 text-[#4A4A4A] rounded-lg hover:border-gray-400 transition-colors text-center text-sm"
                                >
                                    طلب عينة مجانية
                                </a>
                            </div>

                            {/* Contact */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <a
                                    href="tel:+966541540047"
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F9FAFB] text-[#4A4A4A] rounded-lg hover:bg-gray-100 transition-colors text-sm"
                                >
                                    <Phone size={16} />
                                    <span>اتصل الآن</span>
                                </a>
                                <a
                                    href="https://wa.me/966541540047"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F9FAFB] text-[#4A4A4A] rounded-lg hover:bg-gray-100 transition-colors text-sm"
                                >
                                    <MessageCircle size={16} />
                                    <span>واتساب</span>
                                </a>
                            </div>

                            {/* Features */}
                            <div className="p-6 bg-[#F9FAFB] rounded-lg">
                                <h2 className="text-lg text-[#1A1A1A] mb-4">مميزات المنتج</h2>
                                <div className="space-y-3">
                                    {product.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <Check size={16} className="text-[#4A4A4A] flex-shrink-0 mt-0.5" />
                                            <span className="text-[#4A4A4A] text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Description */}
                    {product.detailedDescription && (
                        <div className="mt-16 max-w-4xl">
                            <h2 className="text-xl text-[#1A1A1A] mb-6">تفاصيل المنتج</h2>
                            <div className="prose prose-lg max-w-none text-[#4A4A4A] whitespace-pre-line leading-relaxed">
                                {product.detailedDescription}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
