'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { PHONE_TEL, whatsappLink } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import ChatWidget from '@/components/ChatWidget';

/**
 * Mobile: a thumb-reach action bar. On the home page it slides up once the
 * visitor leaves the hero (whose own CTAs cover the first screen).
 * Desktop: round floating buttons, WhatsApp with a soft pulse ring.
 * `message` prefills WhatsApp; product pages pass the product name so the
 * shop knows what the visitor is asking about.
 */
export function FloatingButtons({ message }: { message?: string } = {}) {
    const [showBar, setShowBar] = useState(false);
    const isHome = usePathname() === '/';

    useEffect(() => {
        const onScroll = () => setShowBar(!isHome || window.scrollY > window.innerHeight * 0.6);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome]);

    return (
        <>
            {/* Mobile action bar */}
            <div
                className={`lg:hidden fixed inset-x-0 bottom-0 z-40 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] bg-white/90 backdrop-blur-xl border-t border-line transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    showBar ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                <div className="grid grid-cols-2 gap-2.5">
                    <a
                        href={PHONE_TEL}
                        className="press flex items-center justify-center gap-2 h-12 rounded-full bg-ink text-white text-sm font-bold"
                    >
                        <Phone size={17} />
                        اتصل الآن
                    </a>
                    <a
                        href={whatsappLink(message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press flex items-center justify-center gap-2 h-12 rounded-full bg-whatsapp text-white text-sm font-bold"
                    >
                        <WhatsAppIcon className="w-5 h-5" />
                        اطلب عرض سعر
                    </a>
                </div>
            </div>

            {/* Chat assistant: above the mobile bar, above WhatsApp on desktop */}

            <div className="fixed left-4 bottom-20 z-40 lg:left-6 lg:bottom-24">

                <ChatWidget panelPosition="bottom-36 left-4 lg:bottom-40 lg:left-6" />

            </div>


            {/* Desktop floating buttons */}
            <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل عبر واتساب"
                className="hidden lg:flex fixed left-6 bottom-6 z-40 items-center justify-center w-14 h-14 bg-whatsapp text-white rounded-full shadow-lg hover:scale-110 transition-transform"
            >
                <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" aria-hidden="true" />
                <WhatsAppIcon className="relative w-7 h-7" />
            </a>
            <a
                href={PHONE_TEL}
                aria-label="اتصل الآن"
                className="hidden lg:flex fixed right-6 bottom-6 z-40 items-center justify-center w-14 h-14 bg-ink text-white rounded-full shadow-lg hover:scale-110 transition-transform"
            >
                <Phone size={22} />
            </a>
        </>
    );
}
