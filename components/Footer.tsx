'use client';

export function Footer() {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView();
        } else if (sectionId === 'home') {
            window.scrollTo({ top: 0 });
        }
    };

    const footerLinks = {
        navigation: {
            title: 'روابط سريعة',
            links: [
                { name: 'الرئيسية', href: 'home' },
                { name: 'من نحن', href: 'about' },
                { name: 'المنتجات', href: 'products' },
                { name: 'مناطق الخدمة', href: 'service-areas' },
                { name: 'تواصل معنا', href: 'contact' },
            ],
        },
        products: {
            title: 'منتجاتنا',
            links: [
                { name: 'موكيت مساجد', href: 'products' },
                { name: 'أرضيات مكتبية', href: 'products' },
                { name: 'باركيه', href: 'products' },
                { name: 'عشب صناعي', href: 'products' },
                { name: 'موكيت فاخر', href: 'products' },
            ],
        },
        services: {
            title: 'خدماتنا',
            links: [
                { name: 'تنسيق حدائق', href: 'products' },
                { name: 'شلالات ونوافير', href: 'products' },
                { name: 'أرضيات طبية', href: 'products' },
                { name: 'فينيل مساجد', href: 'products' },
                { name: 'تركيب احترافي', href: 'contact' },
            ],
        },
    };

    return (
        <footer style={{ backgroundColor: '#d4d0c8', padding: '8px', fontFamily: 'Tahoma, sans-serif' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>

                {/* Footer Window */}
                <div className="win-window">
                    <div className="win-titlebar">
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
                            <rect x="0" y="0" width="6" height="6" fill="#FF0000" />
                            <rect x="8" y="0" width="6" height="6" fill="#00FF00" />
                            <rect x="0" y="8" width="6" height="6" fill="#0000FF" />
                            <rect x="8" y="8" width="6" height="6" fill="#FFFF00" />
                        </svg>
                        <span style={{ marginRight: '6px' }}>موكيت ومفروشات السريع - جميع الحقوق محفوظة</span>
                    </div>

                    <div style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                            {/* Company Info */}
                            <div style={{ flex: '2', minWidth: '200px' }}>
                                <div style={{
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    backgroundColor: '#000080',
                                    color: 'white',
                                    padding: '2px 6px',
                                    marginBottom: '6px',
                                }}>
                                    موكيت ومفروشات السريع
                                </div>
                                <div className="win-sunken" style={{ padding: '8px', backgroundColor: 'white' }}>
                                    <p style={{ fontSize: '11px', color: '#000000', lineHeight: 1.6, marginBottom: '8px' }}>
                                        متخصصون في توفير أجود أنواع الموكيت والسجاد والمفروشات في الرياض والمملكة العربية السعودية.
                                        نقدم منتجات عالية الجودة مع خدمة تركيب احترافية وضمان شامل.
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <a href="tel:+966541540047" style={{ fontSize: '11px', color: '#000080', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            📞 <span dir="ltr">+966 541 540 047</span>
                                        </a>
                                        <a href="https://wa.me/966541540047" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#008000', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            💬 <span>واتساب</span>
                                        </a>
                                        <span style={{ fontSize: '11px', color: '#444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            📍 الرياض، المملكة العربية السعودية
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Links */}
                            {Object.entries(footerLinks).map(([key, section]) => (
                                <div key={key} style={{ flex: '1', minWidth: '120px' }}>
                                    <div style={{
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        backgroundColor: '#000080',
                                        color: 'white',
                                        padding: '2px 6px',
                                        marginBottom: '2px',
                                    }}>
                                        {section.title}
                                    </div>
                                    <div className="win-sunken" style={{ backgroundColor: 'white', padding: '0' }}>
                                        {section.links.map((link) => (
                                            <a
                                                key={link.name}
                                                href={`#${link.href}`}
                                                onClick={(e) => scrollToSection(e, link.href)}
                                                className="win-listitem"
                                                style={{
                                                    display: 'block',
                                                    fontSize: '11px',
                                                    color: '#000080',
                                                    textDecoration: 'none',
                                                    padding: '3px 6px',
                                                    borderBottom: '1px solid #f0f0f0',
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#000080';
                                                    (e.currentTarget as HTMLAnchorElement).style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '';
                                                    (e.currentTarget as HTMLAnchorElement).style.color = '#000080';
                                                }}
                                            >
                                                {link.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cities served */}
                        <div style={{
                            borderTop: '1px solid #808080',
                            paddingTop: '8px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '4px',
                            alignItems: 'center',
                        }}>
                            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>نخدم:</span>
                            {['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'].map((city) => (
                                <span
                                    key={city}
                                    style={{
                                        display: 'inline-block',
                                        padding: '1px 6px',
                                        backgroundColor: '#d4d0c8',
                                        borderTop: '1px solid white',
                                        borderLeft: '1px solid white',
                                        borderBottom: '1px solid #808080',
                                        borderRight: '1px solid #808080',
                                        fontSize: '10px',
                                        color: '#000000',
                                    }}
                                >
                                    {city}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="win-statusbar" style={{ justifyContent: 'space-between' }}>
                        <span>© 2025 موكيت ومفروشات السريع. جميع الحقوق محفوظة.</span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} style={{ fontSize: '11px', color: '#000080', textDecoration: 'none' }}>من نحن</a>
                            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={{ fontSize: '11px', color: '#000080', textDecoration: 'none' }}>تواصل معنا</a>
                            <a href="#products" onClick={(e) => scrollToSection(e, 'products')} style={{ fontSize: '11px', color: '#000080', textDecoration: 'none' }}>المنتجات</a>
                        </div>
                    </div>
                </div>

                {/* Windows 2000 style taskbar */}
                <div className="win-taskbar">
                    <button
                        className="win-start-btn"
                        style={{ fontSize: '12px', fontWeight: 'bold' }}
                        onClick={() => window.scrollTo({ top: 0 })}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated' }}>
                            <rect x="0" y="0" width="6" height="6" fill="#FF0000" />
                            <rect x="8" y="0" width="6" height="6" fill="#00FF00" />
                            <rect x="0" y="8" width="6" height="6" fill="#0000FF" />
                            <rect x="8" y="8" width="6" height="6" fill="#FFFF00" />
                        </svg>
                        ابدأ
                    </button>

                    <div style={{
                        width: '1px',
                        height: '20px',
                        borderLeft: '1px solid #808080',
                        borderRight: '1px solid white',
                        margin: '0 2px',
                    }} />

                    {/* Quick launch icons */}
                    <button
                        style={{
                            padding: '2px 6px',
                            fontSize: '11px',
                            fontFamily: 'Tahoma, sans-serif',
                            cursor: 'pointer',
                            backgroundColor: '#d4d0c8',
                            borderTop: '2px solid white',
                            borderLeft: '2px solid white',
                            borderBottom: '2px solid #808080',
                            borderRight: '2px solid #808080',
                        }}
                        onClick={() => document.getElementById('products')?.scrollIntoView()}
                    >
                        📁 المنتجات
                    </button>
                    <button
                        style={{
                            padding: '2px 6px',
                            fontSize: '11px',
                            fontFamily: 'Tahoma, sans-serif',
                            cursor: 'pointer',
                            backgroundColor: '#d4d0c8',
                            borderTop: '2px solid white',
                            borderLeft: '2px solid white',
                            borderBottom: '2px solid #808080',
                            borderRight: '2px solid #808080',
                        }}
                        onClick={() => document.getElementById('contact')?.scrollIntoView()}
                    >
                        📧 اتصل بنا
                    </button>

                    {/* Spacer */}
                    <div style={{ flex: 1 }} />

                    {/* System tray clock */}
                    <div className="win-sunken" style={{
                        padding: '2px 8px',
                        fontSize: '11px',
                        backgroundColor: '#d4d0c8',
                        color: '#000000',
                    }}>
                        موكيت السريع ©2025
                    </div>
                </div>
            </div>
        </footer>
    );
}
