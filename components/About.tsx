'use client';

import { motion } from 'motion/react';
import { Award, Palette, HeadphonesIcon } from 'lucide-react';
import Link from 'next/link';

export function About() {
    const features = [
        {
            icon: Award,
            title: 'جودة استثنائية',
            description: 'نستخدم أفضل المواد والخامات لضمان موكيت وسجاد يدوم طويلاً',
        },
        {
            icon: Palette,
            title: 'تصاميم مبتكرة',
            description: 'تشكيلة واسعة من تصاميم الموكيت والمفروشات العصرية والكلاسيكية',
        },
        {
            icon: HeadphonesIcon,
            title: 'خدمة عملاء متميزة',
            description: 'فريقنا متاح دائماً لمساعدتك في اختيار الموكيت والأرضيات المناسبة',
        },
    ];

    return (
        <section id="about" className="py-20 bg-gradient-to-b from-white to-[#E8D7C3]/10">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-[#0088FF]/10 text-[#0088FF] rounded-full mb-4">
                        من نحن
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
                        رواد التميز في عالم <span className="text-[#0088FF]">السجاد والمفروشات</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        <strong>موكيت ومفروشات السريع</strong> هي وجهتك المثالية للحصول على أرقى أنواع{' '}
                        <Link href="#products" className="text-[#0088FF] hover:underline">السجاد والموكيت والمفروشات</Link>
                        {' '}في <strong>الرياض</strong> والمملكة العربية السعودية.
                        نجمع بين الحرفية التقليدية والتصميمات العصرية لنقدم لك تجربة فريدة من نوعها.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="text-center group"
                        >
                            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#0088FF] to-[#005CB8] text-white shadow-lg group-hover:shadow-xl transition-all">
                                <feature.icon size={36} />
                            </div>
                            <h3 className="text-xl md:text-2xl text-[#1A1A1A] mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {[
                        { number: '15+', label: 'سنة من الخبرة' },
                        { number: '5000+', label: 'عميل راضٍ في الرياض' },
                        { number: '10000+', label: 'مشروع مكتمل' },
                        { number: '100%', label: 'ضمان الجودة' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="text-3xl md:text-4xl text-[#0088FF] mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section with Internal Links */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-lg text-gray-600 mb-6">
                        تعرف على المزيد عن{' '}
                        <Link href="#products" className="text-[#0088FF] hover:underline font-medium">
                            منتجات موكيت وسجاد ومفروشات السريع
                        </Link>
                        {' '}أو{' '}
                        <Link href="#contact" className="text-[#0088FF] hover:underline font-medium">
                            تواصل معنا
                        </Link>
                        {' '}للحصول على استشارة مجانية.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="#products"
                            className="px-8 py-4 bg-[#0088FF] text-white rounded-xl hover:bg-[#005CB8] transition-colors shadow-lg hover:shadow-xl"
                        >
                            تصفح تشكيلة الموكيت والسجاد
                        </Link>
                        <Link
                            href="#contact"
                            className="px-8 py-4 bg-white border-2 border-[#0088FF] text-[#0088FF] rounded-xl hover:bg-[#0088FF]/5 transition-colors"
                        >
                            احصل على استشارة مجانية
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
