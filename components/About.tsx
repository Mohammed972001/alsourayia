'use client';

import Link from 'next/link';

export function About() {
    const stats = [
        { number: '15+', label: 'سنة من الخبرة' },
        { number: '5000+', label: 'عميل راضٍ' },
        { number: '10000+', label: 'مشروع مكتمل' },
        { number: '100%', label: 'ضمان الجودة' },
    ];

    return (
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl text-[#1A1A1A] mb-6">
                        رواد التميز في عالم السجاد والمفروشات
                    </h2>
                    <p className="text-[#4A4A4A] leading-relaxed text-lg">
                        <strong>موكيت ومفروشات السريع</strong> هي وجهتك المثالية للحصول على أرقى أنواع{' '}
                        <Link href="#products" className="text-[#1A1A1A] underline underline-offset-4 hover:no-underline">
                            السجاد والموكيت والمفروشات
                        </Link>{' '}
                        في الرياض والمملكة العربية السعودية.
                        نجمع بين الحرفية التقليدية والتصميمات العصرية لنقدم لك تجربة فريدة.
                    </p>
                </div>

                {/* Features - text only, no icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 mb-20">
                    {[
                        { title: 'جودة استثنائية', desc: 'نستخدم أفضل المواد والخامات لضمان موكيت وسجاد يدوم طويلاً' },
                        { title: 'تصاميم مبتكرة', desc: 'تشكيلة واسعة من تصاميم الموكيت والمفروشات العصرية والكلاسيكية' },
                        { title: 'خدمة عملاء متميزة', desc: 'فريقنا متاح دائماً لمساعدتك في اختيار الموكيت والأرضيات المناسبة' },
                    ].map((feature) => (
                        <div key={feature.title} className="text-center">
                            <h3 className="text-lg text-[#1A1A1A] mb-3">{feature.title}</h3>
                            <p className="text-[#6B7280] leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="border-t border-gray-100 pt-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl md:text-4xl text-[#1A1A1A] mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-[#6B7280] text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
