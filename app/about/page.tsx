import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HelpBand } from '@/components/HelpBand';
import { PageView } from '@/components/motion/PageView';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    title: 'من نحن: موكيت وباركيه وربل في الرياض',
    description: 'موكيت ومفروشات السريع: معرض موكيت وباركيه وارضيات مطاط وفينيل في حراج بن قاسم بالرياض. معاينة وقياس مجاناً، وعينة قبل الطلب، وتوريد وتركيب لكل مدن المملكة.',
    keywords: 'من نحن السريع, موكيت ومفروشات السريع, معرض موكيت الرياض, مفروشات السريع الرياض, حراج بن قاسم موكيت',
    alternates: {
        canonical: `${baseUrl}/about`,
    },
    openGraph: {
        title: 'من نحن: موكيت وباركيه وربل في الرياض | موكيت ومفروشات السريع',
        description: 'معرض موكيت وباركيه وارضيات مطاط في حراج بن قاسم بالرياض: معاينة وقياس مجاناً، وعينة قبل الطلب، وتوريد وتركيب.',
        locale: 'ar_SA',
        type: 'website',
        url: `${baseUrl}/about`,
    },
};

export default function AboutPage() {
    const breadcrumb = [
        { label: 'الرئيسية', href: '/' },
        { label: 'من نحن' },
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <PageView>
                <div className="pt-20">
                    <div className="container mx-auto px-4 lg:px-8 py-4">
                        <Breadcrumb items={breadcrumb} />
                    </div>
                    <About headingAs="h1" />
                </div>
                <HelpBand />
            </PageView>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
