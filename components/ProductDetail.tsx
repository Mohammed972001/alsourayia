'use client';

import { ArrowRight, Check, Phone, MessageCircle, MapPin } from 'lucide-react';
import { categoryToSlug, getProductById, type Product } from '@/lib/products';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from './Breadcrumb';
import { ADDRESS, MAPS_URL, PHONE_TEL, whatsappLink } from '@/lib/contact';

interface ProductDetailProps {
    productId: string;
    dynamicGallery?: string[];
    onBack?: () => void;
}

// detailedDescription is plain text with light markup: a line wrapped in **…**
// is a subheading, a block of "- " lines is a list, and **x** inside a line is
// bold. It used to be printed raw, which showed the asterisks to visitors.
function inline(text: string) {
    return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

function RichText({ text }: { text: string }) {
    return (
        <>
            {text.trim().split(/\n\s*\n/).map((block, i) => {
                const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
                const heading = lines[0]?.match(/^\*\*(.+)\*\*$/);
                const body = heading ? lines.slice(1) : lines;
                const isList = body.length > 0 && body.every((l) => l.startsWith('- '));
                return (
                    <div key={i} className="mb-6">
                        {heading && <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{heading[1]}</h3>}
                        {isList ? (
                            <ul className="list-disc pr-5 space-y-1">
                                {body.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}
                            </ul>
                        ) : (
                            body.length > 0 && (
                                <p>
                                    {body.map((l, j) => (
                                        <span key={j}>
                                            {j > 0 && <br />}
                                            {inline(l)}
                                        </span>
                                    ))}
                                </p>
                            )
                        )}
                    </div>
                );
            })}
        </>
    );
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

    // Priced per project after measuring, so this is a Service: a Product
    // would need a real price or genuine reviews, and the site has neither.
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${baseUrl}/products/${product.id}`,
        "url": `${baseUrl}/products/${product.id}`,
        "name": product.name,
        "description": product.description,
        "serviceType": product.category,
        "image": allImages.map((img) => `${baseUrl}${img}`),
        "areaServed": { "@type": "City", "name": "الرياض" },
        "provider": {
            "@type": "LocalBusiness",
            "@id": `${baseUrl}/#localbusiness`,
            "name": "موكيت ومفروشات السريع",
            "url": baseUrl,
            "telephone": "+966550101867"
        }
    };

    const categorySlug = categoryToSlug[product.category];
    const breadcrumbItems = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المنتجات', href: '/products' },
        ...(categorySlug ? [{ label: product.category, href: `/products/category/${categorySlug}` }] : []),
        { label: product.name }
    ];

    const relatedProducts = (product.related ?? [])
        .map((id) => getProductById(id))
        .filter((p): p is Product => Boolean(p));

    const faqSchema = product.faqs?.length
        ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": product.faqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
              }))
          }
        : null;

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
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            <Breadcrumb items={breadcrumbItems} />

            <div className="pt-4 lg:pt-8 pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Back */}
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors mb-4 lg:mb-8 text-sm"
                    >
                        <span>العودة إلى المنتجات</span>
                        <ArrowRight size={16} />
                    </button>

                    {/* Three blocks placed explicitly. On a phone they stack in source
                        order, so a visitor from an ad sees the headline and the contact
                        buttons on the first screen instead of after the photo and two
                        rows of thumbnails. On desktop the gallery keeps its column. */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start">
                        {/* Summary + contact */}
                        <div className="lg:col-start-2 lg:row-start-1">
                            <span className="text-xs text-[#6B7280] mb-2 block">{product.category}</span>
                            <h1 className="text-2xl md:text-3xl text-[#1A1A1A] mb-3 lg:mb-4">{product.name}</h1>
                            <p className="text-[#4A4A4A] mb-5 lg:mb-8 leading-relaxed">{product.description}</p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-3">
                                <a
                                    href={whatsappLink(`أريد الاستفسار عن ${product.name} من موكيت ومفروشات السريع`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 px-6 py-3.5 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors text-center text-sm"
                                >
                                    طلب عرض سعر
                                </a>
                                <a
                                    href={whatsappLink(`أريد طلب عينة مجانية من ${product.name}`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 px-6 py-3.5 border border-gray-200 text-[#4A4A4A] rounded-lg hover:border-gray-400 transition-colors text-center text-sm"
                                >
                                    طلب عينة مجانية
                                </a>
                            </div>

                            {/* Contact */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <a
                                    href={PHONE_TEL}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F9FAFB] text-[#4A4A4A] rounded-lg hover:bg-gray-100 transition-colors text-sm"
                                >
                                    <Phone size={16} />
                                    <span>اتصل الآن</span>
                                </a>
                                <a
                                    href={whatsappLink(`أريد الاستفسار عن ${product.name} من موكيت ومفروشات السريع`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F9FAFB] text-[#4A4A4A] rounded-lg hover:bg-gray-100 transition-colors text-sm"
                                >
                                    <MessageCircle size={16} />
                                    <span>واتساب</span>
                                </a>
                            </div>

                            {/* What the visitor gets, and where the shop is: the page had
                                no trust signal above the long description. */}
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 mb-6 lg:mb-8 text-sm text-[#1A1A1A]">
                                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-2">
                                    {['معاينة وقياس مجاناً', 'عينة مجانية', 'عرض سعر على الواتساب'].map((item) => (
                                        <span key={item} className="flex items-center gap-1.5">
                                            <Check size={14} className="text-green-700" />
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-1.5 text-[#4A4A4A] hover:text-[#1A1A1A]"
                                >
                                    <MapPin size={14} className="mt-0.5 shrink-0" />
                                    <span>معرضنا: {ADDRESS} — الموقع على الخريطة</span>
                                </a>
                            </div>

                            {/* Colors */}
                            <div>
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
                        </div>

                        {/* Images */}
                        <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2">
                            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-3 aspect-[4/3]">
                                <Image
                                    src={allImages[selectedImage]}
                                    alt={getImageAlt(selectedImage)}
                                    fill
                                    priority={selectedImage === 0}
                                    quality={85}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>

                            {/* Thumbnails: one horizontal strip instead of a 6-column grid
                                that stacked two rows above everything on a phone. */}
                            {allImages.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {allImages.slice(0, 12).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative shrink-0 w-16 h-16 lg:w-20 lg:h-20 overflow-hidden rounded-md ${
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

                        {/* Features */}
                        <div className="lg:col-start-2 lg:row-start-2 p-6 bg-[#F9FAFB] rounded-lg">
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

                    {/* Detailed Description */}
                    {product.detailedDescription && (
                        <div className="mt-16 max-w-4xl">
                            <h2 className="text-xl text-[#1A1A1A] mb-6">تفاصيل {product.name}</h2>
                            <div className="text-[#4A4A4A] leading-relaxed">
                                <RichText text={product.detailedDescription} />
                            </div>
                        </div>
                    )}

                    {product.faqs && product.faqs.length > 0 && (
                        <div className="mt-12 max-w-4xl">
                            <h2 className="text-xl text-[#1A1A1A] mb-6">أسئلة شائعة عن {product.name}</h2>
                            <div className="space-y-3">
                                {product.faqs.map((faq) => (
                                    <details key={faq.question} className="rounded-lg border border-gray-200 p-4">
                                        <summary className="cursor-pointer font-semibold text-[#1A1A1A]">{faq.question}</summary>
                                        <p className="mt-3 text-[#4A4A4A] leading-relaxed">{faq.answer}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}

                    {relatedProducts.length > 0 && (
                        <div className="mt-12 max-w-4xl">
                            <h2 className="text-xl text-[#1A1A1A] mb-6">منتجات قريبة قد تناسبك</h2>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {relatedProducts.map((p) => (
                                    <li key={p.id}>
                                        <Link
                                            href={`/products/${p.id}`}
                                            className="block h-full rounded-lg border border-gray-200 p-4 hover:border-gray-400 transition-colors"
                                        >
                                            <span className="block font-semibold text-[#1A1A1A] mb-1">{p.name}</span>
                                            <span className="block text-sm text-[#6B7280] leading-relaxed">{p.description}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
