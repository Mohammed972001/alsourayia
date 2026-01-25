'use client';

import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export function Footer() {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const footerLinks = {
        navigation: {
            title: 'روابط سريعة',
            links: [
                { name: 'الرئيسية', href: 'home' },
                { name: 'من نحن', href: 'about' },
                { name: 'المنتجات', href: 'products' },
                { name: 'مناطق الخدمة', href: 'service-areas' },
                { name: 'تواصل معنا', href: 'contact' },
            ],
        },
        products: {
            title: 'منتجاتنا',
            links: [
                { name: 'موكيت مساجد', href: 'products' },
                { name: 'أرضيات مكتبية', href: 'products' },
                { name: 'باركيه', href: 'products' },
                { name: 'عشب صناعي', href: 'products' },
                { name: 'موكيت فاخر', href: 'products' },
            ],
        },
        services: {
            title: 'خدماتنا',
            links: [
                { name: 'تنسيق حدائق', href: 'products' },
                { name: 'شلالات ونوافير', href: 'products' },
                { name: 'أرضيات طبية', href: 'products' },
                { name: 'فينيل مساجد', href: 'products' },
                { name: 'تركيب احترافي', href: 'contact' },
            ],
        },
    };

    return (
        <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="text-[#0088FF]">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                                        <path d="M20 2L35 12L35 28L20 38L5 28L5 12L20 2Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl">موكيت ومفروشات السريع</h3>
                                    <p className="text-[#0088FF]">Al-Sari Carpets & Furnishings</p>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-6">
                                متخصصون في توفير أجود أنواع الموكيت والسجاد والمفروشات في الرياض والمملكة العربية السعودية.
                                نقدم منتجات عالية الجودة مع خدمة تركيب احترافية وضمان شامل.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3 mb-6">
                                <a href="tel:+966541540047" className="flex items-center gap-3 text-gray-400 hover:text-[#0088FF] transition-colors">
                                    <Phone size={18} />
                                    <span dir="ltr">+966 541 540 047</span>
                                </a>
                                <a href="https://wa.me/966541540047" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-[#25D366] transition-colors">
                                    <MessageCircle size={18} />
                                    <span>واتساب</span>
                                </a>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <MapPin size={18} />
                                    <span>الرياض، المملكة العربية السعودية</span>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="flex items-center gap-4">
                                {[
                                    { name: 'واتساب', icon: '💬', href: 'https://wa.me/966541540047' },
                                    { name: 'Instagram', icon: '📷', href: '#' },
                                    { name: 'Twitter', icon: '𝕏', href: '#' },
                                ].map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target={social.href.startsWith('http') ? '_blank' : undefined}
                                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0088FF] transition-colors"
                                    >
                                        <span className="text-lg">{social.icon}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer Links */}
                    {Object.entries(footerLinks).map(([key, section], index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <h4 className="text-lg mb-4 text-[#0088FF]">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={`#${link.href}`}
                                            onClick={(e) => scrollToSection(e, link.href)}
                                            className="text-gray-400 hover:text-[#0088FF] transition-colors inline-block hover:translate-x-1"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-center md:text-right">
                            © 2025 موكيت ومفروشات السريع. جميع الحقوق محفوظة.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-400 hover:text-[#0088FF] transition-colors">
                                من نحن
                            </a>
                            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-gray-400 hover:text-[#0088FF] transition-colors">
                                تواصل معنا
                            </a>
                            <a href="#products" onClick={(e) => scrollToSection(e, 'products')} className="text-gray-400 hover:text-[#0088FF] transition-colors">
                                المنتجات
                            </a>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-4 mt-8"
                    >
                        <span className="text-gray-400">نخدم:</span>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'].map((city) => (
                                <span
                                    key={city}
                                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                                >
                                    {city}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
