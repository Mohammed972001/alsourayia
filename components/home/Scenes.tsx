import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from '@/components/AppLink';
import { SectionHeading } from '@/components/SectionHeading';
import { getProductById } from '@/lib/products';
import { isStockImage } from '@/data/stock-images';

type Spot = { id: string; x: number; y: number };

/** Photos with points on the floor; x and y are percentages of the card, and each point opens its product. */
const rooms: { label: string; image: string; spots: Spot[] }[] = [
    { label: 'مسجد', image: '/msaged/WhatsApp Image 2026-10-25 at 9.31.16 PM.webp', spots: [{ id: 'mosque-carpets', x: 50, y: 72 }] },
    { label: 'صالة رياضية', image: '/Rabal-GEM/WhatsApp Image 2026-10-25 at 9.30.07 PM (1).webp', spots: [{ id: 'rabal-gem', x: 50, y: 72 }] },
    { label: 'مكتب', image: '/mokeet makteb/WhatsApp Image 2026-10-25 at 9.29.42 PM (3).webp', spots: [{ id: 'office-carpet', x: 50, y: 74 }] },
    { label: 'غرفة جلوس', image: '/stock/mokite/carpeted-living-room.webp', spots: [{ id: 'mokite', x: 50, y: 78 }] },
    { label: 'غرفة نوم', image: '/stock/parket/light-oak-bedroom.webp', spots: [{ id: 'parket', x: 50, y: 80 }] },
];

/** Server component: plain links over photos, no script. */
export function Scenes() {
    return (
        <section aria-label="المنتجات في مكانها" className="py-14 md:py-20 overflow-hidden">
            <div className="container mx-auto px-5 lg:px-8">
                <SectionHeading eyebrow="في كل مساحة" title="شاهد الأرضية في مكانها" description="اضغط على النقطة لتفتح المنتج." />
                <ul className="no-scrollbar flex snap-x gap-3 overflow-x-auto md:gap-6">
                    {rooms.map((room, i) => (
                        <li key={room.label} data-reveal style={{ '--i': i } as CSSProperties} className="relative h-[400px] w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl bg-cream md:h-[520px] md:w-[400px]">
                            <Image src={room.image} alt="" fill sizes="(min-width: 768px) 400px, 78vw" className="object-cover" />
                            <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 to-transparent" />
                            <p className="absolute bottom-4 right-4 font-display text-base font-bold text-white md:text-xl">{room.label}</p>
                            {isStockImage(room.image) && <p className="absolute bottom-4 left-4 text-[11px] text-white/80">صورة توضيحية</p>}
                            {room.spots.map((spot) => {
                                const product = getProductById(spot.id);
                                if (!product) return null;
                                return (
                                    <Link
                                        key={spot.id}
                                        href={`/products/${spot.id}`}
                                        aria-label={product.name}
                                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                                        className="group/spot absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                                    >
                                        <span aria-hidden className="h-4 w-4 rounded-full bg-white shadow-[0_0_0_6px_rgb(255_255_255/0.45)] transition-shadow group-hover/spot:shadow-[0_0_0_10px_rgb(255_255_255/0.35)]" />
                                        <span aria-hidden className="pointer-events-none absolute bottom-full mb-1 hidden whitespace-nowrap rounded-lg bg-white px-3 py-1 text-sm font-semibold text-ink shadow group-hover/spot:block group-focus-visible/spot:block">
                                            {product.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
