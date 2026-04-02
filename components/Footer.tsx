'use client';

import { Phone, MapPin } from 'lucide-react';

export function Footer() {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        if (sectionId === 'home') {
            if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.location.href = '/';
            }
            return;
        }
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        } else {
            window.location.href = `/#${sectionId}`;
        }
    };

    const quickLinks = [
        { name: 'الرئيسية', href: 'home' },
        { name: 'من نحن', href: 'about' },
        { name: 'المنتجات', href: 'products' },
        { name: 'مناطق الخدمة', href: 'service-areas' },
        { name: 'تواصل معنا', href: 'contact' },
    ];

    const productLinks = [
        { name: 'موكيت مساجد', href: 'products' },
        { name: 'أرضيات مكتبية', href: 'products' },
        { name: 'باركيه', href: 'products' },
        { name: 'عشب صناعي', href: 'products' },
        { name: 'أرضيات مطاط', href: 'products' },
    ];

    return (
        <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg mb-2">موكيت ومفروشات السريع</h3>
                        <p className="text-gray-400 text-xs mb-4">Al-Sari Carpets & Furnishings</p>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            متخصصون في توفير أجود أنواع الموكيت والسجاد والمفروشات في الرياض والمملكة العربية السعودية.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm mb-4 text-gray-300">روابط سريعة</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={`#${link.href}`}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-sm mb-4 text-gray-300">منتجاتنا</h4>
                        <ul className="space-y-2">
                            {productLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={`#${link.href}`}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm mb-4 text-gray-300">تواصل معنا</h4>
                        <div className="space-y-3">
                            <a href="tel:+966541540047" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                                <Phone size={14} />
                                <span dir="ltr">+966 541 540 047</span>
                            </a>
                            <address className="not-italic flex items-start gap-2 text-gray-400 text-sm">
                                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                                <span>مخرج ٢٢ حراج بن قاسم القديم سوق العرب الدولي، الرياض</span>
                            </address>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <p className="text-gray-500 text-sm text-center">
                        &copy; 2025 موكيت ومفروشات السريع. جميع الحقوق محفوظة.
                    </p>
                </div>
            </div>
        </footer>
    );
}
