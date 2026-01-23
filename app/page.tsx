'use client';

import { useState, useEffect } from 'react';
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
import { WelcomePopup } from '@/components/WelcomePopup';
import { ProductDetail } from '@/components/ProductDetail';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<'home' | 'product'>('home');

    useEffect(() => {
        // Show welcome popup after 2 seconds
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleProductClick = (productId: string) => {
        setSelectedProductId(productId);
        setCurrentPage('product');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToHome = () => {
        setCurrentPage('home');
        setSelectedProductId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Home page breadcrumb
    const homeBreadcrumb = [
        { label: 'الرئيسية' }
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation onBackToHome={currentPage === 'product' ? handleBackToHome : undefined} />

            {currentPage === 'home' ? (
                <>
                    {/* Breadcrumb for Home - Hidden visually but good for SEO */}
                    <div className="sr-only">
                        <Breadcrumb items={homeBreadcrumb} />
                    </div>
                    <Hero />
                    <About />
                    <ProductGallery onProductClick={handleProductClick} />
                    <ServiceAreas />
                    <Testimonials />
                    <FAQ />
                    <Contact />
                    <Footer />
                    {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}
                </>
            ) : (
                <ProductDetail productId={selectedProductId!} onBack={handleBackToHome} />
            )}

            <FloatingButtons />
        </div>
    );
}
