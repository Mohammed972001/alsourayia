import { whatsappLink } from '@/lib/contact';
import type { DatedWindow } from '@/lib/campaign';

/**
 * Cards of the «العروض والخدمات» section on the home page.
 *
 * Only promises the owner confirmed may appear here: free inspection and measurement, a free sample
 * before ordering, supply and installation, and delivery to every city of the Kingdom. A price, a
 * discount or a percentage goes in only when the owner states it in writing (the Ads account was
 * suspended once for an unverified claim). A dated offer takes `startsAt` / `endsAt` (Riyadh dates)
 * and switches itself off; see lib/campaign.ts.
 */
export type OfferIcon = 'ruler' | 'sample' | 'wrench' | 'truck' | 'tag';

export interface Offer extends DatedWindow {
    id: string;
    /** Short label on the mint pill. */
    badge: string;
    title: string;
    body: string;
    /** Where the card's button goes: a WhatsApp chat (whatsappLink) or a page of the site. */
    href: string;
    cta: string;
    icon: OfferIcon;
}

export const offers: Offer[] = [
    {
        id: 'inspection',
        badge: 'مجاناً',
        title: 'معاينة وقياس مجاناً',
        body: 'نأتي إلى مكانك في الرياض ونأخذ المقاسات ونرى الأرضية الحالية قبل عرض السعر.',
        href: whatsappLink('السلام عليكم، أريد حجز معاينة وقياس مجاناً'),
        cta: 'احجز معاينة',
        icon: 'ruler',
    },
    {
        id: 'sample',
        badge: 'مجاناً',
        title: 'عينة مجانية قبل الطلب',
        body: 'تختار اللون والملمس من عينة حقيقية تراها في مكانك وتحت إضاءته، قبل أن تطلب.',
        href: whatsappLink('السلام عليكم، أريد طلب عينة مجانية'),
        cta: 'اطلب عينة',
        icon: 'sample',
    },
    {
        id: 'install',
        badge: 'خدمة',
        title: 'توريد وتركيب',
        body: 'نورّد ونركّب في طلب واحد: موكيت، باركيه، فينيل، عشب صناعي وأرضيات مطاط.',
        href: whatsappLink('السلام عليكم، أريد الاستفسار عن التوريد والتركيب'),
        cta: 'اسأل عن التركيب',
        icon: 'wrench',
    },
    {
        id: 'delivery',
        badge: 'المملكة',
        title: 'توريد لكل مدن المملكة',
        body: 'من معرضنا في الرياض إلى أي مدينة في المملكة. أرسل مدينتك والمساحة ونرتب التوصيل.',
        href: whatsappLink('السلام عليكم، أريد الاستفسار عن التوريد إلى مدينتي'),
        cta: 'اسأل عن مدينتك',
        icon: 'truck',
    },
    // Example of a dated offer. Price / discount only from the owner, in writing, before it goes in.
    // {
    //     id: 'ramadan-2027',
    //     badge: 'عرض رمضان',
    //     title: 'موكيت مساجد قبل رمضان',
    //     body: 'التوريد والتركيب قبل بداية الشهر لمن يحجز المعاينة خلال فترة العرض.',
    //     href: whatsappLink('السلام عليكم، أريد الاستفسار عن عرض موكيت المساجد قبل رمضان'),
    //     cta: 'احجز المعاينة',
    //     icon: 'tag',
    //     startsAt: '2027-01-20',
    //     endsAt: '2027-02-07',
    // },
];
