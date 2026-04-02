import dynamic from 'next/dynamic';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { SEOContent } from '@/components/SEOContent';
import { ProductGallery } from '@/components/ProductGallery';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';

const ServiceAreas = dynamic(() => import('@/components/ServiceAreas').then(m => ({ default: m.ServiceAreas })));
const Testimonials = dynamic(() => import('@/components/Testimonials').then(m => ({ default: m.Testimonials })));
const FAQ = dynamic(() => import('@/components/FAQ').then(m => ({ default: m.FAQ })));
const Contact = dynamic(() => import('@/components/Contact').then(m => ({ default: m.Contact })));

export default function Home() {
    const homeBreadcrumb = [{ label: 'الرئيسية' }];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <div className="sr-only">
                <Breadcrumb items={homeBreadcrumb} />
            </div>
            <main>
                <Hero />
                <About />
                <SEOContent />
                <ProductGallery />
                <ServiceAreas />
                <Testimonials />
                <FAQ />
                <Contact />
            </main>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
