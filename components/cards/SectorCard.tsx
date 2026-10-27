import Image from 'next/image';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/icons/Icon';

interface SectorCardProps {
    href: string;
    title: string;
    text: string;
    icon: IconName;
    /** Owner photo of this kind of place. Without one the card is icon-led and says photos are coming. */
    image?: { src: string; alt: string; sizes: string };
    className?: string;
}

/**
 * A place the shop serves (approved card mockup, design/cards/mock.mts «sectors»).
 * Photo-led: the owner's photo under a dark scrim, a white chip with the icon on top, title, line and
 * «اعرف المزيد» at the bottom. Icon-led: white bordered card with a mint tile and a «صور قريباً» note.
 * The whole card is one link. Server component; the size of the card comes from the grid around it.
 */
export function SectorCard({ href, title, text, icon, image, className = '' }: SectorCardProps) {
    if (image) {
        return (
            <Link
                href={href}
                className={`press group relative isolate block h-full overflow-hidden rounded-[18px] bg-ink text-white ${className}`}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={image.sizes}
                    loading="lazy"
                    className="-z-10 object-cover transition-[scale] duration-[800ms] [@media(hover:hover)]:group-hover:scale-[1.06]"
                />
                <span
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(10_20_14/0.88),rgb(10_20_14/0.25)_55%,transparent)]"
                />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-2.5 py-[5px] text-xs font-bold text-mint-deep">
                    <Icon name={icon} size={16} />
                    {title}
                </span>
                <span className="absolute inset-x-3.5 bottom-3.5 flex flex-col gap-0.5">
                    <span className="text-lg font-bold leading-snug">{title}</span>
                    <span className="text-[12.5px] leading-normal text-white/85">{text}</span>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-bold text-mint transition-all group-hover:gap-2">
                        اعرف المزيد
                        <Icon name="arrow-start" size={16} />
                    </span>
                </span>
            </Link>
        );
    }

    return (
        <Link
            href={href}
            className={`lift press group relative flex h-full flex-col gap-1 rounded-[18px] border border-line bg-white p-[18px] ${className}`}
        >
            <span className="mb-2 grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-mint-soft text-mint-deep ring-1 ring-inset ring-mint-line">
                <Icon name={icon} size={24} />
            </span>
            <span className="text-lg font-bold leading-snug text-ink">{title}</span>
            <span className="flex-1 text-[12.5px] leading-relaxed text-ink-muted">{text}</span>
            <span className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-bold text-mint-deep transition-all group-hover:gap-2">
                اعرف المزيد
                <Icon name="arrow-start" size={16} />
            </span>
            <span className="absolute top-3.5 left-3.5 rounded-md border border-dashed border-line px-[7px] text-[11px] leading-[1.6] text-ink-muted">
                صور قريباً
            </span>
        </Link>
    );
}
