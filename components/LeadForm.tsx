'use client';

import { useId, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { products } from '@/lib/products';
import { whatsappLink } from '@/lib/contact';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

/** Products a visitor can ask about; horse rubber is not stocked now. */
const PRODUCT_NAMES = products.filter((p) => p.id !== 'horse-rubber').map((p) => p.name);
const OTHER = 'غير محدد، أحتاج مساعدة في الاختيار';

/** Arabic-Indic (٠-٩) and Eastern Arabic-Indic (۰-۹) digits to ASCII. */
function asciiDigits(value: string): string {
    return value.replace(/[٠-٩۰-۹]/g, (d) => String((d.charCodeAt(0) - (d < '۰' ? 0x0660 : 0x06f0)) % 10));
}

/** A Saudi mobile as 05xxxxxxxx, or null when the number is not one. */
function saudiMobile(value: string): string | null {
    const digits = asciiDigits(value).replace(/[\s\-().]/g, '');
    const m = digits.match(/^(?:\+?966|00966|0)?(5\d{8})$/);
    return m ? `0${m[1]}` : null;
}

/** The message the shop receives; the tracker appends the source («عبر إعلانكم على جوجل» …). */
function composeMessage(name: string, product: string, city: string, note: string, phone: string): string {
    const parts = [`السلام عليكم، أنا ${name}.`, `أريد الاستفسار عن ${product}.`];
    if (city) parts.push(`${city}.`);
    if (note) parts.push(`${note}.`);
    if (phone) parts.push(`رقمي: ${phone}`);
    return parts.join(' ');
}

const field =
    'w-full h-12 rounded-xl border border-line bg-white px-4 text-ink text-sm outline-none transition-colors focus:border-brass focus:ring-2 focus:ring-brass/30 aria-[invalid=true]:border-red-500';

/**
 * Quote request form. It opens WhatsApp with the details written out rather than posting anywhere:
 * there is no mail service or CRM, and the owner reads WhatsApp. The chat opens through a real anchor
 * whose href follows the form as the visitor types, because the conversion tracker only sees anchor
 * clicks; the submit button validates and then clicks that anchor.
 */
export function LeadForm() {
    const id = useId();
    const anchorRef = useRef<HTMLAnchorElement>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [product, setProduct] = useState(PRODUCT_NAMES[0]);
    const [city, setCity] = useState('');
    const [note, setNote] = useState('');
    const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

    const trimmedName = name.trim();
    const mobile = saudiMobile(phone);
    const message = composeMessage(trimmedName, product, city.trim(), note.trim(), mobile ?? '');
    const href = whatsappLink(message);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const next: typeof errors = {};
        if (trimmedName.length < 2) next.name = 'اكتب اسمك من فضلك.';
        if (!mobile) next.phone = 'اكتب رقم جوال سعودي يبدأ بـ 05 (عشرة أرقام).';
        setErrors(next);
        if (next.name || next.phone) return;
        const anchor = anchorRef.current;
        if (!anchor) return;
        anchor.href = href;
        anchor.click();
    };

    return (
        <section id="quote" className="py-16 md:py-28 bg-cream">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <SectionHeading
                        eyebrow="اطلب عرض سعر"
                        title="أرسل طلبك ونرد عليك على الواتساب"
                        description="اكتب بياناتك والمنتج الذي تريده، ويفتح الواتساب والرسالة جاهزة؛ لا يبقى إلا الإرسال."
                    />

                    <form
                        onSubmit={onSubmit}
                        noValidate
                        data-reveal="clip"
                        className="grid gap-4 sm:grid-cols-2 rounded-3xl bg-white border border-line p-6 sm:p-8"
                    >
                        <div data-reveal style={{ '--i': 1 } as CSSProperties}>
                            <label htmlFor={`${id}-name`} className="block text-sm font-semibold text-ink mb-2">الاسم</label>
                            <input
                                id={`${id}-name`}
                                className={field}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                required
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? `${id}-name-error` : undefined}
                            />
                            {errors.name && <p id={`${id}-name-error`} role="alert" className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        <div data-reveal style={{ '--i': 2 } as CSSProperties}>
                            <label htmlFor={`${id}-phone`} className="block text-sm font-semibold text-ink mb-2">رقم الجوال</label>
                            <input
                                id={`${id}-phone`}
                                className={field}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                inputMode="tel"
                                dir="ltr"
                                placeholder="05XXXXXXXX"
                                autoComplete="tel"
                                required
                                aria-invalid={Boolean(errors.phone)}
                                aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
                            />
                            {errors.phone && <p id={`${id}-phone-error`} role="alert" className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
                        </div>

                        <div data-reveal style={{ '--i': 3 } as CSSProperties}>
                            <label htmlFor={`${id}-product`} className="block text-sm font-semibold text-ink mb-2">المنتج</label>
                            <select id={`${id}-product`} className={field} value={product} onChange={(e) => setProduct(e.target.value)}>
                                {PRODUCT_NAMES.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                                <option value={OTHER}>{OTHER}</option>
                            </select>
                        </div>

                        <div data-reveal style={{ '--i': 4 } as CSSProperties}>
                            <label htmlFor={`${id}-city`} className="block text-sm font-semibold text-ink mb-2">
                                المدينة أو الحي <span className="font-normal text-ink-muted">(اختياري)</span>
                            </label>
                            <input
                                id={`${id}-city`}
                                className={field}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                autoComplete="address-level2"
                                placeholder="مثال: الرياض، حي النسيم"
                            />
                        </div>

                        <div className="sm:col-span-2" data-reveal style={{ '--i': 5 } as CSSProperties}>
                            <label htmlFor={`${id}-note`} className="block text-sm font-semibold text-ink mb-2">
                                ملاحظات <span className="font-normal text-ink-muted">(اختياري)</span>
                            </label>
                            <textarea
                                id={`${id}-note`}
                                className={`${field} h-auto min-h-24 py-3 resize-y`}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={3}
                                placeholder="المساحة التقريبية، نوع الأرضية الحالية، الموعد المناسب للمعاينة…"
                            />
                        </div>

                        <div className="sm:col-span-2" data-reveal style={{ '--i': 6 } as CSSProperties}>
                            <button
                                type="submit"
                                className="shine press w-full inline-flex items-center justify-center gap-2.5 h-13 rounded-full bg-whatsapp text-white font-bold text-sm hover:brightness-95 transition"
                            >
                                <WhatsAppIcon className="w-5 h-5" />
                                أرسل الطلب عبر الواتساب
                            </button>
                            {/* The real link the tracker sees. Its text is kept; only the source is appended. */}
                            <a
                                ref={anchorRef}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-keep-text
                                tabIndex={-1}
                                aria-hidden="true"
                                className="hidden"
                            >
                                فتح الواتساب
                            </a>
                            <p className="text-center text-xs text-ink-muted mt-3">
                                معاينة وقياس مجاناً وعينة مجانية قبل الطلب. لا نحفظ بياناتك على الموقع؛ تذهب إلى الواتساب فقط.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
