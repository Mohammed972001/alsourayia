'use client';

import Link from 'next/link';

export function About() {
    const features = [
        {
            icon: '🏆',
            title: 'جودة استثنائية',
            description: 'نستخدم أفضل المواد والخامات لضمان موكيت وسجاد يدوم طويلاً',
        },
        {
            icon: '🎨',
            title: 'تصاميم مبتكرة',
            description: 'تشكيلة واسعة من تصاميم الموكيت والمفروشات العصرية والكلاسيكية',
        },
        {
            icon: '📞',
            title: 'خدمة عملاء متميزة',
            description: 'فريقنا متاح دائماً لمساعدتك في اختيار الموكيت والأرضيات المناسبة',
        },
    ];

    const stats = [
        { number: '15+', label: 'سنة من الخبرة' },
        { number: '5000+', label: 'عميل راضٍ في الرياض' },
        { number: '10000+', label: 'مشروع مكتمل' },
        { number: '100%', label: 'ضمان الجودة' },
    ];

    return (
        <section id="about" style={{ backgroundColor: '#d4d0c8', padding: '8px', fontFamily: 'Tahoma, sans-serif' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>

                {/* About Window */}
                <div className="win-window">
                    <div className="win-titlebar">
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
                            <circle cx="7" cy="7" r="6" fill="#c0c0c0" />
                            <text x="7" y="11" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000080">i</text>
                        </svg>
                        <span style={{ marginRight: '6px' }}>من نحن - موكيت ومفروشات السريع</span>
                    </div>

                    <div style={{ padding: '16px' }}>
                        {/* Section header */}
                        <div style={{
                            borderBottom: '2px solid #808080',
                            borderRight: '2px solid #808080',
                            borderTop: '2px solid white',
                            borderLeft: '2px solid white',
                            backgroundColor: '#000080',
                            color: 'white',
                            padding: '4px 12px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginBottom: '12px',
                        }}>
                            رواد التميز في عالم السجاد والمفروشات
                        </div>

                        <p style={{ fontSize: '13px', color: '#000000', marginBottom: '16px', lineHeight: 1.6 }}>
                            <strong>موكيت ومفروشات السريع</strong> هي وجهتك المثالية للحصول على أرقى أنواع{' '}
                            <Link href="#products" style={{ color: '#000080' }}>السجاد والموكيت والمفروشات</Link>
                            {' '}في <strong>الرياض</strong> والمملكة العربية السعودية.
                            نجمع بين الحرفية التقليدية والتصميمات العصرية لنقدم لك تجربة فريدة من نوعها.
                        </p>

                        {/* Feature Cards - Win2000 Panel style */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '8px',
                            marginBottom: '16px',
                        }}>
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="win-raised"
                                    style={{ padding: '12px', textAlign: 'center' }}
                                >
                                    <div style={{ fontSize: '28px', marginBottom: '8px', lineHeight: 1 }}>
                                        {feature.icon}
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: '#000080',
                                        marginBottom: '6px',
                                        borderBottom: '1px solid #808080',
                                        paddingBottom: '4px',
                                    }}>
                                        {feature.title}
                                    </div>
                                    <p style={{ fontSize: '12px', color: '#000000', lineHeight: 1.5 }}>
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Stats Table */}
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{
                                fontSize: '12px',
                                fontWeight: 'bold',
                                backgroundColor: '#d4d0c8',
                                padding: '2px 8px',
                                borderTop: '2px solid white',
                                borderLeft: '2px solid white',
                                borderBottom: '2px solid #808080',
                                borderRight: '2px solid #808080',
                                marginBottom: '4px',
                            }}>
                                إحصائياتنا
                            </div>
                            <table className="win-table">
                                <thead>
                                    <tr>
                                        {stats.map((stat) => (
                                            <th key={stat.label} style={{ textAlign: 'center' }}>
                                                {stat.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {stats.map((stat) => (
                                            <td key={stat.label} style={{
                                                textAlign: 'center',
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                color: '#000080',
                                                padding: '8px',
                                            }}>
                                                {stat.number}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* CTA buttons */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            <Link
                                href="#products"
                                onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView(); }}
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
                                    fontFamily: 'Tahoma, sans-serif',
                                }}
                            >
                                تصفح تشكيلة الموكيت
                            </Link>
                            <Link
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView(); }}
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
                                    fontFamily: 'Tahoma, sans-serif',
                                }}
                            >
                                احصل على استشارة مجانية
                            </Link>
                        </div>
                    </div>

                    {/* Status bar */}
                    <div className="win-statusbar">
                        <span>خبرة تتجاوز 15 عاماً في السوق السعودي</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
