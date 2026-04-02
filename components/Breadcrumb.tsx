'use client';

import { ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    // Breadcrumb Schema for SEO
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com'}${item.href}` : undefined
        }))
    };

    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <nav aria-label="التنقل التفصيلي" className="py-3 px-4 bg-gray-50 border-b border-gray-100">
                <ol className="container mx-auto flex items-center flex-wrap gap-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center"
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                        >
                            {index > 0 && (
                                <ChevronLeft size={16} className="mx-2 text-gray-400" />
                            )}
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors"
                                    itemProp="item"
                                >
                                    {index === 0 && <Home size={16} />}
                                    <span itemProp="name">{item.label}</span>
                                </Link>
                            ) : (
                                <span className="text-gray-600" itemProp="name">{item.label}</span>
                            )}
                            <meta itemProp="position" content={String(index + 1)} />
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
