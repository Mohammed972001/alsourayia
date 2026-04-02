'use client';

import Link from 'next/link';

export function SEOContent() {
    return (
        <section className="py-20 bg-[#F9FAFB]">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl text-[#1A1A1A] mb-8 text-center">
                        لماذا موكيت ومفروشات السريع الخيار الأول في الرياض؟
                    </h2>

                    <div className="prose prose-lg max-w-none text-[#4A4A4A] space-y-6">
                        <p>
                            تُعد <strong>موكيت ومفروشات السريع</strong> من الشركات الرائدة في مجال توفير{' '}
                            <Link href="#products" className="text-[#1A1A1A] underline underline-offset-4">الموكيت والسجاد والمفروشات</Link>{' '}
                            في <strong>الرياض</strong> والمملكة العربية السعودية. نقدم تشكيلة واسعة ومتنوعة من{' '}
                            <strong>الأرضيات</strong> عالية الجودة تشمل <strong>موكيت المساجد</strong>،{' '}
                            <strong>الأرضيات المكتبية</strong>، <strong>الباركيه</strong>، و<strong>العشب الصناعي</strong>.
                        </p>

                        <p>
                            نحن في <strong>السريع للمفروشات</strong> نؤمن بأن الأرضيات هي أساس جمال أي مساحة.
                            لذلك نحرص على توفير أجود الخامات من أفضل المصانع العالمية والتركية.
                            سواء كنت تبحث عن <Link href="#products" className="text-[#1A1A1A] underline underline-offset-4">موكيت فاخر</Link> لمنزلك،
                            أو <strong>أرضيات احترافية</strong> لمكتبك، أو <strong>موكيت مساجد</strong> بتصاميم إسلامية راقية،
                            ستجد لدينا ما يلبي احتياجاتك.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 not-prose">
                            {[
                                { title: 'موكيت مساجد', desc: 'موكيت مساجد عالي الجودة بتصاميم إسلامية فاخرة، مقاوم للحريق ومعالج ضد البكتيريا. توصيل وتركيب مجاني لجميع مناطق الرياض.' },
                                { title: 'أرضيات مكتبية', desc: 'أرضيات مكتبية احترافية تناسب بيئات العمل الحديثة. سهلة التنظيف ومقاومة للخدوش مع تشكيلة واسعة من الألوان.' },
                                { title: 'باركيه فاخر', desc: 'باركيه ضد الماء بجودة ألمانية. مناسب للمنازل والفلل والشقق الفاخرة. ضمان يصل إلى 25 سنة.' },
                                { title: 'عشب صناعي', desc: 'عشب صناعي عالي الكثافة للحدائق والملاعب والمساحات الخارجية. مقاوم للأشعة فوق البنفسجية.' },
                            ].map((card) => (
                                <div key={card.title} className="p-6 bg-white rounded-lg border border-gray-100">
                                    <h3 className="text-base font-semibold text-[#1A1A1A] mb-2">{card.title}</h3>
                                    <p className="text-[#6B7280] text-sm leading-relaxed">{card.desc}</p>
                                    <Link href="#products" className="text-[#1A1A1A] text-sm mt-3 inline-block underline underline-offset-4">
                                        عرض المنتجات
                                    </Link>
                                </div>
                            ))}
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
                            <Link href="#contact" className="text-[#1A1A1A] underline underline-offset-4">الواتساب أو الهاتف</Link>{' '}
                            للحصول على عرض سعر مجاني.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
