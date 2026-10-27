import type { IconName } from '@/components/icons/Icon';
import { StepCard } from '@/components/cards/StepCard';
import { SectionHeading } from '@/components/SectionHeading';
import { HOURS_TEXT } from '@/data/business';

const steps: { icon: IconName; title: string; text: string }[] = [
    { icon: 'message', title: 'تواصل على الواتساب أو اتصل', text: `أرسل صورة المكان ومقاسه التقريبي، أو اتصل بنا ${HOURS_TEXT}.` },
    { icon: 'tape-measure', title: 'معاينة وقياس مجاناً', text: 'نأتي إلى مكانك، نأخذ المقاسات ونعرض عليك العينات، ثم نرسل عرض السعر.' },
    { icon: 'install', title: 'توريد وتركيب', text: 'نورّد الخامة المختارة ونركّبها في الموعد المتفق عليه، في الرياض أو أي مدينة في المملكة.' },
];

/**
 * Three step cards (approved mockup): icon circles with a brass number, joined by a dashed mint line that draws
 * itself — downwards between the steps on phones, sideways between them on desktop.
 */
export function HowWeWork() {
    return (
        <section id="how-we-work" className="py-16 md:py-28 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading eyebrow="كيف نعمل" title="ثلاث خطوات من الاستفسار إلى التركيب" />

                <ol className="mx-auto grid max-w-5xl md:grid-cols-3 md:gap-6">
                    {steps.map((step, i) => (
                        <StepCard key={step.title} n={i + 1} icon={step.icon} title={step.title} text={step.text} last={i === steps.length - 1} />
                    ))}
                </ol>
            </div>
        </section>
    );
}
