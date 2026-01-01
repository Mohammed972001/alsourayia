'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
    const contactInfo = [
        {
            icon: MapPin,
            title: 'العنوان',
            content: 'الرياض، حي الملقا، طريق الملك فهد',
        },
        {
            icon: Phone,
            title: 'الهاتف',
            content: '0540079507',
        },
        {
            icon: Clock,
            title: 'أوقات العمل',
            content: 'السبت - الخميس: 9:00 صباحاً - 10:00 مساءً',
        },
    ];

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-[#0088FF]/10 text-[#0088FF] rounded-full mb-4">
                        تواصل معنا
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
                        نحن هنا لخدمتك
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        فريقنا المتخصص جاهز للإجابة على استفساراتك ومساعدتك في اختيار المنتج المثالي
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="rounded-xl overflow-hidden shadow-lg h-96"
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
                        </motion.div>

                    </div>
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Contact Cards */}
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-all"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0088FF] to-[#005CB8] flex items-center justify-center text-white flex-shrink-0">
                                    <info.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg text-[#1A1A1A] mb-2">
                                        {info.title}
                                    </h4>
                                    <p className="text-gray-600">{info.content}</p>
                                </div>
                            </motion.div>
                        ))}


                    </motion.div>
                </div>
            </div>
        </section>
    );
}
