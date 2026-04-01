'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift } from 'lucide-react';

export function WelcomePopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    const handleClose = () => setIsVisible(false);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 left-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                        <X size={20} className="text-gray-700" />
                    </button>

                    {/* Header with Gradient */}
                    <div className="bg-gradient-to-br from-[#0088FF] to-[#005CB8] p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg"
                        >
                            <Gift size={40} className="text-[#0088FF]" />
                        </motion.div>
                        <h3 className="text-2xl text-white mb-2">
                            مرحباً بك في السريع
                        </h3>
                        <p className="text-white/90">
                            عرض خاص للزوار الجدد
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="text-center mb-6">
                            <div className="inline-block px-6 py-3 bg-[#0088FF]/10 rounded-full mb-4">
                                <span className="text-3xl text-[#0088FF]">خصم 15%</span>
                            </div>
                            <p className="text-gray-700 mb-2">
                                على جميع منتجات السجاد الفاخر
                            </p>
                            <p className="text-gray-600">
                                صالح للطلبات التي تزيد عن 5000 ريال
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3 mb-6">
                            {[
                                'شحن مجاني لجميع المناطق',
                                'استشارة مجانية مع مصمم داخلي',
                                'ضمان الجودة لمدة عامين',
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#0088FF]/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-[#0088FF]" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="space-y-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleClose}
                                className="w-full px-6 py-3 bg-[#0088FF] text-white rounded-lg hover:bg-[#005CB8] transition-colors shadow-lg"
                            >
                                احصل على الخصم الآن
                            </motion.button>
                            <button
                                onClick={handleClose}
                                className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                ربما لاحقاً
                            </button>
                        </div>

                        {/* Promo Code */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-[#0088FF]/30">
                            <p className="text-center text-gray-600 mb-2">
                                استخدم الكود:
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <code className="px-4 py-2 bg-white rounded text-[#0088FF] border border-[#0088FF]/30">
                                    WELCOME15
                                </code>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        navigator.clipboard.writeText('WELCOME15');
                                    }}
                                    className="px-3 py-2 bg-[#0088FF] text-white rounded hover:bg-[#005CB8] transition-colors"
                                >
                                    نسخ
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
