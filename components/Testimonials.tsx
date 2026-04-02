'use client';

export function Testimonials() {
    const testimonials = [
        {
            name: 'أحمد بن سعيد',
            role: 'رجل أعمال',
            text: 'خدمة رائعة ومنتجات عالية الجودة. السجاد الذي اشتريته من السُريع حول منزلي إلى قصر فاخر. أنصح الجميع بالتعامل معهم.',
            initials: 'أس',
        },
        {
            name: 'فاطمة العتيبي',
            role: 'مصممة داخلية',
            text: 'تعاملت مع السُريع في عدة مشاريع وكانت النتائج دائماً مبهرة. الجودة والاحترافية والالتزام بالمواعيد يجعلهم الخيار الأول.',
            initials: 'فع',
        },
        {
            name: 'خالد المطيري',
            role: 'مالك فندق',
            text: 'جهزنا فندقنا بالكامل من خلال السُريع. الأسعار معقولة والجودة ممتازة. فريق العمل محترف ومتعاون جداً.',
            initials: 'خم',
        },
    ];

    return (
        <section id="testimonials" className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                        ماذا يقول عملاؤنا
                    </h2>
                    <p className="text-[#6B7280] max-w-2xl mx-auto">
                        نفخر بثقة عملائنا ورضاهم عن خدماتنا ومنتجاتنا
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {testimonials.map((t) => (
                        <div key={t.name} className="p-8 border border-gray-100 rounded-lg">
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                &ldquo;{t.text}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#4A4A4A] text-sm">
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="text-sm text-[#1A1A1A]">{t.name}</div>
                                    <div className="text-xs text-[#6B7280]">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
