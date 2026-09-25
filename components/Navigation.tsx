'use client';

import { useState, useEffect } from 'react';
import { Phone, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PHONE_DISPLAY, PHONE_TEL, ADDRESS, whatsappLink } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

const menuItems = [
    { label: 'الرئيسية', href: '/', sectionId: 'home' },
    { label: 'من نحن', href: '/about', sectionId: 'about' },
    { label: 'المنتجات', href: '/products', sectionId: 'products' },
    { label: 'مناطق الخدمة', href: '/service-areas', sectionId: 'service-areas' },
    { label: 'تواصل معنا', href: '/contact', sectionId: 'contact' },
];

export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';
    const solid = isScrolled || !isHome;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll + close on Escape while the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
        if (isMobileMenuOpen) window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [isMobileMenuOpen]);

    const scrollToSection = (sectionId: string) => {
        if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 72;
            const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
        const wasOpen = isMobileMenuOpen;
        setIsMobileMenuOpen(false);
        if (isHome && sectionId) {
            e.preventDefault();
            // Let the menu close (and unlock scroll) before scrolling
            setTimeout(() => scrollToSection(sectionId), wasOpen ? 350 : 0);
        }
    };

    // The bar sits over the dark hero until scrolled; the open menu is always light
    const onDark = !solid && !isMobileMenuOpen;

    return (
        <>
            <nav
                className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
                    solid && !isMobileMenuOpen
                        ? 'bg-white/85 backdrop-blur-xl shadow-[0_1px_0_0_var(--color-line)]'
                        : 'bg-transparent'
                }`}
            >
                <div className="container mx-auto px-4 lg:px-8">
                    <div
                        className={`flex items-center justify-between transition-[height] duration-500 ${
                            solid ? 'h-16' : 'h-20'
                        }`}
                    >
                        {/* Logo */}
                        <Link
                            href="/"
                            aria-label="موكيت ومفروشات السريع - الصفحة الرئيسية"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3"
                        >
                            <span className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-brass/40">
                                <Image
                                    src="/heroBG.jpeg"
                                    alt="شعار موكيت ومفروشات السريع"
                                    fill
                                    sizes="44px"
                                    className="object-cover"
                                    priority
                                />
                            </span>
                            <span className="flex flex-col">
                                <span
                                    className={`font-display font-bold text-base md:text-lg leading-tight transition-colors ${
                                        onDark ? 'text-white' : 'text-ink'
                                    }`}
                                >
                                    موكيت ومفروشات السريع
                                </span>
                                <span
                                    className={`text-[11px] md:text-xs transition-colors ${
                                        onDark ? 'text-white/65' : 'text-ink-muted'
                                    }`}
                                >
                                    Al-Sari Carpets & Furnishings
                                </span>
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-8">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.sectionId)}
                                    className={`relative py-1 text-sm transition-colors group ${
                                        onDark ? 'text-white/85 hover:text-white' : 'text-ink-soft hover:text-ink'
                                    }`}
                                >
                                    {item.label}
                                    <span className="absolute -bottom-0.5 right-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:block">
                            <a
                                href={PHONE_TEL}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                                    onDark ? 'bg-white text-ink hover:bg-brass-soft' : 'bg-ink text-white hover:bg-ink-soft'
                                }`}
                            >
                                <Phone size={16} />
                                <span>اتصل الآن</span>
                            </a>
                        </div>

                        {/* Mobile: quick call + animated burger */}
                        <div className="flex items-center gap-1 lg:hidden">
                            <a
                                href={PHONE_TEL}
                                aria-label="اتصل الآن"
                                className={`w-10 h-10 grid place-items-center rounded-full transition-colors ${
                                    onDark ? 'text-white bg-white/10' : 'text-ink bg-cream'
                                }`}
                            >
                                <Phone size={18} />
                            </a>
                            <button
                                onClick={() => setIsMobileMenuOpen((open) => !open)}
                                className={`relative w-10 h-10 grid place-items-center rounded-full transition-colors ${
                                    onDark ? 'text-white' : 'text-ink'
                                }`}
                                aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                <span className="relative block w-5 h-3.5">
                                    <span
                                        className={`absolute right-0 h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                                            isMobileMenuOpen ? 'top-1.5 w-5 rotate-45' : 'top-0 w-5'
                                        }`}
                                    />
                                    <span
                                        className={`absolute right-0 top-1.5 h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                                            isMobileMenuOpen ? 'opacity-0 w-0' : 'w-3.5'
                                        }`}
                                    />
                                    <span
                                        className={`absolute right-0 h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                                            isMobileMenuOpen ? 'top-1.5 w-5 -rotate-45' : 'top-3 w-5'
                                        }`}
                                    />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu — full-screen sheet with staggered links */}
            <div
                id="mobile-menu"
                className={`lg:hidden fixed inset-0 z-[45] bg-white transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isMobileMenuOpen ? '[clip-path:circle(150%_at_2.25rem_2.5rem)]' : '[clip-path:circle(0%_at_2.25rem_2.5rem)] pointer-events-none'
                }`}
                aria-hidden={!isMobileMenuOpen}
            >
                <div className="h-full flex flex-col px-6 pt-24 pb-8 overflow-y-auto">
                    <ul className="flex-1">
                        {menuItems.map((item, i) => (
                            <li
                                key={item.label}
                                className={`border-b border-line transition-all duration-500 ${
                                    isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                                style={{ transitionDelay: isMobileMenuOpen ? `${120 + i * 60}ms` : '0ms' }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.sectionId)}
                                    tabIndex={isMobileMenuOpen ? 0 : -1}
                                    className="group flex items-center justify-between py-4"
                                >
                                    <span className="flex items-baseline gap-4">
                                        <span className="text-xs text-brass-deep tabular-nums">0{i + 1}</span>
                                        <span className="font-display text-2xl font-semibold text-ink">{item.label}</span>
                                    </span>
                                    <ArrowLeft
                                        size={18}
                                        className="text-ink-muted transition-transform group-active:-translate-x-1"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div
                        className={`mt-8 space-y-3 transition-all duration-500 ${
                            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: isMobileMenuOpen ? '450ms' : '0ms' }}
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <a
                                href={PHONE_TEL}
                                tabIndex={isMobileMenuOpen ? 0 : -1}
                                className="press flex items-center justify-center gap-2 py-3.5 rounded-full bg-ink text-white text-sm font-bold"
                            >
                                <Phone size={16} />
                                <span dir="ltr">{PHONE_DISPLAY}</span>
                            </a>
                            <a
                                href={whatsappLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex={isMobileMenuOpen ? 0 : -1}
                                className="press flex items-center justify-center gap-2 py-3.5 rounded-full bg-whatsapp text-white text-sm font-bold"
                            >
                                <WhatsAppIcon className="w-4 h-4" />
                                واتساب
                            </a>
                        </div>
                        <p className="flex items-start gap-2 text-xs text-ink-muted leading-relaxed">
                            <MapPin size={14} className="mt-0.5 shrink-0 text-brass" />
                            {ADDRESS}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
