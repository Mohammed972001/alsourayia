import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { ServiceAreas } from '@/components/ServiceAreas';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    title: 'مناطق الخدمة | موكيت ومفروشات السريع الرياض',
    description: 'موكيت ومفروشات السريع يخدم جميع أحياء ومناطق الرياض: النرجس، حطين، العليا، الملقا، الغدير، الروضة وجميع أنحاء المملكة العربية السعودية. خدمة توصيل وتركيب موكيت في الرياض.',
    keywords: 'مناطق خدمة موكيت الرياض, تركيب موكيت الرياض, توصيل موكيت الرياض, موكيت حطين, موكيت النرجس, موكيت العليا',
    alternates: {
        canonical: `${baseUrl}/service-areas`,
    },
    openGraph: {
        title: 'مناطق الخدمة | موكيت ومفروشات السريع الرياض',
        description: 'نخدم جميع أحياء ومناطق الرياض. خدمة توصيل وتركيب موكيت احترافية في جميع أنحاء المملكة العربية السعودية.',
        locale: 'ar_SA',
        type: 'website',
        url: `${baseUrl}/service-areas`,
    },
};

export default function ServiceAreasPage() {
    const breadcrumb = [
        { label: 'الرئيسية', href: '/' },
        { label: 'مناطق الخدمة' },
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <div className="pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-4">
                    <Breadcrumb items={breadcrumb} />
                </div>
                <ServiceAreas />
            </div>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
