import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { products } from '@/lib/products';
import { whatsappLink } from '@/lib/contact';
import { imageAlt } from '@/data/stock-images';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

/** Only owner-confirmed promises. */
const TRUST = ['معاينة وقياس مجاناً', 'عينة مجانية قبل الطلب', 'توريد وتركيب'];

/** The searched words first, the brand on its own accented line; both inside the one H1. */
const TITLE_LINE = 'موكيت وباركيه وأرضيات في الرياض';
const BRAND_LINE = 'موكيت ومفروشات السُريع';

/** Each word rises on its own, in reading order, without waiting for scripts (`.rise-in`). */
function RiseWords({ text, from }: { text: string; from: number }) {
    return text.split(' ').map((word, i) => (
        <span key={i}>
            <span className="rise-in inline-block" style={{ '--i': from + i * 0.5 } as CSSProperties}>
                {word}
            </span>{' '}
        </span>
    ));
}

const step = (n: number) => ({ '--i': n }) as CSSProperties;

/** Server component: this is the LCP block, so it ships no JS and nothing here waits for the observer. */
export function Hero() {
    const titleWords = TITLE_LINE.split(' ').length;

    return (
        <>
            <section
                id="home"
                className="relative min-h-[88svh] md:min-h-[100svh] flex items-end md:items-center overflow-hidden bg-ink"
            >
                {/* Background: slow settle-in zoom */}
                <div className="absolute inset-0 animate-hero-zoom">
                    <Image
                        src="/heroBG.jpeg"
                        alt="موكيت ومفروشات السريع في الرياض"
                        fill
                        priority
                        fetchPriority="high"
                        quality={75}
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink from-10% via-ink/80 md:via-ink/60 via-55% to-ink/35" />
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/60 to-transparent" />

                {/* Content */}
                <div className="relative z-10 container mx-auto px-5 lg:px-8 pt-36 pb-28 md:pt-40 md:pb-36">
                    <div className="max-w-2xl">
                        <span
                            className="rise-in inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5 text-xs md:text-sm text-white/90"
                            style={step(0)}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                            موكيت · باركيه · أرضيات مطاط — حراج بن قاسم، الرياض
                        </span>

                        <h1 className="font-display font-bold text-white mt-5 text-[2.2rem] leading-[1.25] md:text-6xl md:leading-[1.15] lg:text-7xl">
                            <RiseWords text={TITLE_LINE} from={1} />
                            {/* Keeps the two lines apart in the heading's text for search engines and readers. */}{' '}
                            <span className="block text-brass">
                                <RiseWords text={BRAND_LINE} from={1 + titleWords * 0.5} />
                            </span>
                        </h1>

                        <p
                            className="rise-in mt-5 text-base md:text-xl text-white/80 leading-relaxed max-w-xl"
                            style={step(5)}
                        >
                            موكيت مكاتب ومساجد، باركيه، فينيل وأرضيات مطاط، مع معاينة وقياس مجاناً وتوريد وتركيب في الرياض
                            وتوريد لكل مدن المملكة.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                            <Link
                                href="#products"
                                className="rise-in shine press inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 sm:px-8 py-3.5 bg-white text-ink rounded-xl font-bold text-sm md:text-[15px] hover:bg-mint-soft transition-colors"
                                style={step(6)}
                            >
                                تصفح المنتجات
                                <ArrowLeft size={16} />
                            </Link>
                            <a
                                href={whatsappLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rise-in press inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 sm:px-8 py-3.5 bg-whatsapp text-white rounded-xl font-bold text-sm md:text-[15px] hover:brightness-95 transition"
                                style={step(6.5)}
                            >
                                <WhatsAppIcon className="w-4 h-4" />
                                تواصل معنا
                            </a>
                        </div>

                        <ul className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-6 border-t border-white/15 pt-5">
                            {TRUST.map((label, i) => (
                                <li
                                    key={label}
                                    className="rise-in flex items-center gap-1.5 text-[11px] sm:text-sm text-white/75"
                                    style={step(7 + i * 0.5)}
                                >
                                    <Check size={15} strokeWidth={2.2} className="text-mint shrink-0" />
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Scroll cue (desktop) */}
                <div className="hidden md:flex absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-white/50 text-xs">
                    <span className="w-px h-10 bg-gradient-to-b from-transparent to-white/60 animate-scroll-cue" />
                </div>
            </section>

            <CategoryRail />
        </>
    );
}

/** Product shortcuts overlapping the hero edge; scrolls sideways on phones. Horse rubber is not stocked now. */
function CategoryRail() {
    const items = products.filter((product) => product.id !== 'horse-rubber');

    return (
        <div className="relative z-20 -mt-16 md:-mt-20">
            <div className="container mx-auto px-4 lg:px-8">
                <div
                    className="bg-white rounded-2xl shadow-[0_20px_50px_-20px_rgba(20,20,20,0.35)] ring-1 ring-line p-4 md:p-6"
                    data-reveal="clip"
                >
                    <div className="flex items-center justify-between mb-3 md:mb-4 px-1">
                        <h2 className="font-display text-lg md:text-xl font-semibold text-ink">تسوّق حسب القسم</h2>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-1 text-sm text-mint-deep font-bold hover:gap-2 transition-all"
                        >
                            عرض الكل
                            <ArrowLeft size={15} />
                        </Link>
                    </div>

                    <ul
                        className="tiles-in flex gap-3 md:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-1"
                        data-reveal="tiles"
                    >
                        {items.map((product, i) => (
                            <li key={product.id} className="snap-start shrink-0 w-[118px] md:w-[150px]" style={step(i)}>
                                <Link href={`/products/${product.id}`} className="lift press group block text-center rounded-xl">
                                    <span className="relative block aspect-square rounded-xl overflow-hidden bg-cream ring-1 ring-line">
                                        <Image
                                            src={product.image}
                                            alt={imageAlt(product.image, product.name)}
                                            fill
                                            sizes="150px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </span>
                                    <span className="mt-2 block text-[13px] md:text-sm font-medium text-ink leading-snug line-clamp-2 group-hover:text-mint-deep transition-colors">
                                        {product.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
