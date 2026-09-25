import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Ruler, Wrench } from 'lucide-react';
import { products } from '@/lib/products';
import { whatsappLink } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

const TRUST = [
    { icon: Ruler, label: 'معاينة وقياس مجاناً' },
    { icon: Wrench, label: 'تركيب احترافي' },
];

/** Server component: this is the LCP block, so it ships no JS. */
export function Hero() {
    return (
        <>
            <section
                id="home"
                className="relative min-h-[88svh] md:min-h-[100svh] flex items-end md:items-center overflow-hidden bg-ink"
            >
                {/* Background — slow settle-in zoom */}
                <div className="absolute inset-0 animate-hero-zoom">
                    <Image
                        src="/heroBG.jpeg"
                        alt="موكيت ومفروشات السريع - أفضل موكيت وسجاد ومفروشات فاخرة في الرياض والمملكة العربية السعودية"
                        fill
                        priority
                        quality={85}
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink from-10% via-ink/80 md:via-ink/60 via-55% to-ink/35" />
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/60 to-transparent" />

                {/* Content */}
                <div className="relative z-10 container mx-auto px-5 lg:px-8 pt-28 pb-28 md:pb-36">
                    <div className="max-w-2xl">
                        <span
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5 text-xs md:text-sm text-white/90 animate-rise"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                            موكيت · سجاد · أرضيات — الرياض
                        </span>

                        <h1
                            className="font-display font-bold text-white mt-5 text-[2.6rem] leading-[1.2] md:text-6xl lg:text-7xl animate-rise"
                            style={{ animationDelay: '120ms' }}
                        >
                            موكيت ومفروشات
                            <span className="block text-brass">السُريع</span>
                        </h1>

                        <p
                            className="mt-5 text-base md:text-xl text-white/80 leading-relaxed max-w-xl animate-rise"
                            style={{ animationDelay: '240ms' }}
                        >
                            نحول مساحاتك إلى تحف فنية بأرقى السجاد والموكيت والأرضيات في الرياض
                        </p>

                        <div
                            className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap animate-rise"
                            style={{ animationDelay: '360ms' }}
                        >
                            <Link
                                href="#products"
                                className="press inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 sm:px-8 py-3.5 bg-white text-ink rounded-full font-bold text-sm hover:bg-brass-soft transition-colors"
                            >
                                تصفح المنتجات
                                <ArrowLeft size={16} />
                            </Link>
                            <a
                                href={whatsappLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="press inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 sm:px-8 py-3.5 border border-white/35 bg-white/5 backdrop-blur text-white rounded-full font-bold text-sm hover:bg-white/15 transition-colors"
                            >
                                <WhatsAppIcon className="w-4 h-4" />
                                تواصل معنا
                            </a>
                        </div>

                        <ul
                            className="mt-8 flex items-center gap-4 md:gap-6 border-t border-white/15 pt-5 animate-rise"
                            style={{ animationDelay: '480ms' }}
                        >
                            {TRUST.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-center gap-1.5 text-[11px] sm:text-sm text-white/75">
                                    <Icon size={15} className="text-brass shrink-0" />
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

/** Product shortcuts overlapping the hero edge — scrolls sideways on phones. */
function CategoryRail() {
    return (
        <div className="relative z-20 -mt-16 md:-mt-20">
            <div className="container mx-auto px-4 lg:px-8">
                <div
                    className="bg-white rounded-3xl shadow-[0_20px_50px_-20px_rgba(20,20,20,0.35)] ring-1 ring-line p-4 md:p-6"
                    data-reveal
                >
                    <div className="flex items-center justify-between mb-3 md:mb-4 px-1">
                        <h2 className="font-display text-lg md:text-xl font-semibold text-ink">تسوّق حسب القسم</h2>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-1 text-sm text-brass-deep font-medium hover:gap-2 transition-all"
                        >
                            عرض الكل
                            <ArrowLeft size={15} />
                        </Link>
                    </div>

                    <ul className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-1">
                        {products.map((product) => (
                            <li key={product.id} className="snap-start shrink-0 w-[118px] md:w-[150px]">
                                <Link href={`/products/${product.id}`} className="press group block text-center">
                                    <span className="relative block aspect-square rounded-2xl overflow-hidden bg-cream ring-1 ring-line">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="150px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </span>
                                    <span className="mt-2 block text-[13px] md:text-sm font-medium text-ink leading-snug line-clamp-2 group-hover:text-brass-deep transition-colors">
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
