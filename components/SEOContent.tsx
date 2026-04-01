'use client';

import Link from 'next/link';

export function SEOContent() {
    return (
        <section style={{ backgroundColor: '#d4d0c8', padding: '8px', fontFamily: 'Tahoma, sans-serif' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="win-window">
                    <div className="win-titlebar">
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
                            <rect x="2" y="1" width="10" height="12" fill="white" stroke="#808080" />
                            <rect x="4" y="3" width="6" height="1" fill="#000080" />
                            <rect x="4" y="5" width="6" height="1" fill="#000080" />
                            <rect x="4" y="7" width="4" height="1" fill="#000080" />
                        </svg>
                        <span style={{ marginRight: '6px' }}>لماذا موكيت ومفروشات السريع؟</span>
                    </div>

                    <div style={{ padding: '12px' }}>
                        {/* Header */}
                        <div style={{
                            backgroundColor: '#000080',
                            color: 'white',
                            padding: '4px 12px',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            marginBottom: '12px',
                            borderTop: '2px solid #0000cc',
                            borderLeft: '2px solid #0000cc',
                            borderBottom: '2px solid #000040',
                            borderRight: '2px solid #000040',
                        }}>
                            لماذا موكيت ومفروشات السريع الخيار الأول في الرياض؟
                        </div>

                        <div className="win-sunken" style={{ backgroundColor: 'white', padding: '10px', marginBottom: '10px' }}>
                            <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#000000', marginBottom: '8px' }}>
                                تُعد <strong>موكيت ومفروشات السريع</strong> من الشركات الرائدة في مجال توفير{' '}
                                <Link href="#products" style={{ color: '#000080' }}>الموكيت والسجاد والمفروشات</Link>{' '}
                                في <strong>الرياض</strong> والمملكة العربية السعودية.
                            </p>
                            <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#000000' }}>
                                نتميز بتقديم خدمات متكاملة: <strong>الاستشارة المجانية</strong>، <strong>المعاينة والقياس</strong>،{' '}
                                <strong>التوصيل المجاني داخل الرياض</strong>، و<strong>التركيب الاحترافي</strong>.
                            </p>
                        </div>

                        {/* Product Cards - Explorer icon view */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '6px',
                            marginBottom: '10px',
                        }}>
                            {[
                                { icon: '🕌', title: 'موكيت مساجد', desc: 'موكيت مساجد بتصاميم إسلامية فاخرة مقاوم للحريق', href: '#products' },
                                { icon: '🏢', title: 'أرضيات مكتبية', desc: 'أرضيات احترافية للبيئات المكتبية سهلة التنظيف', href: '#products' },
                                { icon: '🪵', title: 'باركيه فاخر', desc: 'باركيه ضد الماء بضمان يصل إلى 25 سنة', href: '#products' },
                                { icon: '🌿', title: 'عشب صناعي', desc: 'عشب صناعي للحدائق مقاوم للأشعة فوق البنفسجية', href: '#products' },
                            ].map((item) => (
                                <div key={item.title} className="win-raised" style={{ padding: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{item.icon}</div>
                                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080', marginBottom: '4px', borderBottom: '1px solid #808080', paddingBottom: '3px' }}>
                                        {item.title}
                                    </div>
                                    <p style={{ fontSize: '11px', color: '#444', lineHeight: 1.4, marginBottom: '4px' }}>
                                        {item.desc}
                                    </p>
                                    <Link href={item.href} style={{ fontSize: '11px', color: '#000080', textDecoration: 'underline' }}>
                                        اكتشف المزيد
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            <Link
                                href="#products"
                                onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView(); }}
                                style={{
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    backgroundColor: '#000080',
                                    color: 'white',
                                    borderTop: '2px solid #0000cc',
                                    borderLeft: '2px solid #0000cc',
                                    borderBottom: '2px solid #000040',
                                    borderRight: '2px solid #000040',
                                    fontSize: '12px',
                                    fontFamily: 'Tahoma, sans-serif',
                                }}
                            >
                                تصفح جميع المنتجات
                            </Link>
                            <a
                                href="https://wa.me/966541540047"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    backgroundColor: '#008000',
                                    color: 'white',
                                    borderTop: '2px solid #00cc00',
                                    borderLeft: '2px solid #00cc00',
                                    borderBottom: '2px solid #004000',
                                    borderRight: '2px solid #004000',
                                    fontSize: '12px',
                                    fontFamily: 'Tahoma, sans-serif',
                                }}
                            >
                                تواصل عبر واتساب
                            </a>
                        </div>
                    </div>

                    <div className="win-statusbar">
                        <span>خبرة تجاوز 15 عاماً | أكثر من 10,000 مشروع مكتمل</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
