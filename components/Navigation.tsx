'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'الرئيسية', href: '/#home', sectionId: 'home' },
        { label: 'من نحن', href: '/#about', sectionId: 'about' },
        { label: 'المنتجات', href: '/#products', sectionId: 'products' },
        { label: 'مناطق الخدمة', href: '/#service-areas', sectionId: 'service-areas' },
        { label: 'آراء العملاء', href: '/#testimonials', sectionId: 'testimonials' },
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
            scrollToSection(sectionId);
        }
        // On other pages, follow the real URL (href)
        setIsMobileMenuOpen(false);
    };

    // Always solid background on non-home pages (no hero image behind nav)
    const isSolid = isScrolled || !isHome;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isSolid ? 'bg-white shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" aria-label="موكيت ومفروشات السريع - الصفحة الرئيسية">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                                <Image
                                    src="/heroBG.jpeg"
                                    alt="شعار موكيت ومفروشات السريع"
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className={`font-bold text-lg leading-tight transition-colors ${isSolid ? 'text-[#1B2B4A]' : 'text-white'}`}>
                                    موكيت ومفروشات السريع
                                </span>
                                <span className={`text-xs transition-colors ${isSolid ? 'text-[#C49A3C]' : 'text-white/80'}`}>
                                    Al-Sari Carpets & Furnishings
                                </span>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                                className={`transition-colors hover:text-[#C49A3C] ${isSolid ? 'text-[#1A1A1A]' : 'text-white'
                                    }`}
                            >{item.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center gap-4">
                        <a
                            href="tel:+966541540047"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isSolid
                                    ? 'bg-[#1B2B4A] text-white hover:bg-[#0F1A2E]'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                        >
                            <Phone size={18} />
                            <span>اتصل الآن</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2 ${isSolid ? 'text-[#1A1A1A]' : 'text-white'}`}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white shadow-lg"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                                    className="block py-2 text-[#1A1A1A] hover:text-[#C49A3C] transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t">
                                <a
                                    href="tel:+966541540047"
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#1B2B4A] text-white rounded-lg hover:bg-[#0F1A2E] transition-colors"
                                >
                                    <Phone size={18} />
                                    <span>اتصل الآن: 966541540047+</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
