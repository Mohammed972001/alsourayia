import Image from 'next/image';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/icons/Icon';

interface ProjectCardProps {
    /** Project page; without one the card is not a link. */
    href?: string;
    /** Owner photo of the finished job. */
    image: { src: string; alt: string };
    sizes: string;
    /** Place type on the glass chip («مسجد», «مكتب», …) and its icon. Owner-confirmed only (constitution I). */
    placeType: string;
    icon: IconName;
    /** The product installed, e.g. «موكيت مساجد بنقشة الصفوف». */
    title: string;
    /** How many photos the project has; shown as «N صورة». */
    photoCount?: number;
    eager?: boolean;
    className?: string;
}

/**
 * An installed job (approved card mockup, design/cards/mock.mts «projects»): 4:3 owner photo, dark scrim, a glass
 * chip with the place-type icon, the product title and a «N صورة» count. Not used yet: each project's place type,
 * district and month wait for the owner's confirmation before a projects section exists (tasks.md T036).
 */
export function ProjectCard({ href, image, sizes, placeType, icon, title, photoCount, eager = false, className = '' }: ProjectCardProps) {
    const body = (
        <>
            <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={sizes}
                loading={eager ? 'eager' : 'lazy'}
                className="-z-10 object-cover transition-[scale] duration-[800ms] [@media(hover:hover)]:group-hover:scale-[1.06]"
            />
            <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(10_10_10/0.8),transparent_60%)]" />
            {photoCount ? (
                <span className="absolute top-3 left-3 rounded-md bg-black/45 px-2 py-0.5 text-xs">{photoCount} صورة</span>
            ) : null}
            <span className="absolute inset-x-3.5 bottom-3.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/18 px-2.5 py-0.5 text-xs font-bold backdrop-blur-md">
                    <Icon name={icon} size={16} />
                    {placeType}
                </span>
                <span className="mt-2 block text-[17px] font-bold leading-snug">{title}</span>
            </span>
        </>
    );
    const cardClass = `group relative isolate block aspect-[4/3] overflow-hidden rounded-[18px] bg-ink text-white ${className}`;

    return href ? (
        <Link href={href} className={`press ${cardClass}`}>
            {body}
        </Link>
    ) : (
        <div className={cardClass}>{body}</div>
    );
}
