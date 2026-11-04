import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from '@/components/AppLink';
import { SectionHeading } from '@/components/SectionHeading';
import { catalogGroups } from '@/data/catalogs';

const FEATURED = ['keyone-sfl', 'keyone-smooth', 'keyone-spc', 'polyflor-xl-pu'];
const all = catalogGroups.flatMap((group) => group.items);
const featured = FEATURED.map((slug) => all.find((c) => c.slug === slug)!);

export function HomeCatalogs() {
    return (
        <section aria-label="الكتالوجات" className="py-14 md:py-20 bg-cream">
            <div className="container mx-auto px-5 lg:px-8">
                <SectionHeading eyebrow="الكتالوجات" title="تصفح كتالوجاتنا" />
                <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
                    {featured.map((catalog, i) => (
                        <li key={catalog.slug} data-reveal style={{ '--i': i } as CSSProperties} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
                            <div className="relative aspect-[4/5] bg-cream">
                                <Image src={`/catalogs/covers/${catalog.slug}.webp`} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col gap-3 p-3 lg:p-4">
                                <h3 className="flex-1 text-sm font-semibold text-ink lg:text-base">{catalog.title}</h3>
                                <a href={`/catalogs/${catalog.slug}-v1.pdf`} download className="press rounded-lg border border-ink py-2 text-center text-sm text-ink hover:bg-ink hover:text-white">
                                    حمّل الكتالوج<span className="sr-only"> {catalog.title}</span>
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-6 text-center">
                    <Link href="/catalogs" className="text-sm font-semibold text-mint-deep hover:underline md:text-base">كل الكتالوجات</Link>
                </div>
            </div>
        </section>
    );
}
