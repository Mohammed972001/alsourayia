'use client';

import { useState } from 'react';

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'أحمد بن سعيد',
            role: 'رجل أعمال',
            rating: 5,
            text: 'خدمة رائعة ومنتجات عالية الجودة. السجاد الذي اشتريته من السُريع حول منزلي إلى قصر فاخر. أنصح الجميع بالتعامل معهم.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        },
        {
            id: 2,
            name: 'فاطمة العتيبي',
            role: 'مصممة داخلية',
            rating: 5,
            text: 'تعاملت مع السُريع في عدة مشاريع وكانت النتائج دائماً مبهرة. الجودة والاحترافية والالتزام بالمواعيد يجعلهم الخيار الأول.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        },
        {
            id: 3,
            name: 'خالد المطيري',
            role: 'مالك فندق',
            rating: 5,
            text: 'جهزنا فندقنا بالكامل من خلال السُريع. الأسعار معقولة والجودة ممتازة. فريق العمل محترف ومتعاون جداً.',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        },
        {
            id: 4,
            name: 'نورة الدوسري',
            role: 'ربة منزل',
            rating: 5,
            text: 'السجاد الفارسي الذي اشتريته يفوق توقعاتي. الألوان زاهية والخامة فاخرة. خدمة العملاء ممتازة.',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        },
    ];

    const active = testimonials[activeIndex];

    return (
        <section id="testimonials" style={{ backgroundColor: '#d4d0c8', padding: '8px', fontFamily: 'Tahoma, sans-serif' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="win-window">
                    <div className="win-titlebar">
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
                            <rect x="1" y="1" width="12" height="12" fill="#c0c0c0" stroke="#808080" />
                            <text x="7" y="10" textAnchor="middle" fontSize="8" fill="#000080">★</text>
                        </svg>
                        <span style={{ marginRight: '6px' }}>آراء العملاء - تقييمات موكيت ومفروشات السريع</span>
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
                            ماذا يقول عملاؤنا
                        </div>

                        {/* Active testimonial - Win2000 dialog style */}
                        <div className="win-raised" style={{ padding: '12px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                {/* Avatar */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    flexShrink: 0,
                                    border: '2px solid #808080',
                                    overflow: 'hidden',
                                }}>
                                    <img
                                        src={active.image}
                                        alt={active.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderBottom: '1px solid #808080',
                                        paddingBottom: '4px',
                                        marginBottom: '6px',
                                    }}>
                                        <div>
                                            <strong style={{ fontSize: '13px', color: '#000080' }}>{active.name}</strong>
                                            <span style={{ fontSize: '11px', color: '#666', marginRight: '8px' }}>({active.role})</span>
                                        </div>
                                        <div style={{ color: '#FFD700', fontSize: '14px', letterSpacing: '2px' }}>
                                            {'★'.repeat(active.rating)}
                                        </div>
                                    </div>
                                    <div className="win-sunken" style={{
                                        padding: '8px',
                                        backgroundColor: 'white',
                                        fontSize: '12px',
                                        lineHeight: 1.6,
                                        color: '#000000',
                                    }}>
                                        &ldquo;{active.text}&rdquo;
                                    </div>
                                </div>
                            </div>

                            {/* Navigation buttons */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', marginTop: '8px' }}>
                                <button
                                    onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                                    style={{
                                        padding: '3px 12px',
                                        fontSize: '11px',
                                        fontFamily: 'Tahoma, sans-serif',
                                        cursor: 'pointer',
                                        backgroundColor: '#d4d0c8',
                                        borderTop: '2px solid white',
                                        borderLeft: '2px solid white',
                                        borderBottom: '2px solid #808080',
                                        borderRight: '2px solid #808080',
                                    }}
                                >
                                    &lt; السابق
                                </button>
                                <button
                                    onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                                    style={{
                                        padding: '3px 12px',
                                        fontSize: '11px',
                                        fontFamily: 'Tahoma, sans-serif',
                                        cursor: 'pointer',
                                        backgroundColor: '#d4d0c8',
                                        borderTop: '2px solid white',
                                        borderLeft: '2px solid white',
                                        borderBottom: '2px solid #808080',
                                        borderRight: '2px solid #808080',
                                    }}
                                >
                                    التالي &gt;
                                </button>
                            </div>
                        </div>

                        {/* All testimonials list */}
                        <table className="win-table">
                            <thead>
                                <tr>
                                    <th>اسم العميل</th>
                                    <th>الدور</th>
                                    <th>التقييم</th>
                                    <th>الرأي</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map((t, index) => (
                                    <tr
                                        key={t.id}
                                        onClick={() => setActiveIndex(index)}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: activeIndex === index ? '#000080' : undefined,
                                            color: activeIndex === index ? 'white' : undefined,
                                        }}
                                    >
                                        <td style={{ color: activeIndex === index ? 'white' : '#000080', fontWeight: 'bold' }}>{t.name}</td>
                                        <td style={{ color: activeIndex === index ? 'white' : undefined }}>{t.role}</td>
                                        <td style={{ color: '#FFD700', fontSize: '11px' }}>{'★'.repeat(t.rating)}</td>
                                        <td style={{ color: activeIndex === index ? '#ccc' : '#666' }}>{t.text.substring(0, 50)}...</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="win-statusbar">
                        <span>{testimonials.length} تقييمات | متوسط: 5 نجوم</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
