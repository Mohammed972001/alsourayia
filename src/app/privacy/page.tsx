import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { legalLine, site } from "@/content/site";
import { breadcrumbNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

const title = "سياسة الخصوصية | موكيت ومفروشات السريع";
const description = "ما يجمعه موقع موكيت ومفروشات السريع وما لا يجمعه: لا حسابات ولا دفع أونلاين، وقياس الزيارات والإعلانات، والتواصل عبر واتساب أو الاتصال.";

export const metadata = pageMetadata({ title, description, path: "/privacy" });

const trail = [
  { name: "الرئيسية", path: "/" },
  { name: "سياسة الخصوصية", path: "/privacy" },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode("/privacy", title, description), breadcrumbNode(trail))} />
      <PageHero trail={trail} eyebrow="الخصوصية" title="سياسة الخصوصية" lead={`هذه الصفحة تشرح ما يجمعه موقع ${site.name} وما لا يجمعه.`} />
      <section className="section">
        <div className="container prose-page">
          <h2>لا حسابات ولا دفع أونلاين</h2>
          <p>لا يطلب الموقع إنشاء حساب، ولا يقبل الدفع أونلاين، ولا يحتوي على نماذج ترسل بياناتك إلى خادم. عندما تضغط زر واتساب يفتح تطبيق واتساب برسالة جاهزة، وما ترسله بعد ذلك محادثة بينك وبين المحل.</p>
          <h2>حاسبة الكمية</h2>
          <p>الأرقام التي تكتبها في حاسبة الكمية تُحسب داخل متصفحك فقط، ولا تُرسل إلى أي مكان إلا إذا ضغطت زر الإرسال على واتساب بنفسك.</p>
          <h2>قياس الزيارات والإعلانات</h2>
          <p>نستخدم Google Analytics وأداة قياس إعلانات جوجل وبكسل تيك توك لنعرف عدد الزيارات، وأي الصفحات تُقرأ، وكم شخصًا ضغط زر واتساب أو الاتصال بعد إعلان. هذه الأدوات قد تحفظ ملفات تعريف ارتباط في متصفحك، ولا نرسل لها اسمك أو رقمك.</p>
          <h2>مصدر الزيارة في رسالة واتساب</h2>
          <p>إذا وصلت من إعلان على جوجل أو تيك توك، يحفظ المتصفح ذلك خلال زيارتك فقط (sessionStorage)، وتذكر رسالة واتساب الجاهزة الصفحة التي كنت فيها ومصدر الزيارة، حتى يعرف المحل من أين وصلت رسالتك.</p>
          <h2>التواصل</h2>
          <p>{legalLine()}. لأي سؤال عن هذه السياسة تواصل معنا عبر صفحة التواصل أو على {site.email}.</p>
        </div>
      </section>
    </>
  );
}
