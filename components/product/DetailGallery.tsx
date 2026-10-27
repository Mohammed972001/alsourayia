'use client';

import { useState } from 'react';
import Image from 'next/image';

/** One picture, with alt and the «stock photo» flag already resolved on the server. */
export interface GalleryImage {
    src: string;
    alt: string;
    stock: boolean;
}

/**
 * The only interactive part of the product page: the big picture and the
 * thumbnail strip that swaps it. Everything else is server-rendered.
 */
export function DetailGallery({ images }: { images: GalleryImage[] }) {
    const [selected, setSelected] = useState(0);
    const current = images[selected] ?? images[0];

    return (
        <>
            {/* No reveal on this wrapper: on desktop it is the page's largest first-screen paint. */}
            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-3 aspect-[4/3]">
                <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    priority={selected === 0}
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                />
                {current.stock && (
                    <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[11px] text-white">
                        صورة توضيحية
                    </span>
                )}
            </div>

            {/* Thumbnails: one horizontal strip instead of a 6-column grid
                that stacked two rows above everything on a phone. */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1" data-reveal="fade">
                    {images.slice(0, 12).map((image, index) => (
                        <button
                            key={image.src}
                            type="button"
                            onClick={() => setSelected(index)}
                            className={`relative shrink-0 w-16 h-16 lg:w-20 lg:h-20 overflow-hidden rounded-md ${
                                selected === index ? 'ring-2 ring-[#1A1A1A]' : 'opacity-60 hover:opacity-100'
                            } transition-all`}
                            aria-label={`عرض ${image.alt}`}
                            aria-pressed={selected === index}
                        >
                            <Image src={image.src} alt={image.alt} fill sizes="80px" className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}
