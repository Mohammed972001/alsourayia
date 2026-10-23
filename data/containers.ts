import { ContainerSection } from "@/types";

export const containerSections: ContainerSection[] = [
  {
    id: "categorys-main",
    title: "فئات السجاد الرئيسية",
    items: [
      {
        id: "Mosque carpets",
        name: "موكيت مساجد",
        image: "/msaged/WhatsApp Image 2026-04-02 at 12.44.15 AM (1).jpeg",
        href: "/products/mosque-carpets",
      },
      {
        id: "office-flooring",
        name: "ارضيات مكتبية",
        image: "/stock/office-flooring/grey-office-hallway.webp",
        href: "/products/office-flooring",
      },
      {
        id: "water-resistant-carpet",
        name: "باركيه ضد الماء",
        image: "/stock/water-resistant-carpet/wood-look-kitchen-nook.webp",
        href: "/products/water-resistant-carpet",
      },
      {
        id: "artificial-grass",
        name: "العشب الصناعي",
        image: "/stock/artificial-grass/balcony-turf.webp",
        href: "/products/artificial-grass",
      },
      {
        id: "vinyl-roll",
        name: "ارضيات فينيل رول",
        image: "/vinyl roll/WhatsApp Image 2026-04-02 at 12.27.56 AM.jpeg",
        href: "/products/vinyl-roll",
      },
      {
        id: "parket",
        name: "ارضيات  باركيه",
        image: "/stock/parket/light-oak-bedroom.webp",
        href: "/products/parket",
      },
      {
        id: "mokite",
        name: "موكيت",
        image: "/stock/mokite/carpeted-sitting-room.webp",
        href: "/products/mokite",
      },
      {
        id: "turky-mshager",
        name: "تركي مشجر",
        image: "/stock/turky-mshager/patterned-carpets-close-up.webp",
        href: "/products/turky-mshager",
      },
      {
        id: "hospital-flooring",
        name: "ارضيات مستيشفيات",
        image: "/stock/hospital-flooring/exam-room-coved-vinyl.webp",
        href: "/products/hospital-flooring",
      },
      {
        id: "vinyl-mosque",
        name: "فينيل مساجد",
        image: "/vinyl roll/WhatsApp Image 2026-04-02 at 12.27.57 AM (1).jpeg",
        href: "/products/vinyl-mosque",
      },
    ]
    
  },
  {
    id: "rubber-flooring",
    title: "أرضيات مطاط متخصصة",
    items: [
      {
        id: "rabal-gem",
        name: "ربل جيم - أرضيات الصالات الرياضية",
        image: "/Rabal-GEM/WhatsApp Image 2026-04-01 at 11.54.48 PM.jpeg",
        href: "/products/rabal-gem",
      },
      {
        id: "non-slip-rubber",
        name: "مطاط مضاد للانزلاق للحمامات",
        image: "/Non-slip rubber flooring and toilets/WhatsApp Image 2026-04-02 at 12.22.19 AM.jpeg",
        href: "/products/non-slip-rubber",
      },
      {
        id: "horse-rubber",
        name: "أرضيات مطاط الخيول المتخصصة",
        image: "/Non-slip, moisture-proof, and fire-resistant horse flooring rubber/WhatsApp Image 2026-04-02 at 12.23.04 AM.jpeg",
        href: "/products/horse-rubber",
      },
      {
        id: "office-carpet",
        name: "موكيت المكاتب الاحترافي",
        image: "/mokeet makteb/WhatsApp Image 2026-04-02 at 12.24.30 AM.jpeg",
        href: "/products/office-carpet",
      },
    ]
  },
 

];

export const getContainerById = (id: string): ContainerSection | undefined => {
  return containerSections.find(container => container.id === id);
};

export const getItemById = (itemId: string): ContainerSection['items'][0] | undefined => {
  for (const container of containerSections) {
    const item = container.items.find(item => item.id === itemId);
    if (item) return item;
  }
  return undefined;
}; 