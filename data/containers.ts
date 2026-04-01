import { ContainerSection } from "@/types";

export const containerSections: ContainerSection[] = [
  {
    id: "categorys-main",
    title: "فئات السجاد الرئيسية",
    items: [
      {
        id: "Mosque carpets",
        name: "موكيت مساجد",
        image: "/images/catg/msaged.jpg",
        href: "/products/mosque-carpets",
      },
      {
        id: "office-flooring",
        name: "ارضيات مكتبية",
        image: "/images/catg/mactbia.webp",
        href: "/products/office-flooring",
      },
      {
        id: "water-resistant-carpet",
        name: "باركيه ضد الماء",
        image: "/images/catg/spc.jpg",
        href: "/products/water-resistant-carpet",
      },
      {
        id: "artificial-grass",
        name: "العشب الصناعي",
        image: "/images/catg/grass.webp",
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
        image: "/images/catg/barqya.webp",
        href: "/products/parket",
      },
      {
        id: "mokite",
        name: "موكيت",
        image: "/images/catg/mokite.jpg",
        href: "/products/mokite",
      },
      {
        id: "turky-mshager",
        name: "تركي مشجر",
        image: "/turky mshager/WhatsApp Image 2025-08-02 at 6.36.14 PM (1).jpeg",
        href: "/products/turky-mshager",
      },
      {
        id: "hospital-flooring",
        name: "ارضيات مستيشفيات",
        image: "/images/catg/hospital.jpg",
        href: "/products/hospital-flooring",
      },
      {
        id: "vinyl-mosque",
        name: "فينيل مساجد",
        image: "/images/catg/vinylmsagd.webp",
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