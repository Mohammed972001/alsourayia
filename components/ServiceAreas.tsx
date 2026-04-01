'use client';

import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export function ServiceAreas() {
    const areas = [
        { name: 'الرياض', count: 50 },
        { name: 'جدة', count: 30 },
        { name: 'الدمام', count: 25 },
        { name: 'الخبر', count: 20 },
        { name: 'مكة المكرمة', count: 18 },
        { name: 'المدينة المنورة', count: 15 },
    ];

    return (
        <section id="service-areas" className="py-20 bg-gradient-to-b from-[#E8D7C3]/10 to-white">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-[#1B2B4A]/10 text-[#C49A3C] rounded-full mb-4">
                        مناطق الخدمة
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
                        نخدم جميع مناطق المملكة
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        نفخر بتقديم خدماتنا المميزة في جميع أنحاء المملكة العربية السعودية
                    </p>
                </motion.div>




                {/* Areas List */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    {areas.map((area, index) => (
                        <motion.div
                            key={area.name}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border-r-4 border-[#C49A3C]"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1B2B4A] to-[#0F1A2E] flex items-center justify-center text-white">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl text-[#1A1A1A] mb-1">
                                            {area.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {area.count}+ مشروع مكتمل
                                        </p>
                                    </div>
                                </div>
                                <button className="px-6 py-2 bg-[#1B2B4A]/10 text-[#C49A3C] rounded-lg hover:bg-[#1B2B4A] hover:text-white transition-colors">
                                    اطلب الآن
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>



        </section>
    );
}
