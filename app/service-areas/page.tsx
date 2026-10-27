import { Metadata } from 'next';
import { Icon } from '@/components/icons/Icon';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HelpBand } from '@/components/HelpBand';
import { PageView } from '@/components/motion/PageView';
import { HeadingWords } from '@/components/motion/HeadingWords';
import { ADDRESS, MAPS_URL } from '@/lib/contact';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    title: 'توصيل لكل مدن المملكة: موكيت وأرضيات',
    description: 'موكيت ومفروشات السريع يوصّل الموكيت والباركيه وارضيات المطاط من الرياض إلى كل مدن المملكة. في الرياض: معاينة وقياس مجاناً وتوريد وتركيب. اطلب عرض السعر.',
    keywords: 'توصيل موكيت المملكة, موكيت الرياض, تركيب موكيت الرياض, توصيل باركيه, توصيل ارضيات مطاط',
    alternates: {
        canonical: `${baseUrl}/service-areas`,
    },
    openGraph: {
        title: 'توصيل لكل مدن المملكة: موكيت وأرضيات | موكيت ومفروشات السريع',
        description: 'المعرض في الرياض، والتوصيل إلى كل مدن المملكة. معاينة وقياس مجاناً في الرياض، وتوريد وتركيب.',
        locale: 'ar_SA',
        type: 'website',
        url: `${baseUrl}/service-areas`,
    },
};

// Cities named only as delivery destinations: the shop has one showroom (Riyadh) and the owner
// confirmed delivery to every city of the Kingdom, nothing about branches or crews elsewhere.
const cities = ['الرياض', 'جدة', 'الدمام', 'الخبر', 'مكة المكرمة', 'المدينة المنورة', 'القصيم', 'الطائف', 'أبها', 'تبوك', 'حائل', 'الأحساء'];

const steps = [
    { title: 'في الرياض', text: 'معاينة وقياس مجاناً في مكانك، وعينة مجانية قبل الطلب، ثم عرض السعر على الواتساب، ثم التوريد والتركيب.' },
    { title: 'خارج الرياض', text: 'أرسل مقاسات المكان وصوره على الواتساب، ونرسل لك عرض السعر، ونوصّل الطلب إلى مدينتك.' },
    { title: 'المعرض', text: `${ADDRESS}، يومياً من 9 صباحاً حتى 10 مساءً.` },
];

export default function ServiceAreasPage() {
    const breadcrumb = [
        { label: 'الرئيسية', href: '/' },
        { label: 'مناطق الخدمة' },
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <PageView>
                <div className="pt-[var(--header-full)]">
                    <div className="container mx-auto px-4 lg:px-8 py-4">
                        <Breadcrumb items={breadcrumb} />
                    </div>
                    <main className="container mx-auto px-4 lg:px-8 pb-16">
                        <header className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
                            <span className="inline-flex items-center gap-2 text-[13px] md:text-sm font-bold mb-3 text-mint-deep">
                                <span aria-hidden className="w-[18px] h-0.5 rounded-full bg-brass" />
                                مناطق الخدمة
                            </span>
                            <h1 className="font-display text-[1.7rem] leading-[1.35] md:text-4xl lg:text-[2.75rem] font-semibold text-ink">
                                توصيل الموكيت والباركيه وأرضيات المطاط إلى كل مدن المملكة
                            </h1>
                            <span className="rule-brass mx-auto mt-4" />
                            <p className="mt-4 text-ink-muted text-[0.95rem] md:text-lg leading-relaxed">
                                معرضنا في الرياض، وطلبك يصل إلى أي مدينة في المملكة. في الرياض نبدأ بمعاينة وقياس مجاناً في مكانك،
                                ومن خارجها تكفي المقاسات والصور على الواتساب.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto mb-12 md:mb-16">
                            {steps.map((step, i) => (
                                <div
                                    key={step.title}
                                    data-reveal
                                    style={{ '--i': i } as CSSProperties}
                                    className="p-5 md:p-8 rounded-2xl bg-cream border border-line"
                                >
                                    <h2 className="font-display text-lg md:text-xl font-semibold text-ink mb-2">{step.title}</h2>
                                    <p className="text-ink-soft leading-relaxed text-sm md:text-base">{step.text}</p>
                                </div>
                            ))}
                        </div>

                        <section aria-labelledby="cities" className="max-w-5xl mx-auto">
                            <h2 id="cities" className="font-display text-2xl font-semibold text-ink mb-6 text-center" data-reveal="words">
                                <HeadingWords lines={['من المدن التي نوصّل إليها']} />
                            </h2>
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                                {cities.map((city, i) => (
                                    <li
                                        key={city}
                                        data-reveal="zoom"
                                        style={{ '--i': i } as CSSProperties}
                                        className="flex items-center gap-2 p-4 rounded-2xl border border-line bg-white"
                                    >
                                        {i === 0 ? <Icon name="location" size={20} className="text-brass shrink-0" /> : <Icon name="delivery" size={20} className="text-brass shrink-0" />}
                                        <span className="font-display text-base md:text-lg font-semibold text-ink">{city}</span>
                                        {i === 0 && <span className="ms-auto rounded-full bg-brass text-ink text-[10px] font-bold px-2.5 py-1">المعرض</span>}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-ink-muted text-sm leading-relaxed mt-6 text-center" data-reveal="fade">
                                مدينتك ليست في القائمة؟ نوصّل إلى كل مدن المملكة؛ أرسل اسم المدينة مع المقاسات على الواتساب.
                                موقع المعرض على{' '}
                                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-brass underline-offset-4 hover:no-underline">
                                    خرائط قوقل
                                </a>
                                ، وكل المنتجات في{' '}
                                <Link href="/products" className="text-ink underline decoration-brass underline-offset-4 hover:no-underline">
                                    صفحة المنتجات
                                </Link>
                                .
                            </p>
                        </section>
                    </main>
                </div>
                <HelpBand question="مدينتك خارج الرياض؟ ابعت المقاس والصورة" />
            </PageView>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
