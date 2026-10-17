// What the chat assistant is allowed to know: built from the same data the pages render
// (products and category copy), so a fact changed there reaches the assistant on the next
// deploy. The home FAQ is left out on purpose: it carries unconfirmed claims (instalments,
// free samples at home).
import { ADDRESS, PHONE2_DISPLAY, PHONE_DISPLAY, whatsappLink } from "@/lib/contact";
import { categoryContent, products } from "@/lib/products";
import type { ChatSite } from "./core";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mokeet-elsuarye.com";
const NAME = "موكيت ومفروشات السريع";

const lines: string[] = [
  `# ${NAME}`,
  `الهاتف وواتساب: ${PHONE_DISPLAY} · ${PHONE2_DISPLAY}`,
  `العنوان: ${ADDRESS}`,
  "",
  "## المنتجات",
];

for (const p of products) {
  lines.push(
    `### ${p.name} (${p.category}) — ${SITE_URL}/products/${p.id}`,
    p.description,
    p.detailedDescription,
    ...p.features.map((f) => `- ${f}`),
    ...(p.faqs ?? []).map((f) => `س: ${f.question}\nج: ${f.answer}`),
    "",
  );
}

lines.push("## الأقسام");
for (const [slug, c] of Object.entries(categoryContent)) {
  lines.push(`### ${c.heading} — ${SITE_URL}/products/category/${slug}`, c.intro, ...c.items.map((i) => `- ${i.label}: ${i.text}`), c.outro, "");
}

lines.push("", "## صفحات أخرى", `- كل المنتجات: ${SITE_URL}/products`, `- مناطق الخدمة: ${SITE_URL}/service-areas`, `- التواصل: ${SITE_URL}/contact`);

export const CHAT_SITE: ChatSite = {
  name: NAME,
  niche: "أرضيات متخصصة في الرياض، وأولها الربل: ربل جيم ومطاط دورات المياه ومطاط الخيل، مع الموكيت",
  phone: PHONE_DISPLAY,
  whatsappUrl: whatsappLink(),
  knowledge: lines.join("\n"),
};
