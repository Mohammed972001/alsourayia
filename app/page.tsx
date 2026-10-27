import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/motion/Marquee';
import { PageView } from '@/components/motion/PageView';
import { Spaces } from '@/components/Spaces';
import { About } from '@/components/About';
import { Offers } from '@/components/Offers';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { HowWeWork } from '@/components/HowWeWork';
import { SEOContent } from '@/components/SEOContent';
import { HelpBand } from '@/components/HelpBand';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ADDRESS_SHORT, HOURS_SHORT, SERVICES } from '@/data/business';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    alternates: { canonical: baseUrl, languages: { 'ar-SA': baseUrl } },
};

// The tail of the page loads after the top; it is still rendered on the server.
const ServiceAreas = dynamic(() => import('@/components/ServiceAreas').then((m) => ({ default: m.ServiceAreas })));
const LeadForm = dynamic(() => import('@/components/LeadForm').then((m) => ({ default: m.LeadForm })));
const FAQ = dynamic(() => import('@/components/FAQ').then((m) => ({ default: m.FAQ })));
const Contact = dynamic(() => import('@/components/Contact').then((m) => ({ default: m.Contact })));

/** Only owner-confirmed points. */
const STRIP = [...SERVICES, HOURS_SHORT, ADDRESS_SHORT];

export default function Home() {
    const homeBreadcrumb = [{ label: 'الرئيسية' }];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <div className="sr-only">
                <Breadcrumb items={homeBreadcrumb} />
            </div>
            <PageView>
                <main>
                    <Hero />
                    <Marquee
                        items={STRIP}
                        label="ما نقدمه"
                        className="mt-10 md:mt-14 border-y border-line bg-cream py-3 md:py-4 text-ink"
                    />
                    <Spaces />
                    <About />
                    <Offers />
                    <FeaturedProducts />
                    <HowWeWork />
                    <SEOContent />
                    <ServiceAreas />
                    <LeadForm />
                    <FAQ />
                    <Contact />
                    <HelpBand />
                </main>
                <Footer />
            </PageView>
            <FloatingButtons />
        </div>
    );
}
