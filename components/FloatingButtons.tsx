'use client';

import { motion } from 'motion/react';
import { MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';

export function FloatingButtons() {
    const [showTooltip, setShowTooltip] = useState({ whatsapp: false, call: false });

    return (
        <>
            {/* WhatsApp Button - Left Side */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="fixed left-6 bottom-24 z-40"
                onMouseEnter={() => setShowTooltip({ ...showTooltip, whatsapp: true })}
                onMouseLeave={() => setShowTooltip({ ...showTooltip, whatsapp: false })}
            >
                <motion.a
                    href="https://wa.me/966540079507"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all relative group"
                >
                    <MessageCircle size={28} />

                    {/* Pulse Animation */}
                    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></span>

                    {/* Tooltip */}
                    {showTooltip.whatsapp && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute right-full mr-4 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg whitespace-nowrap shadow-lg"
                        >
                            تواصل عبر واتساب
                            <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#1A1A1A]"></div>
                        </motion.div>
                    )}
                </motion.a>
            </motion.div>

            {/* Call Button - Right Side */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="fixed right-6 bottom-24 z-40"
                onMouseEnter={() => setShowTooltip({ ...showTooltip, call: true })}
                onMouseLeave={() => setShowTooltip({ ...showTooltip, call: false })}
            >
                <motion.a
                    href="tel:+966540079507"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-16 h-16 bg-[#0088FF] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all relative group"
                >
                    <Phone size={28} />

                    {/* Pulse Animation */}
                    <span className="absolute inset-0 rounded-full bg-[#0088FF] animate-ping opacity-30"></span>

                    {/* Tooltip */}
                    {showTooltip.call && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute left-full ml-4 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg whitespace-nowrap shadow-lg"
                        >
                            اتصل الآن
                            <div className="absolute top-1/2 -translate-y-1/2 right-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#1A1A1A]"></div>
                        </motion.div>
                    )}
                </motion.a>
            </motion.div>

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed left-1/2 -translate-x-1/2 bottom-6 z-40 flex items-center justify-center w-12 h-12 bg-white text-[#0088FF] rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-[#0088FF]"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </motion.button>
        </>
    );
}
