import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    title: 'تواصل معنا | موكيت ومفروشات السريع',
    description: 'تواصل مع موكيت ومفروشات السريع في الرياض. اتصل بنا على 966541540047+ أو راسلنا عبر واتساب للاستفسار عن الموكيت والسجاد والمفروشات وطلب الزيارة المنزلية.',
    keywords: 'تواصل موكيت السريع, رقم موكيت الرياض, واتساب موكيت السريع, اتصل موكيت مفروشات',
    alternates: {
        canonical: `${baseUrl}/contact`,
    },
    openGraph: {
        title: 'تواصل معنا | موكيت ومفروشات السريع',
        description: 'تواصل مع موكيت ومفروشات السريع في الرياض. اتصل بنا أو راسلنا عبر واتساب للاستفسار وطلب الزيارة المنزلية.',
        locale: 'ar_SA',
        type: 'website',
        url: `${baseUrl}/contact`,
    },
};

export default function ContactPage() {
    const breadcrumb = [
        { label: 'الرئيسية', href: '/' },
        { label: 'تواصل معنا' },
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <div className="pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-4">
                    <Breadcrumb items={breadcrumb} />
                </div>
                <Contact />
            </div>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
