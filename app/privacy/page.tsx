import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageView } from '@/components/motion/PageView';
import { ADDRESS, BRAND_NAME, LEGAL_NAME, NATIONAL_ADDRESS, PHONE_DISPLAY, PHONE2_DISPLAY, UNIFIED_NUMBER, VAT_NUMBER } from '@/lib/contact';
import type { CSSProperties } from 'react';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

export const metadata: Metadata = {
    title: 'سياسة الخصوصية',
    description: `كيف يتعامل موقع ${BRAND_NAME} مع بياناتك: التواصل بالهاتف وواتساب، المساعد الآلي، وأدوات قياس الزيارات والإعلانات.`,
    alternates: {
        canonical: `${baseUrl}/privacy`,
    },
};

// Each statement matches what the site actually does (lib/chat, app/layout.tsx,
// components/analytics). Change this page when any of those changes.
const sections: { title: string; body: string[] }[] = [
    {
        title: 'من نحن',
        body: [
            `هذا الموقع (www.mokeet-elsuarye.com) خاص بـ${BRAND_NAME}، معرض موكيت وأرضيات في الرياض، التابع لـ${LEGAL_NAME} (الرقم الوطني الموحد ${UNIFIED_NUMBER}، الرقم الضريبي ${VAT_NUMBER}).`,
            `العنوان: ${ADDRESS} (العنوان الوطني ${NATIONAL_ADDRESS}). الهاتف: ${PHONE_DISPLAY} و${PHONE2_DISPLAY}.`,
        ],
    },
    {
        title: 'البيانات التي نحصل عليها',
        body: [
            'لا يحتاج الموقع إلى تسجيل حساب، ولا يتم الدفع من خلاله.',
            'عندما تتصل بنا أو تراسلنا على واتساب نحصل على رقمك وما ترسله لنا من مقاسات أو صور، ونستخدمها فقط للرد على استفسارك وترتيب المعاينة وإرسال عرض السعر.',
        ],
    },
    {
        title: 'المساعد الآلي في الموقع',
        body: [
            'الرسائل التي تكتبها في نافذة المساعد تُرسل إلى خدمة ذكاء اصطناعي (Google Gemini، وCloudflare Workers AI عند تعطلها) لكتابة الرد، ولا نحفظ نص المحادثة في قاعدة بيانات لدينا.',
            'لا تكتب في المحادثة بيانات حساسة مثل أرقام الهوية أو البطاقات.',
        ],
    },
    {
        title: 'قياس الزيارات والإعلانات',
        body: [
            'نستخدم Google Analytics وأداة قياس إعلانات Google وTikTok Pixel وCloudflare Web Analytics لمعرفة عدد الزيارات، وهل جاء الزائر من إعلان، وهل ضغط زر الاتصال أو واتساب.',
            'هذه الأدوات قد تحفظ ملفات تعريف الارتباط (كوكيز) أو معرّفات في متصفحك. لا نبيع بياناتك ولا نشاركها لأي غرض آخر.',
            'يمكنك حذف ملفات تعريف الارتباط أو منعها من إعدادات المتصفح، والتحكم في إعلانات Google المخصصة من adssettings.google.com.',
        ],
    },
    {
        title: 'طلب حذف بياناتك',
        body: [
            `لحذف رقمك أو رسائلك من سجلات التواصل لدينا، تواصل معنا على ${PHONE_DISPLAY}.`,
        ],
    },
];

export default function PrivacyPage() {
    const breadcrumb = [
        { label: 'الرئيسية', href: '/' },
        { label: 'سياسة الخصوصية' },
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <PageView>
                <div className="pt-[var(--header-full)]">
                    <div className="container mx-auto px-4 lg:px-8 py-4">
                        <Breadcrumb items={breadcrumb} />
                    </div>
                    <main className="container mx-auto px-4 lg:px-8 pb-16 max-w-3xl">
                        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-3">سياسة الخصوصية</h1>
                        <p className="text-ink-soft text-sm mb-10">آخر تحديث: 23 أكتوبر 2026</p>
                        {sections.map((s, i) => (
                            <section key={s.title} className="mb-8" data-reveal="fade" style={{ '--i': i } as CSSProperties}>
                                <h2 className="font-display text-xl font-semibold text-ink mb-3">{s.title}</h2>
                                {s.body.map((p) => (
                                    <p key={p} className="text-ink-soft leading-loose mb-2">{p}</p>
                                ))}
                            </section>
                        ))}
                    </main>
                </div>
            </PageView>
            <Footer />
            <FloatingButtons />
        </div>
    );
}
