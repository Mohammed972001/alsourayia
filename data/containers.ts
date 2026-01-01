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
        image: "/images/catg/vinyl-roll.jpg",
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
    id: "garden-services",
    title: "حول حديقتك الي واحة جميلة",
    items: [
      {
        id: "garden-flooring",
        name: "تنسيق حدائق بتركيب احترافي",
        image: "/images/catg/garden.png",
        href: "/products/garden-flooring",
      },
      {
        id: "shlal",
        name: "شلالات ونوافير تنبض بالحياة",
        image: "/images/catg/shlal.png",
        href: "/products/shlal",
      },
      {
        id: "planets",
        name: "زرع منسق وجاهز للتزيين",
        image: "/images/catg/planets.png",
        href: "/products/planets",
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