import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { products } from "@/content/products";
import { fullAddress, site } from "@/content/site";
import { displayPhone, telHref, whatsappHref } from "@/lib/contact";
import { breadcrumbNode, graph, pageMetadata, webPageNode } from "@/lib/seo";

const title = "تواصل وزيارة المحل | موكيت ومفروشات السريع في حراج بن قاسم";
const description =
  "تواصل مع موكيت ومفروشات السريع على واتساب أو بالاتصال، أو زر المحل في حراج بن قاسم القديم بحي المنفوحة في الرياض، يوميًا من 9 صباحًا حتى 10 مساءً.";

export const metadata = pageMetadata({ title, description, path: "/contact", image: "showroom" });

const trail = [
  { name: "الرئيسية", path: "/" },
  { name: "تواصل وزيارة", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={graph(webPageNode("/contact", title, description, "ContactPage"), breadcrumbNode(trail))} />
      <PageHero
        trail={trail}
        eyebrow="تواصل وزيارة"
        title="اكتب لنا، أو تعال المحل"
        lead="أسرع طريقة: رسالة واتساب فيها نوع المكان ومقاسه وصورة له، ونرتّب معك معاينة وقياسًا مجانًا. وإذا تحب تشوف العينات بنفسك، المحل في حراج بن قاسم."
      />

      <section className="section contact" aria-label="طرق التواصل">
        <div className="container contact__grid">
          <div className="contact__cards">
            <a className="contact-card contact-card--lead" href={whatsappHref()} data-wa data-reveal>
              <span className="contact-card__icon">
                <Icon name="whatsapp" size={28} />
              </span>
              <span className="contact-card__title">واتساب</span>
              <span className="contact-card__text">رسالة جاهزة، أضف لها المقاس والصورة.</span>
            </a>
            <a className="contact-card" href={telHref()} data-reveal>
              <span className="contact-card__icon">
                <Icon name="phone" size={28} />
              </span>
              <span className="contact-card__title">اتصال</span>
              <span className="contact-card__text" dir="ltr">
                {displayPhone(site.phone)}
              </span>
            </a>
            <a className="contact-card" href={telHref(true)} data-reveal>
              <span className="contact-card__icon">
                <Icon name="phone" size={28} />
              </span>
              <span className="contact-card__title">الخط الثاني</span>
              <span className="contact-card__text" dir="ltr">
                {displayPhone(site.phone2)}
              </span>
            </a>
            <a className="contact-card" href={site.mapUrl} target="_blank" rel="noopener" data-reveal>
              <span className="contact-card__icon">
                <Icon name="pin" size={28} />
              </span>
              <span className="contact-card__title">الموقع على الخريطة</span>
              <span className="contact-card__text">افتح الاتجاهات إلى المحل</span>
            </a>

            <div className="contact__checklist" data-reveal>
              <h2 className="contact__h2">ماذا ترسل مع رسالتك؟</h2>
              <ol>
                <li>نوع المكان: مسجد، مكتب، نادي، عيادة، أو بيت.</li>
                <li>طول المكان وعرضه بالمتر، ولو بالتقريب.</li>
                <li>صورة للمكان وحالة الأرضية الحالية.</li>
                <li>الحي، أو المدينة إذا كنت خارج الرياض.</li>
              </ol>
            </div>
          </div>

          <div className="contact__visit">
            <figure className="contact__photo" data-reveal="wipe">
              <Photo name="showroom" alt="ممر داخل المحل بين معروضات الموكيت والسجاد" sizes="(min-width: 64rem) 40vw, 92vw" />
            </figure>
            <dl className="facts" data-reveal>
              <div>
                <dt>العنوان</dt>
                <dd>{fullAddress}</dd>
              </div>
              <div>
                <dt>المواعيد</dt>
                <dd>{site.hoursText}</dd>
              </div>
              <div>
                <dt>العنوان الوطني المختصر</dt>
                <dd>
                  <bdi>{site.nationalAddress}</bdi>
                </dd>
              </div>
              <div>
                <dt>البريد</dt>
                <dd>
                  <a href={`mailto:${site.email}`} dir="ltr">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt>نخدم</dt>
                <dd>{site.areaServedText}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="ask-title">
        <div className="container">
          <h2 id="ask-title" className="pdp-block__title" data-reveal>
            اسأل عن صنف محدد
          </h2>
          <ul className="contact__products">
            {products.map((p) => (
              <li key={p.slug} data-reveal>
                <a href={whatsappHref(p.name)} data-wa className="contact__product">
                  <Icon name="whatsapp" size={18} />
                  <span>{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="contact__more">
            أو تصفّح <Link href="/products" className="text-link">كل الأرضيات</Link> قبل أن تكتب لنا.
          </p>
        </div>
      </section>
    </>
  );
}
