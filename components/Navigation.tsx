'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    const menuItems = [
        { label: 'الرئيسية', href: '/', sectionId: 'home' },
        { label: 'من نحن', href: '/about', sectionId: 'about' },
        { label: 'المنتجات', href: '/products', sectionId: 'products' },
        { label: 'مناطق الخدمة', href: '/service-areas', sectionId: 'service-areas' },
        { label: 'آراء العملاء', href: '/#testimonials', sectionId: 'testimonials' },
        { label: 'تواصل معنا', href: '/contact', sectionId: 'contact' },
    ];

    const scrollToSection = (sectionId: string) => {
        if (sectionId === 'home') {
            window.scrollTo({ top: 0 });
            return;
        }
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 60;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;
            window.scrollTo({ top: offsetPosition });
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
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="sticky top-0 z-50" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            {/* Title Bar / Menubar */}
            <div
                style={{
                    background: 'linear-gradient(to left, #1084d0, #000080)',
                    color: 'white',
                    padding: '2px 6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '22px',
                    userSelect: 'none',
                }}
            >
                {/* Logo / Title */}
                <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {/* Win2000-style icon */}
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
                            <rect x="0" y="0" width="7" height="7" fill="#FF0000" />
                            <rect x="9" y="0" width="7" height="7" fill="#00FF00" />
                            <rect x="0" y="9" width="7" height="7" fill="#0000FF" />
                            <rect x="9" y="9" width="7" height="7" fill="#FFFF00" />
                        </svg>
                        <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                            موكيت ومفروشات السريع
                        </span>
                        <span style={{ fontSize: '11px', opacity: 0.85 }}>
                            - Al-Sari Carpets & Furnishings
                        </span>
                    </div>
                </Link>

                {/* Window Control Buttons */}
                <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                    <button
                        aria-label="تصغير"
                        style={{
                            width: '14px',
                            height: '14px',
                            background: '#d4d0c8',
                            borderTop: '1px solid white',
                            borderLeft: '1px solid white',
                            borderBottom: '1px solid #808080',
                            borderRight: '1px solid #808080',
                            cursor: 'pointer',
                            fontSize: '9px',
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: '2px',
                            color: 'black',
                        }}
                    >
                        _
                    </button>
                    <button
                        aria-label="تكبير"
                        style={{
                            width: '14px',
                            height: '14px',
                            background: '#d4d0c8',
                            borderTop: '1px solid white',
                            borderLeft: '1px solid white',
                            borderBottom: '1px solid #808080',
                            borderRight: '1px solid #808080',
                            cursor: 'pointer',
                            fontSize: '9px',
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'black',
                        }}
                    >
                        □
                    </button>
                    <button
                        aria-label="إغلاق"
                        style={{
                            width: '14px',
                            height: '14px',
                            background: '#d4d0c8',
                            borderTop: '1px solid white',
                            borderLeft: '1px solid white',
                            borderBottom: '1px solid #808080',
                            borderRight: '1px solid #808080',
                            cursor: 'pointer',
                            fontSize: '10px',
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'black',
                            fontWeight: 'bold',
                        }}
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Menu Bar */}
            <div
                style={{
                    backgroundColor: '#d4d0c8',
                    borderBottom: '1px solid #808080',
                    borderTop: '1px solid white',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px 4px',
                    gap: '0px',
                    flexWrap: 'wrap',
                }}
            >
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                        style={{
                            textDecoration: 'none',
                            color: '#000000',
                            fontSize: '12px',
                            padding: '2px 8px',
                            display: 'inline-block',
                            fontFamily: 'Tahoma, sans-serif',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#000080';
                            (e.currentTarget as HTMLAnchorElement).style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                            (e.currentTarget as HTMLAnchorElement).style.color = '#000000';
                        }}
                    >
                        {item.label}
                    </Link>
                ))}

                {/* Separator */}
                <div style={{ flex: 1 }} />

                {/* Phone CTA */}
                <a
                    href="tel:+966541540047"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: '#000000',
                        textDecoration: 'none',
                        padding: '2px 8px',
                        backgroundColor: '#d4d0c8',
                        borderTop: '2px solid white',
                        borderLeft: '2px solid white',
                        borderBottom: '2px solid #808080',
                        borderRight: '2px solid #808080',
                        fontFamily: 'Tahoma, sans-serif',
                        fontWeight: 'bold',
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#e0ddd4';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#d4d0c8';
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M2 1h2l1 3-1.5 1.5C4.5 7 5 7.5 6.5 9L8 7.5l3 1v2C11 11 9 12 7 11 5 10 2 7 1 5 0 3 1 1 2 1z" />
                    </svg>
                    اتصل الآن
                </a>

                {/* Mobile menu toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        display: 'none',
                        padding: '2px 6px',
                        backgroundColor: '#d4d0c8',
                        borderTop: '2px solid white',
                        borderLeft: '2px solid white',
                        borderBottom: '2px solid #808080',
                        borderRight: '2px solid #808080',
                        cursor: 'pointer',
                        fontSize: '12px',
                    }}
                    className="lg:hidden"
                    aria-label="القائمة"
                >
                    ☰
                </button>
            </div>

            {/* Address Bar */}
            <div
                style={{
                    backgroundColor: '#d4d0c8',
                    borderBottom: '1px solid #808080',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px 4px',
                    gap: '4px',
                }}
            >
                <span style={{ fontSize: '11px', color: '#000000', fontFamily: 'Tahoma, sans-serif', whiteSpace: 'nowrap' }}>
                    العنوان:
                </span>
                <div
                    style={{
                        flex: 1,
                        background: 'white',
                        borderTop: '1px solid #808080',
                        borderLeft: '1px solid #808080',
                        borderBottom: '1px solid white',
                        borderRight: '1px solid white',
                        padding: '1px 4px',
                        fontSize: '11px',
                        fontFamily: 'Tahoma, monospace',
                        color: '#000080',
                        direction: 'ltr',
                    }}
                >
                    http://www.alsourayia.com/
                </div>
                <button
                    style={{
                        padding: '1px 8px',
                        fontSize: '11px',
                        backgroundColor: '#d4d0c8',
                        borderTop: '2px solid white',
                        borderLeft: '2px solid white',
                        borderBottom: '2px solid #808080',
                        borderRight: '2px solid #808080',
                        cursor: 'pointer',
                        fontFamily: 'Tahoma, sans-serif',
                    }}
                >
                    انتقال
                </button>
            </div>

            {/* Marquee ticker */}
            <div className="win-marquee overflow-hidden" style={{ padding: '1px 0', height: '18px' }}>
                <div
                    style={{
                        display: 'inline-block',
                        animation: 'marquee 20s linear infinite',
                        whiteSpace: 'nowrap',
                        fontSize: '11px',
                        paddingRight: '100%',
                    }}
                >
                    * مرحباً بكم في موقع موكيت ومفروشات السريع * أفضل موكيت ومفروشات في الرياض * اتصل الآن: 966541540047+ * شحن مجاني داخل الرياض * ضمان الجودة على جميع المنتجات * خدمة 24/7 *
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
        </div>
    );
}
