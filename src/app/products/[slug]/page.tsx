import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { Photo, photoSource } from "@/components/Photo";
import { SampleTag } from "@/components/cards/SampleTag";
import { Gallery } from "@/components/product/Gallery";
import { InstalmentLine } from "@/components/product/InstalmentLine";
import { QuantityCalc } from "@/components/product/QuantityCalc";
import { RoomFloor, type RoomFloorItem } from "@/components/product/RoomFloor";
import { StepsPath } from "@/components/product/StepsPath";
import { Works } from "@/components/product/Works";
import { home } from "@/content/home";
import { collections, getProduct, productBySlug, products, rooms } from "@/content/products";
import { site } from "@/content/site";
import { floorTextures, roomCompare } from "@/content/textures";
import { telHref, whatsappHref } from "@/lib/contact";
import { breadcrumbNode, faqNode, graph, pageMetadata, productNode, webPageNode } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = productBySlug.get(slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.seoTitle} | موكيت ومفروشات السريع`, description: p.seoDescription, path: `/products/${p.slug}`, image: p.images[0] });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  if (!productBySlug.has(slug)) notFound();
  const p = getProduct(slug);
  const path = `/products/${p.slug}`;
  const trail = [
    { name: "الرئيسية", path: "/" },
    { name: "المنتجات", path: "/products" },
    { name: p.name, path },
  ];
  const tel = telHref();
  const source = photoSource(p.images[0]);
  const label = source === "art" ? "رسم توضيحي، وصور المحل قريبًا" : source === "catalog" ? "صور من كتالوج المورّد" : collections[p.collection].note;
  const related = p.related.map((s) => getProduct(s));
  // «شوفها في المكان»: only for products with a matching floor texture, this product first.
  const floors: RoomFloorItem[] = (roomCompare[p.slug] ?? []).map((s) => {
    const q = getProduct(s);
    return { slug: s, name: q.name, price: q.priceFrom, tex: floorTextures[s].tex, size: floorTextures[s].size, current: s === p.slug };
  });
  const nav = [
    { id: "features", label: "المزايا" },
    ...(floors.length ? [{ id: "room", label: "في المكان" }] : []),
    ...(p.works ? [{ id: "works", label: "على الطبيعة" }] : []),
    { id: "kinds", label: "الأنواع" },
    ...(p.samples ? [{ id: "samples", label: "العينات" }] : []),
    { id: "rooms", label: "الأماكن" },
    { id: "guide", label: "الكمية" },
    { id: "care", label: "العناية" },
    { id: "steps", label: "طريقة الطلب" },
    { id: "faq", label: "الأسئلة" },
  ];

  return (
    <article className="pdp">
      <JsonLd data={graph(webPageNode(path, p.seoTitle, p.seoDescription, "ItemPage"), productNode(p), breadcrumbNode(trail), faqNode(p.faq))} />

      <section className="pdp-hero" aria-labelledby="pdp-title">
        <div className="container pdp-hero__inner">
          <div className="pdp-hero__copy">
            <Breadcrumbs trail={trail} />
            <p className="eyebrow pdp-hero__eyebrow" data-reveal>
              {collections[p.collection].name}
            </p>
            <h1 id="pdp-title" className="pdp-hero__title" data-reveal>
              {p.h1}
            </h1>
            <p className="pdp-hero__tagline" data-reveal>
              {p.tagline}
            </p>
            <p className="pdp-hero__lead" data-reveal>
              {p.summary}
            </p>
            {p.priceFrom !== null && (
              <p className="pdp-hero__price" data-reveal>
                <span>يبدأ من</span>
                <strong>
                  <bdi>{p.priceFrom}</bdi> ريال
                </strong>
                <span>للمتر المربع، والسعر النهائي حسب الموديل والكمية</span>
              </p>
            )}
            <InstalmentLine price={p.priceFrom} />
            <dl className="facts pdp-hero__facts" data-reveal>
              {p.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="pdp-hero__actions" data-reveal>
              <a className="btn btn--primary btn--lg" href={whatsappHref(p.name)} data-wa>
                <Icon name="whatsapp" size={20} />
                <span>اسأل عن {p.name}</span>
              </a>
              <a className="btn btn--ghost btn--lg" href={whatsappHref(p.name, true)} data-wa>
                <Icon name="sample" size={20} />
                <span>اطلب عينة مجانية</span>
              </a>
            </div>
          </div>
          <Gallery images={p.images} name={p.name} label={label} />
        </div>
      </section>

      <nav className="pdp-nav" aria-label={`أقسام صفحة ${p.name}`}>
        <div className="container pdp-nav__inner">
          <span className="pdp-nav__name">{p.name}</span>
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`}>{n.label}</a>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary btn--sm pdp-nav__cta" href={whatsappHref(p.name)} data-wa>
            <Icon name="whatsapp" size={16} />
            <span>اطلب السعر</span>
          </a>
        </div>
      </nav>

      <div className="container pdp-body">
        <div className="pdp-main">
          <section className="pdp-block pdp-intro" aria-label={`عن ${p.name}`}>
            <p className="pdp-intro__lead" data-reveal>
              {p.lead}
            </p>
          </section>

          <section id="features" className="pdp-block" aria-labelledby="features-title">
            <h2 id="features-title" className="pdp-block__title" data-reveal>
              ليه تختار {p.name}؟
            </h2>
            <ul className="features">
              {p.features.map((f, i) => (
                <li key={f.title} className="feature" data-reveal style={{ "--i": i } as React.CSSProperties}>
                  <span className="feature__icon">
                    <Icon name={f.icon} size={26} />
                  </span>
                  <h3 className="feature__title">{f.title}</h3>
                  <p className="feature__text">{f.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {floors.length > 0 && (
            <section id="room" className="pdp-block" aria-labelledby="room-title">
              <h2 id="room-title" className="pdp-block__title" data-reveal>
                شوف {p.name} في المكان
              </h2>
              <p className="pdp-block__intro" data-reveal>
                غرفة فاضية مرسومة، تتفرش قدامك. دوس على أي أرضية وقارن.
              </p>
              <RoomFloor
                floors={floors}
                room={<Photo name="ai-room" alt="رسمة توضيحية لغرفة فاضية بشباك مقوّس، تتفرش أرضيتها" sizes="(min-width: 64rem) 56rem, 100vw" className="room__img" />}
              />
            </section>
          )}

          {p.works && (
            <section id="works" className="pdp-block" aria-labelledby="works-title">
              <h2 id="works-title" className="pdp-block__title" data-reveal>
                شوف {p.name} على الطبيعة
              </h2>
              <p className="pdp-block__intro" data-reveal>
                {p.works.intro}
              </p>
              <Works works={p.works} name={p.name} />
            </section>
          )}

          <section id="kinds" className="pdp-block" aria-labelledby="kinds-title">
            <h2 id="kinds-title" className="pdp-block__title" data-reveal>
              أنواع {p.name}
            </h2>
            <p className="pdp-block__intro" data-reveal>
              أسماء تسمعها في السوق داخل هذا الصنف. اسأل عن المتوفر منها في المعرض.
            </p>
            <ol className="kinds">
              {p.kinds.map((k, i) => (
                <li key={k.name} className="kind" data-reveal style={{ "--i": i } as React.CSSProperties}>
                  <span className="kind__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="kind__name">{k.name}</h3>
                    <p className="kind__text">{k.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {p.samples && (
            <section id="samples" className="pdp-block" aria-labelledby="samples-title">
              <h2 id="samples-title" className="pdp-block__title" data-reveal>
                من عينات {p.name} في المحل
              </h2>
              <p className="pdp-block__intro" data-reveal>
                {p.samples.intro}
              </p>
              <div className="rack" data-reveal="up">
                <span className="rack__bar" aria-hidden="true" />
                <ul className="rack__tags">
                  {p.samples.images.map((img, i) => (
                    <SampleTag key={img} index={i} image={img} title={`عينة ${i + 1}`} href={whatsappHref(`${p.name}، العينة رقم ${i + 1} من صور الموقع`, true)} />
                  ))}
                </ul>
              </div>
              <p className="pdp-block__cta" data-reveal>
                <a className="btn btn--dark" href={whatsappHref(p.name, true)} data-wa>
                  <Icon name="sample" size={18} />
                  <span>اطلب عينة مجانية</span>
                </a>
              </p>
            </section>
          )}

          <section id="rooms" className="pdp-block" aria-labelledby="rooms-title-p">
            <h2 id="rooms-title-p" className="pdp-block__title" data-reveal>
              أين يناسب؟
            </h2>
            <ul className="pdp-rooms">
              {p.rooms.map((key, i) => {
                const r = rooms[key];
                return (
                  <li key={key} className="pdp-room" data-reveal style={{ "--i": i } as React.CSSProperties}>
                    <span className="pdp-room__img">
                      <Photo name={r.image} alt={r.name} sizes="(min-width: 64rem) 14vw, 45vw" />
                    </span>
                    <span className="pdp-room__name">{r.name}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section id="guide" className="pdp-block pdp-block--panel" aria-labelledby="guide-title">
            <h2 id="guide-title" className="pdp-block__title" data-reveal>
              احسب كمية {p.name}
            </h2>
            <QuantityCalc product={p.name} whatsapp={site.whatsapp} tiles={p.calc === "tiles"} />
            <div className="prepare" data-reveal>
              <h3 className="prepare__title">جهّز هذا قبل طلب السعر</h3>
              <ul className="prepare__list">
                {p.prepare.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="care" className="pdp-block" aria-labelledby="care-title">
            <div className="care">
              <div>
                <h2 id="care-title" className="pdp-block__title" data-reveal>
                  العناية والتنظيف
                </h2>
                <ul className="care__list">
                  {p.care.map((c, i) => (
                    <li key={c} data-reveal style={{ "--i": i } as React.CSSProperties}>
                      <Icon name="check" size={18} />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <figure className="care__photo" data-reveal="lay">
                <Photo name={p.images[2] ?? p.images[0]} alt={`${p.name} عن قرب`} sizes="(min-width: 64rem) 22vw, 90vw" />
              </figure>
            </div>
          </section>

          <section id="steps" className="pdp-block" aria-labelledby="steps-title-p">
            <p className="eyebrow" data-reveal>
              {home.steps.eyebrow}
            </p>
            <h2 id="steps-title-p" className="pdp-block__title" data-reveal>
              {home.steps.title}
            </h2>
            <StepsPath steps={[...home.steps.items]} />
          </section>

          <section id="faq" className="pdp-block" aria-labelledby="faq-title-p">
            <h2 id="faq-title-p" className="pdp-block__title" data-reveal>
              أسئلة عن {p.name}
            </h2>
            <FaqList items={p.faq} />
          </section>
        </div>

        <aside className="pdp-aside" aria-label="اطلب السعر">
          <div className="buybox">
            <span className="buybox__img">
              <Photo name={p.images[1] ?? p.images[0]} alt="" sizes="20rem" />
            </span>
            <p className="buybox__name">{p.name}</p>
            {p.priceFrom !== null && (
              <p className="buybox__price">
                من <strong><bdi>{p.priceFrom}</bdi></strong> ريال للمتر
              </p>
            )}
            <InstalmentLine price={p.priceFrom} compact />
            <p className="buybox__line">أرسل المقاس وصورة المكان، ونرتّب معاينة وقياسًا مجانًا ونرد عليك بالسعر.</p>
            <a className="btn btn--primary" href={whatsappHref(p.name)} data-wa>
              <Icon name="whatsapp" size={20} />
              <span>اطلب السعر على واتساب</span>
            </a>
            <a className="btn btn--ghost" href={tel}>
              <Icon name="phone" size={20} />
              <span>اتصال</span>
            </a>
            <ul className="buybox__services">
              {site.services.map((sv) => (
                <li key={sv}>
                  <Icon name="check" size={16} />
                  <span>{sv}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="section section--sand related" aria-labelledby="related-title">
        <div className="container">
          <h2 id="related-title" className="related__title" data-reveal>
            أصناف قريبة
          </h2>
          <ul className="related__grid">
            {related.map((r, i) => (
              <li key={r.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <ProductCard product={r} sizes="(min-width: 64rem) 26vw, 88vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`جاهز تختار ${p.name}؟`} button={`اسأل عن ${p.name}`} product={p.name} images={[p.images[0], p.images.at(-1)!]} />
    </article>
  );
}
