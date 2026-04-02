'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
        <section id="faq" className="py-24 bg-[#F9FAFB]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                        الأسئلة الشائعة
                    </h2>
                    <p className="text-[#6B7280] max-w-2xl mx-auto">
                        إجابات على أكثر الأسئلة شيوعاً حول خدماتنا ومنتجاتنا
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqData.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-5 text-right hover:bg-gray-50 transition-colors"
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className="text-[#1A1A1A]">{faq.question}</span>
                                <ChevronDown
                                    size={20}
                                    className={`text-[#6B7280] flex-shrink-0 transition-transform duration-200 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div
                                id={`faq-answer-${index}`}
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <div className="px-5 pb-5 text-[#4A4A4A] leading-relaxed border-t border-gray-50">
                                    <p className="pt-4">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-[#6B7280] mb-4">لم تجد إجابة سؤالك؟</p>
                    <a
                        href="https://wa.me/966541540047?text=السلام عليكم، لدي استفسار..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-[#1A1A1A] text-white rounded-lg text-sm hover:bg-[#333] transition-colors"
                    >
                        تواصل معنا
                    </a>
                </div>
            </div>
        </section>
    );
}
