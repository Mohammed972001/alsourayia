'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

/**
 * SEO Content Section
 * 
 * This component provides rich, keyword-optimized content for better SEO.
 * Google values pages with substantial text content, internal links, and clear structure.
 */
export function SEOContent() {
    return (
        <section className="py-16 bg-gradient-to-b from-white to-[#F8FAFC]">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Main SEO Heading */}
                    <h2 className="text-2xl md:text-3xl text-[#1A1A1A] mb-6 text-center">
                        لماذا <span className="text-[#0088FF]">موكيت ومفروشات السريع</span> الخيار الأول في الرياض؟
                    </h2>

                    {/* Rich Text Content - Important for SEO */}
                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <p>
                            تُعد <strong>موكيت ومفروشات السريع</strong> من الشركات الرائدة في مجال توفير{' '}
                            <Link href="#products" className="text-[#0088FF] hover:underline">الموكيت والسجاد والمفروشات</Link>{' '}
                            في <strong>الرياض</strong> والمملكة العربية السعودية. نقدم تشكيلة واسعة ومتنوعة من{' '}
                            <strong>الأرضيات</strong> عالية الجودة تشمل <strong>موكيت المساجد</strong>،{' '}
                            <strong>الأرضيات المكتبية</strong>، <strong>الباركيه</strong>، و<strong>العشب الصناعي</strong>.
                        </p>

                        <p>
                            نحن في <strong>السريع للمفروشات</strong> نؤمن بأن الأرضيات هي أساس جمال أي مساحة.
                            لذلك نحرص على توفير أجود الخامات من أفضل المصانع العالمية والتركية.
                            سواء كنت تبحث عن <Link href="#products" className="text-[#0088FF] hover:underline">موكيت فاخر</Link> لمنزلك،
                            أو <strong>أرضيات احترافية</strong> لمكتبك، أو <strong>موكيت مساجد</strong> بتصاميم إسلامية راقية،
                            ستجد لدينا ما يلبي احتياجاتك.
                        </p>

                        {/* Internal Links Grid - Important for SEO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">🕌 موكيت مساجد</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    موكيت مساجد عالي الجودة بتصاميم إسلامية فاخرة، مقاوم للحريق ومعالج ضد البكتيريا.
                                    توصيل وتركيب مجاني لجميع مناطق الرياض.
                                </p>
                                <Link href="#products" className="text-[#0088FF] text-sm hover:underline">
                                    اكتشف موكيت المساجد ←
                                </Link>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">🏢 أرضيات مكتبية</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    أرضيات مكتبية احترافية تناسب بيئات العمل الحديثة. سهلة التنظيف ومقاومة للخدوش
                                    مع تشكيلة واسعة من الألوان والتصاميم.
                                </p>
                                <Link href="#products" className="text-[#0088FF] text-sm hover:underline">
                                    تصفح الأرضيات المكتبية ←
                                </Link>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">🪵 باركيه فاخر</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    باركيه ضد الماء بجودة ألمانية. مناسب للمنازل والفلل والشقق الفاخرة.
                                    ضمان يصل إلى 25 سنة على المنتج.
                                </p>
                                <Link href="#products" className="text-[#0088FF] text-sm hover:underline">
                                    شاهد تشكيلة الباركيه ←
                                </Link>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">🌿 عشب صناعي</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    عشب صناعي عالي الكثافة للحدائق والملاعب والمساحات الخارجية.
                                    مقاوم للأشعة فوق البنفسجية ولا يحتاج صيانة.
                                </p>
                                <Link href="#products" className="text-[#0088FF] text-sm hover:underline">
                                    استكشف العشب الصناعي ←
                                </Link>
                            </div>
                        </div>

                        <p>
                            نتميز في <strong>موكيت السريع</strong> بتقديم خدمات متكاملة تشمل:{' '}
                            <strong>الاستشارة المجانية</strong>، <strong>المعاينة والقياس</strong>،{' '}
                            <strong>التوصيل المجاني داخل الرياض</strong>، و<strong>التركيب الاحترافي</strong>{' '}
                            بواسطة فريق متخصص. كما نوفر <strong>ضمان شامل</strong> على جميع منتجاتنا.
                        </p>

                        <p>
                            نخدم جميع أحياء <strong>الرياض</strong> ومناطق المملكة الرئيسية:{' '}
                            <strong>جدة</strong>، <strong>الدمام</strong>، <strong>مكة المكرمة</strong>،{' '}
                            <strong>المدينة المنورة</strong>، وغيرها. تواصل معنا الآن عبر{' '}
                            <Link href="#contact" className="text-[#0088FF] hover:underline">الواتساب أو الهاتف</Link>{' '}
                            للحصول على عرض سعر مجاني.
                        </p>
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 mt-10"
                    >
                        <Link
                            href="#products"
                            className="px-8 py-4 bg-[#0088FF] text-white rounded-xl hover:bg-[#005CB8] transition-colors shadow-lg"
                        >
                            تصفح جميع المنتجات
                        </Link>
                        <a
                            href="https://wa.me/966541540047?text=السلام عليكم، أريد الاستفسار عن منتجاتكم"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-colors shadow-lg"
                        >
                            تواصل عبر واتساب
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
