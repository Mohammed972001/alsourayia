'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

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

    // FAQ Schema for SEO
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
        <section id="faq" className="py-20 bg-gradient-to-b from-white to-[#E6F5FF]/30">
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0088FF]/10 text-[#0088FF] rounded-full mb-4">
                        <HelpCircle size={18} />
                        الأسئلة الشائعة
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
                        كل ما تريد معرفته عن <span className="text-[#0088FF]">موكيت ومفروشات السريع</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        إجابات على أكثر الأسئلة شيوعاً حول خدماتنا ومنتجاتنا من الموكيت والسجاد والمفروشات في الرياض
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="mb-4"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className={`w-full flex items-center justify-between p-5 rounded-xl transition-all ${openIndex === index
                                        ? 'bg-[#0088FF] text-white shadow-lg'
                                        : 'bg-white text-[#1A1A1A] shadow-md hover:shadow-lg'
                                    }`}
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className="text-lg font-medium text-right">{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown size={24} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        id={`faq-answer-${index}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-5 bg-white rounded-b-xl shadow-inner border-t border-gray-100">
                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600 mb-4">لم تجد إجابة سؤالك؟</p>
                    <a
                        href="https://wa.me/966540079507?text=السلام عليكم، لدي استفسار..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-colors shadow-lg hover:shadow-xl"
                    >
                        تواصل معنا عبر واتساب
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
