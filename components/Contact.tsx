'use client';

export function Contact() {
    const contactInfo = [
        {
            icon: '📍',
            title: 'العنوان',
            content: 'الرياض، حي الملقا، طريق الملك فهد',
        },
        {
            icon: '📞',
            title: 'الهاتف',
            content: '0540079507',
            href: 'tel:0540079507',
        },
        {
            icon: '🕐',
            title: 'أوقات العمل',
            content: 'السبت - الخميس: 9:00 صباحاً - 10:00 مساءً',
        },
    ];

    return (
        <section id="contact" style={{ backgroundColor: '#d4d0c8', padding: '8px', fontFamily: 'Tahoma, sans-serif' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="win-window">
                    <div className="win-titlebar">
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
                            <rect x="1" y="3" width="12" height="9" fill="#c0c0c0" stroke="#808080" />
                            <path d="M1 3 L7 8 L13 3" stroke="#808080" fill="none" strokeWidth="1" />
                        </svg>
                        <span style={{ marginRight: '6px' }}>تواصل معنا - Send Message</span>
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
                            نحن هنا لخدمتك - Contact Us
                        </div>

                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {/* Map */}
                            <div style={{ flex: '1', minWidth: '280px' }}>
                                <div style={{
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    backgroundColor: '#000080',
                                    color: 'white',
                                    padding: '2px 6px',
                                    marginBottom: '2px',
                                }}>
                                    موقعنا على الخريطة
                                </div>
                                <div className="win-sunken" style={{ height: '280px', overflow: 'hidden', padding: '0' }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3495.5233240457987!2d46.73276388500245!3d24.59656788417908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDM1JzQ3LjYiTiA0NsKwNDMnNTAuMSJF!5e1!3m2!1sar!2seg!4v1767290878292!5m2!1sar!2seg"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, display: 'block' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="موقعنا على الخريطة"
                                    />
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div style={{ flex: '1', minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    backgroundColor: '#000080',
                                    color: 'white',
                                    padding: '2px 6px',
                                }}>
                                    معلومات الاتصال
                                </div>

                                {contactInfo.map((info) => (
                                    <div key={info.title} className="win-raised" style={{ padding: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                            <span style={{ fontSize: '18px', flexShrink: 0 }}>{info.icon}</span>
                                            <div>
                                                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080', marginBottom: '2px' }}>
                                                    {info.title}
                                                </div>
                                                {info.href ? (
                                                    <a href={info.href} style={{ fontSize: '12px', color: '#000000', textDecoration: 'none', fontWeight: 'bold' }}>
                                                        {info.content}
                                                    </a>
                                                ) : (
                                                    <div style={{ fontSize: '12px', color: '#000000' }}>{info.content}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* WhatsApp contact button */}
                                <a
                                    href="https://wa.me/966541540047"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '6px 12px',
                                        backgroundColor: '#008000',
                                        color: 'white',
                                        borderTop: '2px solid #00cc00',
                                        borderLeft: '2px solid #00cc00',
                                        borderBottom: '2px solid #004000',
                                        borderRight: '2px solid #004000',
                                        fontSize: '12px',
                                        fontFamily: 'Tahoma, sans-serif',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    تواصل عبر واتساب
                                </a>

                                <a
                                    href="tel:+966541540047"
                                    style={{
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '6px 12px',
                                        backgroundColor: '#d4d0c8',
                                        color: '#000000',
                                        borderTop: '2px solid white',
                                        borderLeft: '2px solid white',
                                        borderBottom: '2px solid #808080',
                                        borderRight: '2px solid #808080',
                                        fontSize: '12px',
                                        fontFamily: 'Tahoma, sans-serif',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    اتصل الآن: 966541540047+
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="win-statusbar">
                        <span>متاح للخدمة السبت - الخميس من 9 صباحاً حتى 10 مساءً</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
