'use client';

import { Phone, MapPin } from 'lucide-react';
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

const quickLinks = [
    { name: 'الرئيسية', href: 'home' },
    { name: 'من نحن', href: 'about' },
    { name: 'المنتجات', href: 'products' },
    { name: 'مناطق الخدمة', href: 'service-areas' },
    { name: 'تواصل معنا', href: 'contact' },
];

const productLinks = [
    { name: 'موكيت مساجد', href: 'products' },
    { name: 'أرضيات مكتبية', href: 'products' },
    { name: 'باركيه', href: 'products' },
    { name: 'عشب صناعي', href: 'products' },
    { name: 'أرضيات مطاط', href: 'products' },
];

export function Footer() {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        if (sectionId === 'home') {
            if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.location.href = '/';
            }
            return;
        }
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 72;
            const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        } else {
            window.location.href = `/#${sectionId}`;
        }
    };

    return (
        // Extra bottom padding on phones clears the fixed action bar
        <footer className="relative overflow-hidden grain bg-ink text-white pb-28 lg:pb-8">
            <div className="relative container mx-auto px-4 lg:px-8">
                {/* Quote CTA */}
                <div className="py-12 md:py-16 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right" data-reveal>
                    <div>
                        <p className="text-brass text-sm mb-2">معاينة وقياس مجاناً</p>
                        <h2 className="font-display text-2xl md:text-4xl font-semibold leading-snug">
                            جاهز تجدد أرضياتك؟
                        </h2>
                    </div>
                    <a
                        href={whatsappLink('السلام عليكم، أريد عرض سعر')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brass text-ink font-bold text-sm hover:bg-white transition-colors"
                    >
                        <WhatsAppIcon className="w-5 h-5" />
                        اطلب عرض سعر الآن
                    </a>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 py-12">
                    {/* Company Info */}
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="font-display text-xl font-semibold mb-1">موكيت ومفروشات السريع</h3>
                        <p className="text-white/40 text-xs mb-4">Al-Sari Carpets & Furnishings</p>
                        <p className="text-white/60 text-sm leading-relaxed">
                            متخصصون في توفير أجود أنواع الموكيت والسجاد والمفروشات في الرياض والمملكة العربية السعودية.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm mb-4 text-brass">روابط سريعة</h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={`#${link.href}`}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-white/60 hover:text-white text-sm transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-sm mb-4 text-brass">منتجاتنا</h4>
                        <ul className="space-y-2.5">
                            {productLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={`#${link.href}`}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-white/60 hover:text-white text-sm transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 lg:col-span-1">
                        <h4 className="text-sm mb-4 text-brass">تواصل معنا</h4>
                        <div className="space-y-3">
                            <a href={PHONE_TEL} className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                                <Phone size={14} />
                                <span dir="ltr">{PHONE_DISPLAY}</span>
                            </a>
                            <address className="not-italic flex items-start gap-2 text-white/60 text-sm">
                                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                                <span>{ADDRESS}</span>
                            </address>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-6">
                    <p className="text-white/40 text-xs md:text-sm text-center">
                        &copy; {new Date().getFullYear()} موكيت ومفروشات السريع. جميع الحقوق محفوظة.
                    </p>
                </div>
            </div>
        </footer>
    );
}
