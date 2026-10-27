import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';

// Next adds noindex to this response itself; the title replaces its English one.
export const metadata: Metadata = {
    title: 'الصفحة غير موجودة',
};

const links = [
    { href: '/products/office-carpet', label: 'موكيت مكاتب' },
    { href: '/products/category/rubber-flooring', label: 'أرضيات ربل' },
    { href: '/products/mosque-carpets', label: 'موكيت مساجد' },
    { href: '/products', label: 'كل المنتجات' },
];

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <main className="pt-[calc(var(--header-full)+3rem)] pb-24">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4">الصفحة غير موجودة</h1>
                    <p className="text-ink-soft mb-8">ربما تغيّر الرابط. اختر من الأقسام التالية أو تواصل معنا على الواتساب.</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="press rounded-full border border-line px-5 py-2.5 text-sm font-bold text-ink hover:bg-cream transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
