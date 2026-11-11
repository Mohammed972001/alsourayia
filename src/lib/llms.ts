import { guides } from "@/content/guides";
import { home } from "@/content/home";
import { collections, hubs, productsIn } from "@/content/products";
import { fullAddress, legalLine, site } from "@/content/site";
import type { CollectionId } from "@/content/types";
import { displayPhone } from "./contact";
import { absoluteUrl } from "./seo";

const ORDER: CollectionId[] = ["carpet", "parquet", "rubber", "special"];

function facts(): string[] {
  return [
    `- الاسم: ${site.name} (${site.nameEn})، ويُختصر «${site.short}».`,
    `- المنشأة: ${legalLine()}.`,
    `- العنوان: ${fullAddress}. الخريطة: ${site.mapUrl}`,
    `- المواعيد: ${site.hoursText}.`,
    `- اتصال وواتساب: ${displayPhone(site.phone)}. خط ثانٍ: ${displayPhone(site.phone2)}.`,
    `- الخدمات: ${site.services.join("، ")}. ${site.areaServedText}.`,
    "- طريقة الطلب: رسالة واتساب بنوع المكان ومقاسه وصورته، أو زيارة المحل. لا يوجد دفع أونلاين.",
    "- تنبيه: «مفروشات موكيت السريع للسجاد» ونطاق moket-elsuarye.com محل آخر لا علاقة له بهذا المحل.",
  ];
}

/** /llms.txt (GEO): a short, factual map of the site for AI assistants, built from the same content as the pages. */
export function llmsShort(): string {
  const groups = ORDER.flatMap((id) => [
    "",
    `## ${collections[id].name}`,
    ...productsIn(id).map((p) => `- [${p.name}](${absoluteUrl(`/products/${p.slug}`)}): ${p.summary}`),
  ]);
  return [
    `# ${site.name}`,
    "",
    `> ${site.about}`,
    "",
    "## بيانات المحل",
    ...facts(),
    ...groups,
    "",
    "## صفحات أخرى",
    ...hubs.map((h) => `- [${h.h1}](${absoluteUrl(`/products/category/${h.slug}`)})`),
    ...guides.map((g) => `- [${g.heading}](${absoluteUrl(`/guides/${g.slug}`)})`),
    `- [الكتالوجات](${absoluteUrl("/catalogs")})`,
    `- [الأسئلة الشائعة](${absoluteUrl("/faq")})`,
    `- [تواصل وزيارة](${absoluteUrl("/contact")})`,
    `- [النسخة الكاملة لهذا الملف](${absoluteUrl("/llms-full.txt")})`,
    "",
  ].join("\n");
}

/** /llms-full.txt: every product with its price, kinds and answers. */
export function llmsFull(): string {
  const products = ORDER.flatMap((id) => productsIn(id));
  const body = products.flatMap((p) => [
    "",
    `## ${p.name}`,
    `الرابط: ${absoluteUrl(`/products/${p.slug}`)}`,
    p.summary,
    p.priceFrom !== null ? `السعر: يبدأ من ${p.priceFrom} ريال للمتر المربع، والسعر النهائي حسب الموديل والكمية بعد القياس.` : "السعر: بعد المعاينة والقياس.",
    ...p.facts.map((f) => `- ${f.label}: ${f.value}`),
    "الأنواع:",
    ...p.kinds.map((k) => `- ${k.name}: ${k.text}`),
    "أسئلة:",
    ...p.faq.map((f) => `- س: ${f.q}\n  ج: ${f.a}`),
  ]);
  return [
    `# ${site.name} — النسخة الكاملة`,
    "",
    `> ${site.about}`,
    "",
    "## بيانات المحل",
    ...facts(),
    "",
    "## أسئلة عامة",
    ...home.faq.map((f) => `- س: ${f.q}\n  ج: ${f.a}`),
    ...body,
    "",
  ].join("\n");
}
