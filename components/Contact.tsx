'use client';

import { MapPin, Phone, Clock } from 'lucide-react';

export function Contact() {
    const contactInfo = [
        {
            icon: MapPin,
            title: 'العنوان',
            content: 'مخرج ٢٢ حراج بن قاسم القديم سوق العرب الدولي، الرياض',
            isAddress: true,
        },
        {
            icon: Phone,
            title: 'الهاتف',
            content: '+966541540047',
            isPhone: true,
        },
        {
            icon: Clock,
            title: 'أوقات العمل',
            content: 'السبت - الخميس: 9:00 صباحاً - 10:00 مساءً',
        },
    ];

    return (
        <section id="contact" className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                        تواصل معنا
                    </h2>
                    <p className="text-[#6B7280] max-w-2xl mx-auto">
                        فريقنا المتخصص جاهز للإجابة على استفساراتك ومساعدتك في اختيار المنتج المثالي
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Map */}
                    <div className="rounded-lg overflow-hidden h-96 bg-gray-100">
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

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {contactInfo.map((info) => (
                            <div key={info.title} className="flex items-start gap-4 p-5 border border-gray-100 rounded-lg">
                                <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                                    <info.icon size={20} className="text-[#4A4A4A]" />
                                </div>
                                <div>
                                    <h4 className="text-sm text-[#1A1A1A] mb-1">{info.title}</h4>
                                    {info.isPhone ? (
                                        <a
                                            href="tel:+966541540047"
                                            className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors"
                                            dir="ltr"
                                        >
                                            {info.content}
                                        </a>
                                    ) : info.isAddress ? (
                                        <address className="not-italic text-[#4A4A4A]">
                                            {info.content}
                                        </address>
                                    ) : (
                                        <p className="text-[#4A4A4A]">{info.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* WhatsApp CTA */}
                        <a
                            href="https://wa.me/966541540047?text=السلام عليكم"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#1A1A1A] text-white rounded-lg text-sm hover:bg-[#333] transition-colors"
                        >
                            تواصل عبر واتساب
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
