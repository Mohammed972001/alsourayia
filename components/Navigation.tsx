'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
    onBackToHome?: () => void;
}

export function Navigation({ onBackToHome }: NavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'الرئيسية', href: '#home' },
        { label: 'من نحن', href: '#about' },
        { label: 'المنتجات', href: '#products' },
        { label: 'مناطق الخدمة', href: '#service-areas' },
        { label: 'آراء العملاء', href: '#testimonials' },
        { label: 'تواصل معنا', href: '#contact' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        // If we're on product detail page, go back to home first
        if (onBackToHome) {
            onBackToHome();
            // Wait for the page to render then scroll
            setTimeout(() => {
                scrollToSection(href);
            }, 100);
        } else {
            scrollToSection(href);
        }

        setIsMobileMenuOpen(false);
    };

    const scrollToSection = (href: string) => {
        const sectionId = href.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 80; // Height of the fixed nav
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLogoClick = () => {
        if (onBackToHome) {
            onBackToHome();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 space-x-reverse cursor-pointer"
                        onClick={handleLogoClick}
                    >
                        <div className={`transition-colors ${isScrolled ? 'text-[#0088FF]' : 'text-white'}`}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                                <path d="M20 2L35 12L35 28L20 38L5 28L5 12L20 2Z" />
                                <path d="M20 10L28 15L28 25L20 30L12 25L12 15L20 10Z" fill="white" opacity="0.3" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-bold text-xl transition-colors ${isScrolled ? 'text-[#0088FF]' : 'text-white'}`}>
                                موكيت ومفروشات السريع
                            </span>
                            <span className={`text-xs transition-colors ${isScrolled ? 'text-[#005CB8]' : 'text-white/80'}`}>
                                Al-Sari Carpets & Furnishings
                            </span>
                        </div>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6">
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={`transition-colors hover:text-[#0088FF] ${isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                                    }`}
                            >{item.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center gap-4">
                        <a
                            href="tel:+966540079507"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isScrolled
                                    ? 'bg-[#0088FF] text-white hover:bg-[#005CB8]'
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
                        className={`lg:hidden p-2 ${isScrolled ? 'text-[#1A1A1A]' : 'text-white'}`}
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
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="block py-2 text-[#1A1A1A] hover:text-[#0088FF] transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="pt-4 border-t">
                                <a
                                    href="tel:+966540079507"
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0088FF] text-white rounded-lg hover:bg-[#005CB8] transition-colors"
                                >
                                    <Phone size={18} />
                                    <span>اتصل الآن: 966540079507+</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
