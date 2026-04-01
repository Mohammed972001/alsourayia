import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    title: 'من نحن | موكيت ومفروشات السريع',
    description: 'تعرف على موكيت ومفروشات السريع - رائدون في توفير أجود أنواع الموكيت والسجاد والمفروشات في الرياض منذ عام 2010. خبرة تمتد لأكثر من 15 عاماً في خدمة عملائنا بالمملكة العربية السعودية.',
    keywords: 'من نحن السريع, موكيت ومفروشات السريع, شركة موكيت الرياض, مفروشات السريع الرياض',
    alternates: {
        canonical: `${baseUrl}/about`,
    },
    openGraph: {
        title: 'من نحن | موكيت ومفروشات السريع',
        description: 'تعرف على موكيت ومفروشات السريع - رائدون في توفير أجود أنواع الموكيت والسجاد والمفروشات في الرياض منذ عام 2010.',
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
            <div className="pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-4">
                    <Breadcrumb items={breadcrumb} />
                </div>
                <About />
            </div>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
