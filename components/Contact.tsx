import type { CSSProperties } from 'react';
import { MapPin, Phone, Clock, Navigation as NavIcon } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, PHONE2_DISPLAY, PHONE2_TEL, whatsappLink } from '@/lib/contact';

const quickActions = [
    { label: 'اتصل بنا', href: PHONE_TEL, icon: Phone, external: false, tone: 'bg-ink text-white' },
    { label: 'واتساب', href: whatsappLink('السلام عليكم'), icon: null, external: true, tone: 'shine bg-whatsapp text-white' },
    { label: 'الاتجاهات', href: MAPS_URL, icon: NavIcon, external: true, tone: 'bg-white text-ink ring-1 ring-line' },
];

const rows = [
    { icon: MapPin, title: 'العنوان' },
    { icon: Phone, title: 'الهاتف' },
    { icon: Clock, title: 'أوقات العمل' },
];

export function Contact({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
    return (
        <section id="contact" className="py-16 md:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading
                    as={headingAs}
                    eyebrow="نحن بانتظارك"
                    title="تواصل معنا"
                    description="نرد على الواتساب والهاتف يومياً من 9 صباحاً حتى 10 مساءً، ونرتب معك المعاينة والقياس مجاناً"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                    {/* Info first on phones; the map is the least urgent thing here */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2.5 md:gap-3">
                            {quickActions.map((action, i) => (
                                <a
                                    key={action.label}
                                    href={action.href}
                                    {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    data-reveal="pop"
                                    style={{ '--i': i } as CSSProperties}
                                    className={`press flex flex-col items-center justify-center gap-2 py-4 rounded-2xl text-xs md:text-sm font-bold transition-transform hover:-translate-y-0.5 ${action.tone}`}
                                >
                                    {action.icon ? <action.icon size={20} /> : <WhatsAppIcon className="w-5 h-5" />}
                                    {action.label}
                                </a>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-line divide-y divide-line">
                            {rows.map((row, i) => (
                                <div key={row.title} className="flex items-start gap-4 p-5" data-reveal="slide" style={{ '--i': 3 + i } as CSSProperties}>
                                    <span className="w-11 h-11 shrink-0 grid place-items-center rounded-xl bg-cream text-brass-deep">
                                        <row.icon size={20} />
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-bold text-ink mb-1">{row.title}</h3>
                                        {i === 0 && <address className="not-italic text-ink-soft text-sm leading-relaxed">{ADDRESS}</address>}
                                        {i === 1 && (
                                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                <a href={PHONE_TEL} className="text-ink-soft hover:text-ink transition-colors" dir="ltr">
                                                    {PHONE_DISPLAY}
                                                </a>
                                                <a href={PHONE2_TEL} className="text-ink-soft hover:text-ink transition-colors" dir="ltr">
                                                    {PHONE2_DISPLAY}
                                                </a>
                                            </div>
                                        )}
                                        {i === 2 && <p className="text-ink-soft text-sm">يومياً: 9:00 صباحاً - 10:00 مساءً</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map */}
                    <div
                        className="rounded-2xl overflow-hidden h-72 md:h-96 lg:h-auto lg:min-h-[26rem] bg-cream ring-1 ring-line"
                        data-reveal="wipe"
                        style={{ '--i': 2 } as CSSProperties}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3495.5233240457987!2d46.73276388500245!3d24.59656788417908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDM1JzQ3LjYiTiA0NsKwNDMnNTAuMSJF!5e1!3m2!1sar!2seg!4v1767290878292!5m2!1sar!2seg"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="موقعنا على الخريطة"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
