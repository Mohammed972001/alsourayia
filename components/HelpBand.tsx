import { Phone } from 'lucide-react';
import { PHONE_TEL, PHONE_DISPLAY, whatsappLink } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { HeadingWords } from '@/components/motion/HeadingWords';

type Props = {
    /** Default question; product pages pass their own. */
    question?: string;
    /** Prefilled WhatsApp message (the tracker adds the page name and the ad source). */
    message?: string;
};

/**
 * A short band before the footer on every page: one question, a WhatsApp button and a call button.
 * Only owner-confirmed promises appear here (free inspection and measurement, free sample).
 */
export function HelpBand({ question = 'محتاج تعرف الأنسب لمكانك؟', message }: Props) {
    return (
        <section aria-labelledby="help-band" className="relative bg-cream border-y border-line overflow-hidden">
            <div className="container mx-auto px-5 lg:px-8 py-12 md:py-16">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                        <h2 id="help-band" className="font-display text-2xl md:text-3xl font-semibold text-ink" data-reveal="words">
                            <HeadingWords lines={[question]} />
                        </h2>
                        <p className="mt-2 text-ink-muted text-sm md:text-base" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
                            ابعت مقاس المكان وصورة له على الواتساب، ونرتب معاينة وقياس مجاناً وعينة قبل الطلب.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
                        <a
                            href={whatsappLink(message)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shine press inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-whatsapp text-white font-bold text-sm"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            واتساب
                        </a>
                        <a
                            href={PHONE_TEL}
                            className="press inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-ink text-white font-bold text-sm"
                            dir="ltr"
                        >
                            <Phone size={17} />
                            {PHONE_DISPLAY}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
