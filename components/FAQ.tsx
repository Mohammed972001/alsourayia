'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { whatsappLink } from '@/lib/contact';

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
        <section id="faq" className="py-16 md:py-28 bg-cream">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading
                    eyebrow="لديك سؤال؟"
                    title="الأسئلة الشائعة"
                    description="إجابات على أكثر الأسئلة شيوعاً حول خدماتنا ومنتجاتنا"
                />

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqData.map((faq, index) => {
                        const open = openIndex === index;
                        return (
                            <div
                                key={index}
                                data-reveal
                                style={{ '--d': `${Math.min(index, 3) * 60}ms` } as React.CSSProperties}
                                className={`rounded-2xl border bg-white transition-all duration-300 ${
                                    open ? 'border-ink/15 shadow-[0_14px_36px_-22px_rgba(20,20,20,0.4)]' : 'border-line'
                                }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-right"
                                    aria-expanded={open}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <span className="flex items-baseline gap-3">
                                        <span className="text-xs text-brass-deep tabular-nums">0{index + 1}</span>
                                        <span className="font-display text-base md:text-lg font-semibold text-ink">{faq.question}</span>
                                    </span>
                                    <span
                                        className={`w-8 h-8 shrink-0 grid place-items-center rounded-full transition-all duration-300 ${
                                            open ? 'bg-ink text-white rotate-45' : 'bg-cream text-ink'
                                        }`}
                                    >
                                        <Plus size={16} />
                                    </span>
                                </button>
                                <div
                                    id={`faq-answer-${index}`}
                                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-5 md:px-6 pb-6 text-ink-soft leading-loose text-[0.95rem] md:pr-14">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-10 md:mt-12" data-reveal>
                    <p className="text-ink-muted mb-4">لم تجد إجابة سؤالك؟</p>
                    <a
                        href={whatsappLink('السلام عليكم، لدي استفسار...')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-white rounded-full text-sm font-bold hover:bg-ink-soft transition-colors"
                    >
                        <WhatsAppIcon className="w-4 h-4" />
                        تواصل معنا
                    </a>
                </div>
            </div>
        </section>
    );
}
