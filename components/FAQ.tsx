import type { CSSProperties } from 'react';
import { Icon } from '@/components/icons/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { whatsappLink } from '@/lib/contact';

interface FAQItem {
    question: string;
    answer: string;
}

/** Only owner-confirmed promises: free inspection and measurement, free sample, supply and installation, delivery to all cities, hours. */
const faqData: FAQItem[] = [
    {
        question: 'هل توفرون خدمة التركيب؟',
        answer: 'نعم، نورّد ونركّب جميع منتجاتنا من موكيت وسجاد وباركيه وفينيل وأرضيات مطاط. نقيس المكان أولاً ثم نركّب في موقعك.',
    },
    {
        question: 'ما الذي توفرونه للمكاتب والشركات؟',
        answer: 'موكيت مكاتب رول وبلاط موكيت (مربعات) للمكاتب والشركات في الرياض، مع معاينة وقياس مجاناً قبل عرض السعر. أرسل مساحة المكتب وصوره على الواتساب لنبدأ.',
    },
    {
        question: 'هل عندكم أرضيات ربل (مطاط)؟',
        answer: 'نعم: ربل جيم للصالات الرياضية، ومطاط دورات المياه ضد الانزلاق. أخبرنا بالمكان والمساحة على الواتساب لنقترح النوع المناسب.',
    },
    {
        question: 'كيف أحصل على عرض سعر؟',
        answer: 'أرسل المقاسات وصور المكان على الواتساب، أو اطلب معاينة وقياس مجاناً. السعر يعتمد على النوع والمساحة وحالة الأرضية.',
    },
    {
        question: 'هل يمكنني معاينة العينات قبل الشراء؟',
        answer: 'نعم، يمكنك زيارة معرضنا في حراج بن قاسم بالرياض، أو طلب عينة مجانية قبل الطلب عبر الواتساب لاختيار اللون والملمس في مكانك.',
    },
    {
        question: 'ما هي أوقات العمل؟',
        answer: 'يومياً من 9 صباحاً حتى 10 مساءً، بالاتصال أو الواتساب.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
};

/**
 * Server component: native <details> items that share a name, so opening one closes the others, and
 * that open smoothly where the browser can animate to content height (app/motion.css `.faq-item`).
 */
export function FAQ() {
    return (
        <section id="faq" className="py-16 md:py-28 bg-cream">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading
                    eyebrow="لديك سؤال؟"
                    title="الأسئلة الشائعة"
                    description="إجابات على أكثر الأسئلة شيوعاً حول خدماتنا ومنتجاتنا"
                />

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqData.map((faq, index) => (
                        <details
                            key={faq.question}
                            name="faq"
                            open={index === 0}
                            data-reveal
                            style={{ '--i': Math.min(index, 3) } as CSSProperties}
                            className="faq-item group rounded-2xl border border-line bg-white open:border-ink/15 open:shadow-[0_14px_36px_-22px_rgba(20,20,20,0.4)] transition-[border-color,box-shadow] duration-300"
                        >
                            <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer w-full flex items-center justify-between gap-4 p-5 md:p-6 text-right rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass">
                                <span className="flex items-baseline gap-3">
                                    <span className="text-xs text-brass-deep tabular-nums">0{index + 1}</span>
                                    <span className="font-display text-base md:text-lg font-semibold text-ink">{faq.question}</span>
                                </span>
                                <span className="w-8 h-8 shrink-0 grid place-items-center rounded-full bg-cream text-ink transition-all duration-300 group-open:bg-ink group-open:text-white group-open:rotate-45">
                                    <Icon name="plus" size={16} />
                                </span>
                            </summary>
                            <p className="px-5 md:px-6 pb-6 text-ink-soft leading-loose text-[0.95rem] md:pr-14">{faq.answer}</p>
                        </details>
                    ))}
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
