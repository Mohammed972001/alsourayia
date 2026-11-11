// Home page copy (spec 002, round 3 from the user's picks on 2026-11-12). Plain buyer guidance and
// owner-confirmed facts only; no invented numbers. Kept short on purpose (user: «مش كلام كتير»).

export const home = {
  // Approved by the user on 2026-11-03 (planned for 2026-11-08 on the old site).
  seoTitle: "موكيت ومفروشات السريع | موكيت وباركيه وربل - حراج بن قاسم",
  seoDescription:
    "محل موكيت ومفروشات السريع في حراج بن قاسم بالرياض: موكيت مساجد ومكاتب ومنازل، باركيه خشب وSPC، فينيل طبي، ربل جيم وحمامات، فوم وعشب صناعي. معاينة وقياس مجانًا وعينة قبل الطلب.",

  // Hero «العينات الطايرة»: dark AI scene of floating floor samples, the name, one turning line, two buttons.
  hero: {
    kicker: "موكيت · باركيه · ربل · فينيل",
    titleTop: "موكيت ومفروشات",
    titleWord: "السريع",
    subtitle: "موكيت وباركيه وربل وفينيل في الرياض",
    turnLead: "نفرش",
    // Places the shop floors with its own lines; the loop repeats the first word at the end.
    turnWords: ["المساجد", "المكاتب", "البيوت", "الصالات الرياضية"],
    primary: "اطلب معاينة مجانية",
    secondary: "تصفّح الأرضيات",
    imageNote: "رسمة توضيحية",
  },

  showcaseHead: {
    eyebrow: "الأرضيات",
    title: "أحد عشر صنفًا من محل واحد",
    hint: "اسحب الشريط أو اختر المجموعة",
  },

  // The 3D slab: each tile is a top-down texture (AI drawings, and the drawn grass) with the starting price.
  slab: {
    eyebrow: "الأسعار",
    title: "كل الأرضيات من محل واحد",
    text: "سعر المتر يبدأ من الرقم المكتوب على كل بلاطة، والسعر النهائي بعد القياس.",
    unit: "الأسعار تبدأ من، بالريال للمتر المربع",
    note: "خامات مرسومة",
    tiles: [
      { slug: "mosque-carpets", texture: "/textures/tex-mosque.webp", label: "موكيت مساجد" },
      { slug: "parket", texture: "/textures/tex-parquet.webp", label: "باركيه خشب" },
      { slug: "office-carpet", texture: "/textures/tex-office.webp", label: "موكيت مكاتب" },
      { slug: "vinyl-roll", texture: "/textures/tex-vinyl.webp", label: "مشمع باركيه" },
      { slug: "rabal-gem", texture: "/textures/tex-rubber.webp", label: "ربل جيم" },
      { slug: "artificial-grass", texture: "/media/art-grass-480.webp", label: "عشب صناعي" },
    ],
  },

  // The owner's own installs, people-free (2026-11-11 check). Caption = place type + product only.
  projectsHead: { eyebrow: "من شغلنا", title: "أرضيات ركّبناها على الطبيعة" },
  projects: [
    { image: "mosque-07", place: "مسجد", product: "mosque-carpets" },
    { image: "office-14", place: "مكتب", product: "office-carpet" },
    { image: "gym-06", place: "نادي", product: "rabal-gem" },
    { image: "mosque-13", place: "مسجد", product: "mosque-carpets" },
    { image: "bath-01", place: "دورات مياه", product: "non-slip-rubber" },
    { image: "office-11", place: "مكتب", product: "office-carpet" },
  ],

  steps: {
    eyebrow: "طريقة الطلب",
    title: "كله يبدأ برسالة واتساب",
    text: "أرسل صورة مكانك، والباقي علينا.",
    items: [
      { title: "أرسل صورة المكان", text: "على واتساب، مع الطول والعرض بالتقريب ونوع المكان." },
      { title: "معاينة وقياس مجانًا", text: "نرتّب موعدًا في الرياض لنأخذ المقاسات ونشوف حالة الأرضية." },
      { title: "عينة قبل الطلب", text: "تشوف العينة وتلمسها قبل ما تقرر، مجانًا." },
      { title: "توريد وتركيب", text: "نورّد ونركّب في الرياض، ونورّد لكل مدن المملكة." },
    ],
    cta: "ابدأ المحادثة",
    // An illustration of the usual first chat; `step` ticks the matching item in the list.
    chat: [
      { from: "me", step: 1, photo: true, text: "السلام عليكم، هذي صورة المجلس. الطول ٦ والعرض ٥ تقريبًا." },
      { from: "shop", step: 2, text: "وعليكم السلام، حيّاك. نرتّب موعد ونجي نقيس مجانًا داخل الرياض." },
      { from: "me", step: 2, text: "تمام، وأبغى أشوف الموكيت قبل." },
      { from: "shop", step: 3, swatch: true, title: "العينة مجانًا قبل الطلب", text: "تشوفها وتلمسها وبعدين تقرر." },
      { from: "shop", step: 4, text: "وبعد ما تختار نورّد ونركّب، ونورّد لكل مدن المملكة." },
      { from: "me", step: 4, text: "ممتاز، اتفقنا." },
    ],
  },

  // Tabby and Tamara (user, 2026-11-12: «ناقص سيكشن تابي وتمارا»). The amount is plain arithmetic from the
  // owner's starting price and is marked as an example.
  instalments: {
    eyebrow: "تقسيط",
    title: "افرش الحين وادفع على 4 دفعات",
    text: "قسّم المبلغ على 4 دفعات مع تابي أو تمارا، حسب شروط تابي وتمارا.",
    payments: [
      { label: "الدفعة ١", when: "اليوم" },
      { label: "الدفعة ٢", when: "بعد شهر" },
      { label: "الدفعة ٣", when: "بعد شهرين" },
      { label: "الدفعة ٤", when: "بعد 3 شهور" },
    ],
    exampleArea: 100,
    exampleSlug: "mosque-carpets",
  },

  showroom: {
    eyebrow: "المحل",
    title: "تعال شوف العينات على الطبيعة",
    text: "القماش والألوان تفرق على الطبيعة عن الصورة. تعال قارن بيدك، أو أرسل صورة مكانك ونرتّب المعاينة.",
    mapCta: "افتح الموقع على الخريطة",
    photoCaption: "داخل المحل في حراج بن قاسم",
    cutouts: [
      { image: "ai-cut-carpet", slug: "mosque-carpets", label: "موكيت مساجد" },
      { image: "ai-cut-planks", slug: "parket", label: "باركيه خشب" },
      { image: "ai-cut-rubber", slug: "rabal-gem", label: "ربل جيم" },
      { image: "ai-cut-vinyl", slug: "vinyl-roll", label: "مشمع باركيه" },
    ],
  },

  faqHead: { eyebrow: "أسئلة", title: "أسئلة تتكرر في المحل" },
  faq: [
    {
      q: "وين محل موكيت ومفروشات السريع؟",
      a: "في الرياض، حراج بن قاسم القديم، سوق العرب الدولي، مخرج ٢٢، بحي المنفوحة. نفتح يوميًا من 9 صباحًا حتى 10 مساءً، والموقع على الخريطة في صفحة التواصل.",
    },
    {
      q: "هل المعاينة والقياس مجانية؟",
      a: "نعم، المعاينة والقياس مجانًا داخل الرياض، والعينة مجانية قبل الطلب. أرسل صورة المكان على واتساب ونرتّب الموعد.",
    },
    {
      q: "هل توصلون خارج الرياض؟",
      a: "نعم، نورّد لكل مدن المملكة. المعاينة والتركيب داخل الرياض، وخارجها أرسل المقاسات والصور ونرتّب معك التوريد.",
    },
    {
      q: "كم سعر المتر؟",
      a: "لكل صنف سعر يبدأ منه، مكتوب في صفحته، مثل موكيت المساجد من 40 ريالًا للمتر والباركيه الخشب من 65. السعر النهائي حسب الموديل والكمية، ويتأكد بعد القياس.",
    },
    {
      q: "أختار باركيه خشب أم SPC؟",
      a: "الباركيه الخشب (HDF) للغرف الجافة مثل غرف النوم والمجالس، والـSPC يتحمّل الماء فيناسب المطبخ والملحق ودورات المياه. في صفحة الباركيه مقارنة بين الثلاثة مع مشمع الباركيه.",
    },
    {
      q: "هل عندكم ربل للجيم وللحمامات؟",
      a: "نعم: ربل جيم رول وبلاط 50×50 لصالات الحديد والنوادي، وربل حمامات مفرّغ ضد الانزلاق لدورات المياه وأماكن الوضوء، وفوم وبازل لمساحات الأطفال.",
    },
  ],
  cta: {
    title: "عندك مكان تبغى تفرشه؟",
    text: "أرسل صورته ومقاسه على واتساب، ونرتّب لك معاينة وقياسًا مجانًا ونرد عليك بالخيارات والسعر.",
    button: "أرسل صورة المكان",
  },
} as const;
