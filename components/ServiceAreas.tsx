'use client';

export function ServiceAreas() {
    const areas = [
        { name: 'الرياض', count: 50 },
        { name: 'جدة', count: 30 },
        { name: 'الدمام', count: 25 },
        { name: 'الخبر', count: 20 },
        { name: 'مكة المكرمة', count: 18 },
        { name: 'المدينة المنورة', count: 15 },
    ];

    return (
        <section id="service-areas" className="py-24 bg-[#F9FAFB]">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                        نخدم جميع مناطق المملكة
                    </h2>
                    <p className="text-[#6B7280] max-w-2xl mx-auto">
                        نفخر بتقديم خدماتنا في جميع أنحاء المملكة العربية السعودية
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                    {areas.map((area) => (
                        <div
                            key={area.name}
                            className="text-center p-6 bg-white rounded-lg border border-gray-100"
                        >
                            <h3 className="text-[#1A1A1A] mb-1">{area.name}</h3>
                            <p className="text-xs text-[#6B7280]">{area.count}+ مشروع</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
