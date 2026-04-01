'use client';

import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: 'هل توفرون خدمة التركيب؟',
        answer: 'نعم، نوفر خدمة تركيب احترافية لجميع منتجاتنا من موكيت وسجاد وباركيه وأرضيات. فريقنا المتخصص يضمن تركيباً متقناً وسريعاً مع ضمان شامل على جودة العمل.'
    },
    {
        question: 'هل التوصيل مجاني داخل الرياض؟',
        answer: 'نعم، التوصيل مجاني داخل مدينة الرياض للطلبات. كما نوفر خدمة التوصيل لجميع مناطق المملكة العربية السعودية برسوم رمزية.'
    },
    {
        question: 'ما هي أنواع الموكيت المتوفرة لديكم؟',
        answer: 'نوفر تشكيلة واسعة تشمل: موكيت مساجد، موكيت منازل، موكيت مكاتب، موكيت تركي مشجر، موكيت فنادق، وموكيت مقاوم للماء. جميع منتجاتنا من أجود الماركات العالمية.'
    },
    {
        question: 'هل تقدمون ضمان على المنتجات؟',
        answer: 'نعم، جميع منتجاتنا تأتي بضمان شامل يتراوح من سنة إلى 5 سنوات حسب نوع المنتج. الضمان يغطي عيوب التصنيع وثبات الألوان.'
    },
    {
        question: 'هل يمكنني معاينة العينات قبل الشراء؟',
        answer: 'بالتأكيد! نوفر خدمة معاينة العينات مجاناً. يمكنك زيارة معرضنا في الرياض أو طلب إرسال عينات لمنزلك لاختيار اللون والتصميم المناسب.'
    },
    {
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'نقبل جميع طرق الدفع: نقداً، تحويل بنكي، مدى، فيزا، ماستركارد، وإمكانية التقسيط. كما نوفر خيار الدفع عند الاستلام.'
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section id="faq" style={{ backgroundColor: '#d4d0c8', padding: '8px', fontFamily: 'Tahoma, sans-serif' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="win-window">
                    <div className="win-titlebar">
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
                            <circle cx="7" cy="7" r="6" fill="#c0c0c0" stroke="#808080" />
                            <text x="7" y="11" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#000080">?</text>
                        </svg>
                        <span style={{ marginRight: '6px' }}>الأسئلة الشائعة - تعليمات ومعلومات</span>
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
                            كل ما تريد معرفته عن موكيت ومفروشات السريع
                        </div>

                        {/* Two-column layout: FAQ list on right, answer on left */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {/* Questions list */}
                            <div style={{ minWidth: '240px', flex: '0 0 240px' }}>
                                <div style={{
                                    backgroundColor: '#000080',
                                    color: 'white',
                                    padding: '2px 6px',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    marginBottom: '2px',
                                }}>
                                    قائمة الأسئلة
                                </div>
                                <div className="win-sunken" style={{ backgroundColor: 'white', padding: '0' }}>
                                    {faqData.map((faq, index) => (
                                        <div
                                            key={index}
                                            className="win-listitem"
                                            onClick={() => toggleFAQ(index)}
                                            style={{
                                                backgroundColor: openIndex === index ? '#000080' : undefined,
                                                color: openIndex === index ? 'white' : '#000000',
                                                borderBottom: '1px solid #e8e8e8',
                                                padding: '4px 8px',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <span style={{ marginLeft: '6px', color: openIndex === index ? '#ffff00' : '#000080' }}>?</span>
                                            {faq.question}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Answer panel */}
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <div style={{
                                    backgroundColor: '#000080',
                                    color: 'white',
                                    padding: '2px 6px',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    marginBottom: '2px',
                                }}>
                                    الإجابة
                                </div>
                                <div className="win-sunken" style={{
                                    backgroundColor: 'white',
                                    padding: '12px',
                                    minHeight: '180px',
                                    fontSize: '12px',
                                    lineHeight: 1.7,
                                    color: '#000000',
                                }}>
                                    {openIndex !== null ? (
                                        <>
                                            <div style={{
                                                fontWeight: 'bold',
                                                color: '#000080',
                                                marginBottom: '8px',
                                                borderBottom: '1px solid #c0c0c0',
                                                paddingBottom: '4px',
                                                fontSize: '13px',
                                            }}>
                                                {faqData[openIndex].question}
                                            </div>
                                            <p>{faqData[openIndex].answer}</p>
                                        </>
                                    ) : (
                                        <span style={{ color: '#808080', fontStyle: 'italic' }}>
                                            اختر سؤالاً من القائمة على اليمين لعرض الإجابة
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div style={{
                            marginTop: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px',
                            borderTop: '1px solid #808080',
                        }}>
                            <span style={{ fontSize: '12px' }}>لم تجد إجابة سؤالك؟</span>
                            <a
                                href="https://wa.me/966541540047?text=السلام عليكم، لدي استفسار..."
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
                                    fontWeight: 'bold',
                                }}
                            >
                                تواصل معنا عبر واتساب
                            </a>
                        </div>
                    </div>

                    <div className="win-statusbar">
                        <span>{faqData.length} سؤال وجواب</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
