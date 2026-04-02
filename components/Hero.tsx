'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/heroBG.jpeg"
                    alt="موكيت ومفروشات السريع - أفضل موكيت وسجاد ومفروشات فاخرة في الرياض والمملكة العربية السعودية"
                    fill
                    priority
                    quality={85}
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                    موكيت ومفروشات السُريع
                </h1>
                <p className="text-lg md:text-xl text-white/85 mb-10 leading-relaxed">
                    نحول مساحاتك إلى تحف فنية بأرقى السجاد والموكيت والأرضيات في الرياض
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="#products"
                        className="px-8 py-3.5 bg-white text-[#1A1A1A] rounded-lg hover:bg-white/90 transition-colors text-sm"
                    >
                        تصفح المنتجات
                    </Link>
                    <a
                        href="https://wa.me/966541540047"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 border border-white/40 text-white rounded-lg hover:bg-white/10 transition-colors text-sm"
                    >
                        تواصل معنا
                    </a>
                </div>
            </div>
        </section>
    );
}
