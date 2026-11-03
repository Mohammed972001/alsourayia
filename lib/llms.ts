// Plain-text summaries for AI assistants (T033, research R6): /llms.txt and /llms-full.txt.
// Built only from data/business.ts, the product data and the product/hub FAQs, so they say
// nothing the pages do not. The home FAQ is left out on purpose (see lib/chat/knowledge.ts).
import {
    ADDRESS, AREA_SERVED_TEXT, BRAND_LATIN, BRAND_NAME, BRAND_SHORT, EMAIL, HOURS_TEXT, LEGAL_NAME, MAPS_URL,
    NATIONAL_ADDRESS, PHONE2_DISPLAY, PHONE_DISPLAY, POSTAL_CODE, SERVICES, SITE_URL, UNIFIED_NUMBER, VAT_NUMBER,
    WHATSAPP_NUMBER,
} from '@/data/business';
import { guides } from '@/data/guides';
import { productsDetails } from '@/data/products';
import { categoryContent, categorySlugMap, getCategoryFromId, hubCategorySlugs } from '@/lib/products';


const offered = productsDetails;
const productName = (title: string) => title.split(' - ')[0];

function header(): string[] {
    return [
        `# ${BRAND_NAME}`,
        '',
        `> ${BRAND_NAME} (${BRAND_SHORT}، ${BRAND_LATIN}) معرض موكيت وأرضيات في ${ADDRESS}. ` +
            `يوفّر موكيت المساجد والمكاتب، الباركيه، أرضيات المطاط (ربل جيم ومطاط دورات المياه)، الفينيل والأرضيات الطبية والعشب الصناعي، ` +
            `مع ${SERVICES.join('، ')}. التواصل بالاتصال أو الواتساب على ${PHONE_DISPLAY}، ${HOURS_TEXT}.`,
        '',
        '## معلومات النشاط',
        `- الاسم التجاري: ${BRAND_NAME}`,
        `- المنشأة المالكة: ${LEGAL_NAME} (الرقم الوطني الموحد ${UNIFIED_NUMBER}، الرقم الضريبي ${VAT_NUMBER})`,
        `- العنوان: ${ADDRESS} — العنوان الوطني المختصر ${NATIONAL_ADDRESS}، الرمز البريدي ${POSTAL_CODE}`,
        `- الموقع على الخريطة: ${MAPS_URL}`,
        `- الهاتف وواتساب: ${PHONE_DISPLAY} (واتساب: https://wa.me/${WHATSAPP_NUMBER})`,
        `- رقم ثانٍ للاتصال، وواتساب صفحات الباركيه والمطاط والأرضيات الطبية: ${PHONE2_DISPLAY}`,
        `- البريد: ${EMAIL}`,
        `- أوقات العمل: ${HOURS_TEXT}`,
        `- نطاق الخدمة: ${AREA_SERVED_TEXT}`,
        `- الخدمات: ${SERVICES.join('، ')}`,
        `- الأسعار تبدأ من (للمتر المربع): ${productsDetails.filter((p) => p.startingPriceSar).map((p) => `${p.title.split(' - ')[0]} ${p.startingPriceSar} ريال`).join('، ')}. السعر النهائي حسب المقاس والنوع بعد المعاينة، ويُرسل عرض السعر على الواتساب.`,
        `- الموقع الإلكتروني: ${SITE_URL}`,
        '',
    ];
}

function hubsSection(): string[] {
    return [
        '## الأقسام',
        ...hubCategorySlugs.map((slug) => {
            const c = categoryContent[slug];
            return `- [${c?.heading ?? categorySlugMap[slug]}](${SITE_URL}/products/category/${slug}): ${c?.promise ?? ''}`.trim();
        }),
        '',
    ];
}

function productsSection(): string[] {
    return [
        '## المنتجات',
        ...offered.map((p) => `- [${productName(p.title)}](${SITE_URL}/products/${p.id}): ${p.summary ?? p.metaDescription}`),
        '',
    ];
}

function guidesSection(): string[] {
    return [
        '## أدلة للمشتري',
        ...guides.map((g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.answerSummary}`),
        '',
    ];
}

function pagesSection(): string[] {
    return [
        '## صفحات أخرى',
        `- [كل المنتجات](${SITE_URL}/products)`,
        `- [الكتالوجات](${SITE_URL}/catalogs)`,
        `- [من نحن](${SITE_URL}/about)`,
        `- [مناطق الخدمة والتوصيل](${SITE_URL}/service-areas)`,
        `- [التواصل](${SITE_URL}/contact)`,
        `- [النسخة المفصلة من هذا الملف](${SITE_URL}/llms-full.txt)`,
        '',
    ];
}

export function llmsText(): string {
    return [...header(), ...hubsSection(), ...productsSection(), ...guidesSection(), ...pagesSection()].join('\n');
}

export function llmsFullText(): string {
    const lines = [...header(), ...hubsSection()];

    for (const slug of hubCategorySlugs) {
        const c = categoryContent[slug];
        if (!c) continue;
        lines.push(`## ${c.heading}`, `${SITE_URL}/products/category/${slug}`, '', c.intro, '');
        for (const item of c.items) {
            lines.push(`- [${item.label}](${SITE_URL}/products/${item.productId}): ${item.text}`);
        }
        lines.push('', `### ${c.comparison.heading}`, ...c.comparison.paragraphs, '');
        if (c.faqs.length) {
            lines.push('### أسئلة شائعة', ...c.faqs.flatMap((f) => [`س: ${f.question}`, `ج: ${f.answer}`, '']));
        }
    }

    for (const p of offered) {
        const name = productName(p.title);
        lines.push(
            `## ${name} (${getCategoryFromId(p.id)})`,
            `${SITE_URL}/products/${p.id}`,
            '',
            p.description,
            '',
            ...p.features.map((f) => `- ${f}`),
            '',
        );
        if (p.faqs?.length) {
            lines.push('### أسئلة شائعة', ...p.faqs.flatMap((f) => [`س: ${f.question}`, `ج: ${f.answer}`, '']));
        }
    }

    lines.push(...guidesSection(), ...pagesSection());
    return lines.join('\n');
}
