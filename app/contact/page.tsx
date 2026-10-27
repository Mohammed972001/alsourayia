import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HelpBand } from '@/components/HelpBand';
import { PageView } from '@/components/motion/PageView';
import { PHONE_DISPLAY, PHONE2_DISPLAY } from '@/lib/contact';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    title: 'اتصل أو واتساب: موكيت وأرضيات الرياض',
    description: `موكيت ومفروشات السريع في الرياض: اتصل على ${PHONE_DISPLAY} أو ${PHONE2_DISPLAY} أو راسلنا على واتساب يومياً من 9 صباحاً حتى 10 مساءً لطلب معاينة وقياس مجاناً وعرض السعر.`,
    keywords: 'تواصل موكيت السريع, رقم موكيت الرياض, واتساب موكيت السريع, اتصل موكيت مفروشات',
    alternates: {
        canonical: `${baseUrl}/contact`,
    },
    openGraph: {
        title: 'اتصل أو واتساب: موكيت وأرضيات الرياض | موكيت ومفروشات السريع',
        description: 'اتصل بنا أو راسلنا على واتساب يومياً من 9 صباحاً حتى 10 مساءً لطلب معاينة وقياس مجاناً وعرض السعر.',
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
            <PageView>
                <div className="pt-[var(--header-full)]">
                    <div className="container mx-auto px-4 lg:px-8 py-4">
                        <Breadcrumb items={breadcrumb} />
                    </div>
                    <Contact headingAs="h1" />
                </div>
                <HelpBand question="تفضّل الواتساب؟ ابعت المقاس والصورة" />
            </PageView>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
