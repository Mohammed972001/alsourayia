'use client';

import { MessageCircle, Phone } from 'lucide-react';

export function FloatingButtons() {
    return (
        <>
            {/* WhatsApp */}
            <a
                href="https://wa.me/966541540047"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل عبر واتساب"
                className="fixed left-5 bottom-5 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
                <MessageCircle size={24} />
            </a>

            {/* Call */}
            <a
                href="tel:+966541540047"
                aria-label="اتصل الآن"
                className="fixed right-5 bottom-5 z-40 flex items-center justify-center w-14 h-14 bg-[#1A1A1A] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
                <Phone size={24} />
            </a>
        </>
    );
}
