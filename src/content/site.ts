// Business facts — the single source (constitution II). Every phone, address, hour, legal name and number
// the site shows or puts in structured data or llms.txt is typed here and nowhere else. Only owner-confirmed
// facts; an unknown fact is null, never a sample. Carried over from the old data/business.ts (confirmed by
// the owner between 2026-10-16 and 2026-11-09).

export type Hours = { days: string; dayOfWeek: string[]; opens: string; closes: string };

export const site = {
  name: "موكيت ومفروشات السريع",
  /** The brand's own short form. «مفروشات السريع» is another shop's name: never use it. */
  short: "موكيت السريع",
  nameEn: "Al-Sari Carpets & Furnishings",
  // The registered establishment behind the brand, spelled exactly as on its commercial registration.
  legalName: "مؤسسة فنون العاديات لديكورات والارضيات العالميه",
  unifiedNumber: "7054751560",
  vatNumber: "314892165400003",
  nationalAddress: "RCNA3189",
  city: "الرياض",
  region: "منطقة الرياض",
  country: "SA",
  postalCode: "12685",
  street: "مخرج ٢٢ حراج بن قاسم القديم، سوق العرب الدولي",
  district: "حي المنفوحة",
  /** Short form for strips and taglines. */
  area: "حراج بن قاسم",
  geo: { lat: 24.596556, lng: 46.730583 },
  mapUrl: "https://www.google.com/maps?q=24.596556,46.730583",
  // Main line: calls. WhatsApp moved to 0541540047 on 2026-11-12 (the user: the old WhatsApp number is
  // probably banned). Second line: calls, and WhatsApp on the parquet, rubber and medical vinyl pages
  // (owner, 2026-10-22), so the shop can tell those leads apart.
  phone: "+966550101867",
  whatsapp: "966541540047",
  phone2: "+966559686290",
  // WhatsApp on the second-line pages also moved to the new number (user, 2026-11-12); calls on 0559686290 stay.
  whatsapp2: "966541540047",
  email: "info@mokeet-elsuarye.com",
  hours: [
    { days: "يوميًا", dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "22:00" },
  ] as Hours[],
  hoursText: "يوميًا من 9 صباحًا حتى 10 مساءً",
  social: [{ name: "تيك توك", url: "https://www.tiktok.com/@httpswww.mokeetelsuarye1" }],
  /** Owner-confirmed promises (2026-10-19). */
  services: ["معاينة وقياس مجانًا", "عينة مجانية قبل الطلب", "توريد وتركيب", "توريد لكل مدن المملكة"],
  areaServedText: "المعاينة والتركيب في الرياض، والتوريد لكل مدن المملكة",
  about:
    "موكيت ومفروشات السريع محل أرضيات في حراج بن قاسم بالرياض: موكيت مساجد ومكاتب ومنازل، وباركيه خشب وSPC ومشمع باركيه، وفينيل طبي، وربل جيم وحمامات، وفوم وبازل، وعشب صناعي. معاينة وقياس مجانًا، وعينة قبل الطلب، وتوريد وتركيب، وتوريد لكل مدن المملكة.",
} as const;

/** Canonical origin: the live domain (previews keep it so canonicals stay right after launch). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mokeet-elsuarye.com").replace(/\/$/, "");

/** Indexing stays off on previews; the live deploy builds with SITE_LIVE=1. */
export const siteLive = process.env.SITE_LIVE === "1";

/** «موكيت ومفروشات السريع تابع لـ<establishment> (الرقم الوطني الموحد … - الرقم الضريبي …)». */
export function legalLine(): string {
  return `${site.name} تابع لـ${site.legalName} (الرقم الوطني الموحد ${site.unifiedNumber} - الرقم الضريبي ${site.vatNumber})`;
}

export const fullAddress = `${site.street}، ${site.district}، ${site.city}`;
