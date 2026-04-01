'use client';

export function FloatingButtons() {
    return (
        <>
            {/* WhatsApp - Win2000 style floating panel */}
            <div
                style={{
                    position: 'fixed',
                    left: '12px',
                    bottom: '60px',
                    zIndex: 40,
                    fontFamily: 'Tahoma, sans-serif',
                }}
            >
                <a
                    href="https://wa.me/966541540047"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="تواصل عبر واتساب"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        backgroundColor: '#d4d0c8',
                        textDecoration: 'none',
                        color: '#000000',
                        fontSize: '11px',
                        borderTop: '2px solid white',
                        borderLeft: '2px solid white',
                        borderBottom: '2px solid #808080',
                        borderRight: '2px solid #808080',
                        fontWeight: 'bold',
                        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                >
                    <span style={{ fontSize: '14px' }}>💬</span>
                    واتساب
                </a>
            </div>

            {/* Call button */}
            <div
                style={{
                    position: 'fixed',
                    right: '12px',
                    bottom: '60px',
                    zIndex: 40,
                    fontFamily: 'Tahoma, sans-serif',
                }}
            >
                <a
                    href="tel:+966541540047"
                    title="اتصل الآن"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        backgroundColor: '#d4d0c8',
                        textDecoration: 'none',
                        color: '#000000',
                        fontSize: '11px',
                        borderTop: '2px solid white',
                        borderLeft: '2px solid white',
                        borderBottom: '2px solid #808080',
                        borderRight: '2px solid #808080',
                        fontWeight: 'bold',
                        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                >
                    <span style={{ fontSize: '14px' }}>📞</span>
                    اتصل الآن
                </a>
            </div>

            {/* Scroll to top */}
            <button
                onClick={() => window.scrollTo({ top: 0 })}
                title="العودة للأعلى"
                style={{
                    position: 'fixed',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: '12px',
                    zIndex: 40,
                    padding: '3px 10px',
                    backgroundColor: '#d4d0c8',
                    color: '#000000',
                    fontSize: '11px',
                    fontFamily: 'Tahoma, sans-serif',
                    cursor: 'pointer',
                    borderTop: '2px solid white',
                    borderLeft: '2px solid white',
                    borderBottom: '2px solid #808080',
                    borderRight: '2px solid #808080',
                    boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
            >
                ▲ أعلى الصفحة
            </button>
        </>
    );
}
