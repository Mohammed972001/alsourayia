import { MapPin, Phone, Clock, Navigation as NavIcon } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/contact';

const quickActions = [
    { label: 'اتصل بنا', href: PHONE_TEL, icon: Phone, external: false, tone: 'bg-ink text-white' },
    { label: 'واتساب', href: whatsappLink('السلام عليكم'), icon: null, external: true, tone: 'bg-whatsapp text-white' },
    { label: 'الاتجاهات', href: MAPS_URL, icon: NavIcon, external: true, tone: 'bg-white text-ink ring-1 ring-line' },
];

export function Contact() {
    return (
        <section id="contact" className="py-16 md:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading
                    eyebrow="نحن بانتظارك"
                    title="تواصل معنا"
                    description="فريقنا المتخصص جاهز للإجابة على استفساراتك ومساعدتك في اختيار المنتج المثالي"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                    {/* Info first on phones — the map is the least urgent thing here */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2.5 md:gap-3" data-reveal>
                            {quickActions.map((action) => (
                                <a
                                    key={action.label}
                                    href={action.href}
                                    {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    className={`press flex flex-col items-center justify-center gap-2 py-4 rounded-2xl text-xs md:text-sm font-bold transition-transform hover:-translate-y-0.5 ${action.tone}`}
                                >
                                    {action.icon ? <action.icon size={20} /> : <WhatsAppIcon className="w-5 h-5" />}
                                    {action.label}
                                </a>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-line divide-y divide-line" data-reveal>
                            <div className="flex items-start gap-4 p-5">
                                <span className="w-11 h-11 shrink-0 grid place-items-center rounded-xl bg-cream text-brass-deep">
                                    <MapPin size={20} />
                                </span>
                                <div>
                                    <h3 className="text-sm font-bold text-ink mb-1">العنوان</h3>
                                    <address className="not-italic text-ink-soft text-sm leading-relaxed">{ADDRESS}</address>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-5">
                                <span className="w-11 h-11 shrink-0 grid place-items-center rounded-xl bg-cream text-brass-deep">
                                    <Phone size={20} />
                                </span>
                                <div>
                                    <h3 className="text-sm font-bold text-ink mb-1">الهاتف</h3>
                                    <a href={PHONE_TEL} className="text-ink-soft hover:text-ink transition-colors" dir="ltr">
                                        {PHONE_DISPLAY}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-5">
                                <span className="w-11 h-11 shrink-0 grid place-items-center rounded-xl bg-cream text-brass-deep">
                                    <Clock size={20} />
                                </span>
                                <div>
                                    <h3 className="text-sm font-bold text-ink mb-1">أوقات العمل</h3>
                                    <p className="text-ink-soft text-sm">السبت - الخميس: 9:00 صباحاً - 10:00 مساءً</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="rounded-2xl overflow-hidden h-72 md:h-96 lg:h-auto lg:min-h-[26rem] bg-cream ring-1 ring-line" data-reveal="fade">
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
