'use client';

export function ServiceAreas() {
    const areas = [
        { name: 'الرياض', count: 50 },
        { name: 'جدة', count: 30 },
        { name: 'الدمام', count: 25 },
        { name: 'الخبر', count: 20 },
        { name: 'مكة المكرمة', count: 18 },
        { name: 'المدينة المنورة', count: 15 },
    ];

    return (
        <section id="service-areas" style={{ backgroundColor: '#d4d0c8', padding: '8px', fontFamily: 'Tahoma, sans-serif' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="win-window">
                    <div className="win-titlebar">
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
                            <rect x="4" y="0" width="6" height="6" fill="#FF0000" />
                            <polygon points="7,6 1,14 13,14" fill="#FF8800" />
                        </svg>
                        <span style={{ marginRight: '6px' }}>مناطق الخدمة - نخدم جميع أنحاء المملكة</span>
                    </div>

                    <div style={{ padding: '12px' }}>
                        {/* Header */}
                        <div style={{
                            backgroundColor: '#000080',
                            color: 'white',
                            padding: '4px 12px',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            marginBottom: '8px',
                            borderTop: '2px solid #0000cc',
                            borderLeft: '2px solid #0000cc',
                            borderBottom: '2px solid #000040',
                            borderRight: '2px solid #000040',
                        }}>
                            نخدم جميع مناطق المملكة العربية السعودية
                        </div>

                        <p style={{ fontSize: '12px', color: '#444', marginBottom: '12px', lineHeight: 1.6 }}>
                            نفخر بتقديم خدماتنا المميزة في جميع أنحاء المملكة العربية السعودية. اتصل بنا للحصول على خدمات التوصيل والتركيب.
                        </p>

                        {/* Areas as Win2000 listview */}
                        <table className="win-table" style={{ marginBottom: '12px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '30px' }}>#</th>
                                    <th>المنطقة</th>
                                    <th>المشاريع المنجزة</th>
                                    <th>الحالة</th>
                                    <th>الطلب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {areas.map((area, index) => (
                                    <tr key={area.name}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="#FF0000">
                                                    <path d="M6 0C4 0 2 2 2 4.5 2 8 6 12 6 12S10 8 10 4.5C10 2 8 0 6 0z" />
                                                    <circle cx="6" cy="4.5" r="1.5" fill="white" />
                                                </svg>
                                                {area.name}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center', color: '#000080', fontWeight: 'bold' }}>
                                            {area.count}+
                                        </td>
                                        <td>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '1px 6px',
                                                backgroundColor: '#008000',
                                                color: 'white',
                                                fontSize: '10px',
                                            }}>
                                                متاح
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                style={{
                                                    padding: '1px 8px',
                                                    fontSize: '11px',
                                                    fontFamily: 'Tahoma, sans-serif',
                                                    cursor: 'pointer',
                                                    backgroundColor: '#d4d0c8',
                                                    color: '#000000',
                                                    borderTop: '2px solid white',
                                                    borderLeft: '2px solid white',
                                                    borderBottom: '2px solid #808080',
                                                    borderRight: '2px solid #808080',
                                                }}
                                                onClick={() => window.open('https://wa.me/966541540047', '_blank')}
                                            >
                                                اطلب الآن
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="win-statusbar">
                        <span>6 مناطق خدمة | متوفر في جميع أنحاء المملكة</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
