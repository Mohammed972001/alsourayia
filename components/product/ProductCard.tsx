import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { whatsappLink } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

interface ProductCardProps {
    product: { id: string; name: string; image: string };
    /** Small label over the photo (the product's category). */
    badge: string;
    alt: string;
    sizes: string;
    eager?: boolean;
    /** Above-the-fold picture on a page whose LCP it may be. */
    priority?: boolean;
    /** The hub pages list their products as h2 (page outline); elsewhere they are h3. */
    titleAs?: 'h2' | 'h3';
    className?: string;
    style?: CSSProperties;
    /** Motion hooks (`data-reveal`, …) passed through to the card. */
    dataAttrs?: Record<`data-${string}`, string>;
}

/**
 * The shared product card (sister-storefront style): square photo with a category badge, centred title,
 * «اسأل عن السعر» and the free-inspection line. The title link is stretched over the whole card; on
 * devices with a pointer a small rail rises over the photo on hover with a view link and a WhatsApp
 * link for this product. Server-safe (no hooks), so it renders in server and client lists alike.
 */
export function ProductCard({
    product,
    badge,
    alt,
    sizes,
    eager = false,
    priority = false,
    titleAs: Title = 'h3',
    className = '',
    style,
    dataAttrs,
}: ProductCardProps) {
    const href = `/products/${product.id}`;

    return (
        <article
            {...dataAttrs}
            style={style}
            data-spotlight
            className={`group lift press relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white ${className}`}
        >
            <div className="relative aspect-square overflow-hidden bg-cream">
                <Image
                    src={product.image}
                    alt={alt}
                    fill
                    sizes={sizes}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={priority}
                    loading={eager || priority ? 'eager' : 'lazy'}
                />
                <span className="absolute top-2.5 right-2.5 rounded-md bg-white/92 px-2 py-0.5 text-[11px] font-bold text-mint-deep">
                    {badge}
                </span>

                {/* Hover rail: only where there is a pointer, above the stretched title link. */}
                <div className="absolute inset-x-0 bottom-2.5 z-10 hidden justify-center [@media(hover:hover)]:flex">
                    <span className="flex gap-1 rounded-full bg-white p-1 shadow-[0_6px_16px_-6px_rgb(0_0_0/0.3)] opacity-0 translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0 focus-within:opacity-100 focus-within:translate-y-0">
                        <Link
                            href={href}
                            aria-label={`عرض ${product.name}`}
                            className="grid h-8 w-8 place-items-center rounded-full text-ink hover:bg-cream transition-colors"
                        >
                            <Icon name="view" size={16} />
                        </Link>
                        <a
                            href={whatsappLink(`أريد الاستفسار عن ${product.name} من موكيت ومفروشات السريع`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`اسأل عن ${product.name} على واتساب`}
                            className="grid h-8 w-8 place-items-center rounded-full bg-mint-deep text-white hover:bg-ink transition-colors"
                        >
                            <WhatsAppIcon className="h-4 w-4" />
                        </a>
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col px-2.5 pt-3 pb-3.5 text-center md:p-4">
                <Title className="font-sans text-[14.5px] md:text-base font-semibold leading-[1.45] text-ink min-h-[42px] md:min-h-0 line-clamp-2">
                    <Link
                        href={href}
                        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-mint-deep"
                    >
                        {product.name}
                    </Link>
                </Title>
                <p className="mt-auto pt-1 text-[12.5px] md:text-[13.5px] font-bold text-mint-deep">
                    اسأل عن السعر
                    <small className="block text-[11.5px] font-normal text-ink-muted">معاينة وقياس مجاناً</small>
                </p>
            </div>
        </article>
    );
}
