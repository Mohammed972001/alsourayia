import { Metadata } from 'next';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageView } from '@/components/motion/PageView';
import { catalogGroups } from '@/data/catalogs';
import { whatsappLink } from '@/lib/contact';
import { DEFAULT_OG_IMAGE } from '@/lib/og';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    title: 'كتالوجات الأرضيات والموكيت',
    description: 'كتالوجات موكيت المربعات والفينيل الطبي وأرضيات الفوم وSPC واللامينيت، للعرض والتحميل. اختر التصميم وأرسل لنا اسمه لنرسل عرض السعر.',
    alternates: { canonical: `${baseUrl}/catalogs` },
    openGraph: {
        title: 'كتالوجات الأرضيات والموكيت | موكيت ومفروشات السريع',
        description: 'كتالوجات موكيت المربعات والفينيل الطبي وأرضيات الفوم وSPC واللامينيت، للعرض والتحميل. اختر التصميم وأرسل لنا اسمه لنرسل عرض السعر.',
        locale: 'ar_SA',
        type: 'website',
        url: `${baseUrl}/catalogs`,
        images: [DEFAULT_OG_IMAGE],
    },
};

export default function CatalogsPage() {
    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <PageView>
            <main className="pt-[var(--header-full)] pb-16">
                <div className="container mx-auto px-4 lg:px-8 py-4">
                    <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'الكتالوجات' }]} />
                    <h1 className="text-2xl md:text-3xl text-[#1A1A1A] mt-4 mb-3">كتالوجات الأرضيات والموكيت</h1>
                    <p className="text-[#4A4A4A] mb-10 leading-relaxed max-w-3xl">
                        افتح الكتالوج أو حمّله، ثم أرسل لنا اسم التصميم ومساحة المكان لنرسل عرض السعر.
                    </p>
                    {catalogGroups.map((group) => (
                        <section key={group.title} className="mb-12">
                            <h2 className="text-xl text-[#1A1A1A] mb-5">{group.title}</h2>
                            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                {group.items.map((catalog) => {
                                    const file = `/catalogs/${catalog.slug}-v1.pdf`;
                                    return (
                                        <li key={catalog.slug} className="flex flex-col overflow-hidden rounded-lg border border-[#E5E7EB] bg-white">
                                            <div className="relative aspect-[3/4] bg-[#F9FAFB]">
                                                <Image src={`/catalogs/covers/${catalog.slug}.webp`} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
                                            </div>
                                            <div className="flex flex-1 flex-col gap-2 p-3 lg:p-4">
                                                <h3 className="text-sm lg:text-base font-semibold text-[#1A1A1A]">{catalog.title}</h3>
                                                <p className="flex-1 text-xs lg:text-sm text-[#4A4A4A]">{catalog.description}</p>
                                                <div className="mt-2 flex gap-2 text-sm">
                                                    <a href={file} target="_blank" rel="noopener" className="flex-1 rounded-md bg-[#1A1A1A] py-2 text-center text-white">
                                                        عرض<span className="sr-only"> {catalog.title}</span>
                                                    </a>
                                                    <a href={file} download className="flex-1 rounded-md border border-[#1A1A1A] py-2 text-center text-[#1A1A1A]">
                                                        تحميل<span className="sr-only"> {catalog.title}</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    ))}
                    <a href={whatsappLink('السلام عليكم، أريد عرض سعر لتصميم من الكتالوج')} className="inline-block rounded-md bg-[#1A1A1A] px-6 py-3 text-white">
                        اطلب عرض سعر على الواتساب
                    </a>
                </div>
            </main>
            </PageView>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
