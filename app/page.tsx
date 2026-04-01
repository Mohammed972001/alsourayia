import dynamic from 'next/dynamic';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ProductGallery } from '@/components/ProductGallery';
import { ServiceAreas } from '@/components/ServiceAreas';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SEOContent } from '@/components/SEOContent';

// Deferred — shows after 2s, no benefit to blocking initial render
const WelcomePopup = dynamic(
    () => import('@/components/WelcomePopup').then((m) => m.WelcomePopup),
    { ssr: false }
);

export default function Home() {
    const homeBreadcrumb = [{ label: 'الرئيسية' }];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            {/* Breadcrumb for Home - Hidden visually but good for SEO */}
            <div className="sr-only">
                <Breadcrumb items={homeBreadcrumb} />
            </div>
            <Hero />
            <About />
            <SEOContent />
            <ProductGallery />
            <ServiceAreas />
            <Testimonials />
            <FAQ />
            <Contact />
            <Footer />
            <WelcomePopup />
            <FloatingButtons />
        </div>
    );
}
