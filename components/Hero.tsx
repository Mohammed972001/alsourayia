'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
    return (
        <section id="home" style={{ backgroundColor: '#d4d0c8', padding: '8px', fontFamily: 'Tahoma, sans-serif' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>

                {/* Main Hero Window */}
                <div className="win-window" style={{ overflow: 'hidden' }}>
                    {/* Title Bar */}
                    <div className="win-titlebar">
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
                            <rect x="0" y="0" width="6" height="6" fill="#FF0000" />
                            <rect x="8" y="0" width="6" height="6" fill="#00FF00" />
                            <rect x="0" y="8" width="6" height="6" fill="#0000FF" />
                            <rect x="8" y="8" width="6" height="6" fill="#FFFF00" />
                        </svg>
                        <span style={{ marginRight: '6px', fontSize: '12px' }}>موكيت ومفروشات السريع - الصفحة الرئيسية</span>
                    </div>

                    {/* Hero Image Area */}
                    <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
                        <Image
                            src="/home/hero-moket-alsurye-riyadh.jpg"
                            alt="موكيت ومفروشات السريع - أفضل موكيت وسجاد ومفروشات في الرياض"
                            fill
                            priority
                            quality={85}
                            sizes="100vw"
                            style={{ objectFit: 'cover', imageRendering: 'auto' }}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEQwBPwAB//9k="
                        />
                        {/* Dark overlay */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)'
                        }} />

                        {/* Overlay Content */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '16px',
                            color: 'white',
                        }}>
                            {/* Pixel "NEW!" gif-style badge */}
                            <div style={{
                                background: '#FF0000',
                                color: '#FFFF00',
                                fontWeight: 'bold',
                                fontSize: '11px',
                                padding: '2px 8px',
                                border: '2px solid #FFFF00',
                                marginBottom: '8px',
                                animation: 'blink 1s step-end infinite',
                                fontFamily: 'Tahoma, sans-serif',
                            }}>
                                ★ الرفاهية تبدأ من تحت قدميك ★
                            </div>

                            <h1 style={{
                                fontSize: '28px',
                                fontWeight: 'bold',
                                marginBottom: '8px',
                                textShadow: '2px 2px 0px #000000',
                                fontFamily: 'Tahoma, sans-serif',
                            }}>
                                موكيت ومفروشات السُريع
                            </h1>

                            <p style={{
                                fontSize: '14px',
                                marginBottom: '16px',
                                maxWidth: '500px',
                                textShadow: '1px 1px 0px #000000',
                                fontFamily: 'Tahoma, sans-serif',
                            }}>
                                نحول مساحاتك إلى تحف فنية بأرقى السجاد والموكيت في الرياض
                            </p>

                            {/* CTA Buttons - Win2000 style */}
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Link
                                    href="#products"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('products')?.scrollIntoView();
                                    }}
                                    style={{
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        padding: '5px 16px',
                                        backgroundColor: '#d4d0c8',
                                        color: '#000000',
                                        borderTop: '2px solid white',
                                        borderLeft: '2px solid white',
                                        borderBottom: '2px solid #808080',
                                        borderRight: '2px solid #808080',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Tahoma, sans-serif',
                                    }}
                                >
                                    تصفح المنتجات
                                </Link>
                                <Link
                                    href="#about"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('about')?.scrollIntoView();
                                    }}
                                    style={{
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        padding: '5px 16px',
                                        backgroundColor: '#000080',
                                        color: 'white',
                                        borderTop: '2px solid #0000cc',
                                        borderLeft: '2px solid #0000cc',
                                        borderBottom: '2px solid #000040',
                                        borderRight: '2px solid #000040',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Tahoma, sans-serif',
                                    }}
                                >
                                    تعرف علينا
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className="win-statusbar" style={{ justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ fontSize: '11px' }}>✓ شحن مجاني للرياض</span>
                            <span style={{ borderLeft: '1px solid #808080', borderRight: '1px solid white', width: '2px' }} />
                            <span style={{ fontSize: '11px' }}>✓ ضمان الجودة</span>
                            <span style={{ borderLeft: '1px solid #808080', borderRight: '1px solid white', width: '2px' }} />
                            <span style={{ fontSize: '11px' }}>✓ خدمة 24/7</span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#000080' }}>
                            www.alsourayia.com
                        </span>
                    </div>
                </div>

                {/* Quick Links Row - Win2000 Explorer Toolbar style */}
                <div className="win-raised" style={{ padding: '6px 8px', display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', marginLeft: '8px', color: '#000000' }}>روابط سريعة:</span>
                    {[
                        { label: 'موكيت مساجد', href: '#products' },
                        { label: 'باركيه', href: '#products' },
                        { label: 'عشب صناعي', href: '#products' },
                        { label: 'أرضيات مكتبية', href: '#products' },
                        { label: 'سجاد فاخر', href: '#products' },
                    ].map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            style={{
                                textDecoration: 'none',
                                color: '#000080',
                                fontSize: '11px',
                                padding: '1px 6px',
                                border: '1px solid transparent',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#000080';
                                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#e0e0f0';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'transparent';
                                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                            }}
                        >
                            📁 {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </section>
    );
}
