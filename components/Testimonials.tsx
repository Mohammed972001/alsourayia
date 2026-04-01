'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'أحمد بن سعيد',
            role: 'رجل أعمال',
            rating: 5,
            text: 'خدمة رائعة ومنتجات عالية الجودة. السجاد الذي اشتريته من السُريع  حول منزلي إلى قصر فاخر. أنصح الجميع بالتعامل معهم.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        },
        {
            id: 2,
            name: 'فاطمة العتيبي',
            role: 'مصممة داخلية',
            rating: 5,
            text: 'تعاملت مع السُريع في عدة مشاريع وكانت النتائج دائماً مبهرة. الجودة والاحترافية والالتزام بالمواعيد يجعلهم الخيار الأول لكل مصمم.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        },
        {
            id: 3,
            name: 'خالد المطيري',
            role: 'مالك فندق',
            rating: 5,
            text: 'جهزنا فندقنا بالكامل من خلال السُريع . الأسعار معقولة والجودة ممتازة. فريق العمل محترف ومتعاون جداً.',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        },
        {
            id: 4,
            name: 'نورة الدوسري',
            role: 'ربة منزل',
            rating: 5,
            text: 'السجاد الفارسي الذي اشتريته يفوق توقعاتي. الألوان زاهية والخامة فاخرة. خدمة العملاء ممتازة وساعدوني في اختيار القطع المناسبة.',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        },
    ];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-[#E8D7C3]/10">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-[#1B2B4A]/10 text-[#C49A3C] rounded-full mb-4">
                        آراء العملاء
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
                        ماذا يقول عملاؤنا
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        نفخر بثقة عملائنا ورضاهم التام عن خدماتنا ومنتجاتنا
                    </p>
                </motion.div>

                {/* Main Testimonial Display */}
                <div className="max-w-4xl mx-auto mb-12">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative"
                    >
                        {/* Quote Icon */}
                        <div className="absolute top-8 left-8 text-[#C49A3C]/20">
                            <Quote size={64} />
                        </div>

                        <div className="relative z-10">
                            {/* Rating */}
                            <div className="flex items-center justify-center gap-1 mb-6">
                                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                    <Star key={i} size={24} fill="#C49A3C" className="text-[#C49A3C]" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-xl md:text-2xl text-gray-700 mb-8 text-center leading-relaxed">
                                "{testimonials[activeIndex].text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center justify-center gap-4">
                                <img
                                    src={testimonials[activeIndex].image}
                                    alt={testimonials[activeIndex].name}
                                    className="w-16 h-16 rounded-full object-cover border-4 border-[#C49A3C]"
                                />
                                <div>
                                    <h4 className="text-xl text-[#1A1A1A]">
                                        {testimonials[activeIndex].name}
                                    </h4>
                                    <p className="text-gray-600">{testimonials[activeIndex].role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="p-3 bg-white rounded-full shadow-lg hover:bg-[#1B2B4A] hover:text-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-[#1B2B4A]' : 'w-2 bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextTestimonial}
                            className="p-3 bg-white rounded-full shadow-lg hover:bg-[#1B2B4A] hover:text-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* All Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setActiveIndex(index)}
                            className={`cursor-pointer bg-white rounded-xl shadow-lg p-6 transition-all ${activeIndex === index ? 'ring-2 ring-[#C49A3C]' : ''
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="text-[#1A1A1A]">{testimonial.name}</h4>
                                    <div className="flex items-center gap-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={12} fill="#C49A3C" className="text-[#C49A3C]" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 line-clamp-3">{testimonial.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
