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

/** Owner-confirmed points for the strip above the bar; the last two only fit on desktop. */
const STRIP = [
    { label: 'معاينة وقياس مجاناً', desktopOnly: false },
    { label: 'عينة مجانية قبل الطلب', desktopOnly: false },
    { label: 'توريد لكل مدن المملكة', desktopOnly: true },
    { label: 'يومياً 9 صباحاً – 10 مساءً', desktopOnly: true },
];

const isActive = (pathname: string, href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Once scrolled, the strip slides up out of view and only the 70px bar stays; <html data-scrolled>
    // tells sticky bars (globals.css --header-now) to follow it.
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 40;
            setIsScrolled(scrolled);
            document.documentElement.toggleAttribute('data-scrolled', scrolled);
        };
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
            const navHeight = 70;
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

    return (
        <>
            <nav
                className={`site-header fixed top-0 right-0 left-0 z-50 transition-transform duration-300 ease-out ${
                    isScrolled && !isMobileMenuOpen ? '-translate-y-[34px]' : ''
                }`}
            >
                {/* Strip of owner-confirmed points */}
                <div className="bg-mint-soft text-mint-deep text-[12.5px] font-semibold">
                    <ul className="container mx-auto px-4 lg:px-8 h-[34px] flex items-center justify-center gap-[18px] whitespace-nowrap overflow-hidden">
                        {STRIP.map(({ label, desktopOnly }) => (
                            <li key={label} className={`${desktopOnly ? 'hidden lg:flex' : 'flex'} items-center gap-[7px]`}>
                                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-mint" />
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white border-b border-line">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex items-center gap-4 h-[70px]">
                            {/* Logo: the round emblem with a thin brass ring */}
                            <Link
                                href="/"
                                aria-label="موكيت ومفروشات السريع - الصفحة الرئيسية"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 min-w-0"
                            >
                                <span className="relative w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0 ring-1 ring-brass/45">
                                    <Image
                                        src="/brand/emblem.webp"
                                        alt="شعار موكيت ومفروشات السريع"
                                        fill
                                        sizes="46px"
                                        className="object-cover"
                                        // Eager but not `priority`: priority adds a high-priority
                                        // preload for a 46px logo that competes with the hero / product
                                        // picture for the first bytes on a slow phone.
                                        loading="eager"
                                    />
                                </span>
                                <span className="flex flex-col min-w-0">
                                    <span className="font-display text-base sm:text-lg leading-tight text-ink truncate">
                                        موكيت ومفروشات السريع
                                    </span>
                                    <span className="text-[11px] text-ink-muted tracking-[0.2px] truncate">
                                        Al-Sari Carpets & Furnishings
                                    </span>
                                </span>
                            </Link>

                            {/* Desktop Menu */}
                            <div className="hidden lg:flex items-center gap-7 ms-6 flex-1">
                                {menuItems.map((item) => {
                                    const active = isActive(pathname, item.href);
                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.sectionId)}
                                            aria-current={active ? 'page' : undefined}
                                            className={`nav-link py-1.5 text-[15px] font-medium transition-colors ${
                                                active ? 'text-mint-deep' : 'text-ink hover:text-mint-deep'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Call (all sizes), quote on WhatsApp (desktop), burger (phones) */}
                            <div className="ms-auto flex items-center gap-2">
                                <a
                                    href={PHONE_TEL}
                                    aria-label="اتصل الآن"
                                    className="press w-[42px] h-[42px] grid place-items-center rounded-[10px] bg-mint-soft text-mint-deep hover:bg-mint-line transition-colors"
                                >
                                    <Phone size={19} strokeWidth={1.8} />
                                </a>
                                <a
                                    href={whatsappLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden lg:inline-flex items-center justify-center h-[42px] px-[18px] rounded-[10px] bg-mint-deep text-white text-sm font-bold whitespace-nowrap hover:bg-ink transition-colors"
                                >
                                    اطلب عرض سعر
                                </a>
                                <button
                                    onClick={() => setIsMobileMenuOpen((open) => !open)}
                                    className="lg:hidden relative w-[42px] h-[42px] grid place-items-center rounded-[10px] text-ink"
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
                                                isMobileMenuOpen ? 'opacity-0 w-0' : 'w-5'
                                            }`}
                                        />
                                        <span
                                            className={`absolute right-0 h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                                                isMobileMenuOpen ? 'top-1.5 w-5 -rotate-45' : 'top-3 w-3.5'
                                            }`}
                                        />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu — full-screen sheet with staggered links */}
            <div
                id="mobile-menu"
                className={`lg:hidden fixed inset-0 z-[45] bg-white transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isMobileMenuOpen ? '[clip-path:circle(150%_at_2.3rem_4.3rem)]' : '[clip-path:circle(0%_at_2.3rem_4.3rem)] pointer-events-none'
                }`}
                aria-hidden={!isMobileMenuOpen}
            >
                <div className="h-full flex flex-col px-6 pt-32 pb-8 overflow-y-auto">
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
                                        <span className="text-xs text-mint-deep tabular-nums">0{i + 1}</span>
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
