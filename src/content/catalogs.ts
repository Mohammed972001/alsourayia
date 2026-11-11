// Suppliers' catalogues the owner sent and asked to publish (2026-11-03), unchanged apart from smaller pictures.
// Never publish a catalogue that carries another shop's name, address or phones, and never strip them to reuse it.
export interface Catalog {
    slug: string;
    title: string;
    description: string;
}

export const catalogGroups: { title: string; items: Catalog[] }[] = [
    {
        "title": "موكيت المربعات",
        "items": [
            {
                "slug": "keyone-smooth",
                "title": "Smooth",
                "description": "ألوان سادة هادئة للمكاتب."
            },
            {
                "slug": "keyone-avento",
                "title": "Avento",
                "description": "خطوط وتدرجات للمساحات المفتوحة."
            },
            {
                "slug": "keyone-vienna",
                "title": "Vienna",
                "description": "نقشة بمستويات متعددة."
            },
            {
                "slug": "keyone-nylon",
                "title": "Nylon",
                "description": "مربعات من خيوط النايلون."
            },
            {
                "slug": "keyone-altas-cloudy",
                "title": "Altas وCloudy",
                "description": "مجموعتان مع طرق التركيب."
            },
            {
                "slug": "keyone-lume-forest",
                "title": "Lume وForest",
                "description": "تصاميم للقاعات والمكاتب."
            },
            {
                "slug": "keyone-spring",
                "title": "Spring",
                "description": "مجموعة مقاومة للحريق."
            },
            {
                "slug": "loomflor-aurora",
                "title": "Aurora",
                "description": "من Loomflor، مع طرق التركيب."
            },
            {
                "slug": "loomflor-euro",
                "title": "Euro",
                "description": "من Loomflor، مع طرق التركيب."
            },
            {
                "slug": "loomflor-velora",
                "title": "Velora",
                "description": "من Loomflor، مع القيم الفنية."
            }
        ]
    },
    {
        "title": "الفينيل والأرضيات الصلبة",
        "items": [
            {
                "slug": "polyflor-xl-pu",
                "title": "فينيل طبي XL PU",
                "description": "ورقة فنية وألوان من Polyflor."
            },
            {
                "slug": "polyflor-classic-mystique",
                "title": "فينيل طبي Classic Mystique",
                "description": "ورقة فنية وألوان من Polyflor."
            },
            {
                "slug": "polyflor-classic-mystique-pure",
                "title": "Classic Mystique Pure Colours",
                "description": "الألوان السادة من Polyflor."
            },
            {
                "slug": "keyone-vinexa-lvt",
                "title": "فينيل Vinexa LVT",
                "description": "بلاط فينيل 60 × 60 سم."
            },
            {
                "slug": "keyone-spc",
                "title": "أرضيات SPC",
                "description": "شرائح بشكل الخشب مع الإكسسوارات."
            },
            {
                "slug": "keyone-laminate",
                "title": "باركيه لامينيت",
                "description": "درجات الخشب مع الإكسسوارات."
            },
            {
                "slug": "keyone-wpc",
                "title": "أرضيات WPC الخارجية",
                "description": "للتراسات والمساحات الخارجية."
            }
        ]
    },
    {
        "title": "أرضيات الفوم",
        "items": [
            {
                "slug": "keyone-sfl",
                "title": "فوم Lume EVA",
                "description": "قطع فوم متداخلة لغرف الأطفال وصالات التدريب."
            }
        ]
    }
];
