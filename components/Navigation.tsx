'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const menuItems = [
        { label: 'الرئيسية', href: '/#home', sectionId: 'home' },
        { label: 'من نحن', href: '/#about', sectionId: 'about' },
        { label: 'المنتجات', href: '/#products', sectionId: 'products' },
        { label: 'مناطق الخدمة', href: '/#service-areas', sectionId: 'service-areas' },
        { label: 'تواصل معنا', href: '/#contact', sectionId: 'contact' },
    ];

    const scrollToSection = (sectionId: string) => {
        if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
        sectionId?: string
    ) => {
        if (isHome && sectionId) {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            // Delay scroll to allow mobile menu close transition to complete
            setTimeout(() => {
                scrollToSection(sectionId);
            }, 350);
        } else {
            // Non-home: let the Link navigate to /#sectionId
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                isScrolled || !isHome
                    ? 'bg-white shadow-sm'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" aria-label="موكيت ومفروشات السريع - الصفحة الرئيسية">
                        <div className="flex items-center gap-3">
                            <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src="/heroBG.jpeg"
                                    alt="شعار موكيت ومفروشات السريع"
                                    fill
                                    sizes="44px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className={`font-bold text-lg leading-tight transition-colors ${
                                    isScrolled || !isHome ? 'text-[#1A1A1A]' : 'text-white'
                                }`}>
                                    موكيت ومفروشات السريع
                                </span>
                                <span className={`text-xs transition-colors ${
                                    isScrolled || !isHome ? 'text-gray-500' : 'text-white/70'
                                }`}>
                                    Al-Sari Carpets & Furnishings
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                                className={`text-sm transition-colors ${
                                    isScrolled || !isHome
                                        ? 'text-[#4A4A4A] hover:text-[#1A1A1A]'
                                        : 'text-white/90 hover:text-white'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden lg:block">
                        <a
                            href="tel:+966541540047"
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-colors ${
                                isScrolled || !isHome
                                    ? 'bg-[#1A1A1A] text-white hover:bg-[#333]'
                                    : 'bg-white text-[#1A1A1A] hover:bg-white/90'
                            }`}
                        >
                            <Phone size={16} />
                            <span>اتصل الآن</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2 ${
                            isScrolled || !isHome ? 'text-[#1A1A1A]' : 'text-white'
                        }`}
                        aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
                    isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="container mx-auto px-4 py-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                            className="block py-3 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors border-b border-gray-50 last:border-0"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="pt-3">
                        <a
                            href="tel:+966541540047"
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#1A1A1A] text-white rounded-lg text-sm"
                        >
                            <Phone size={16} />
                            <span dir="ltr">+966 541 540 047</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
