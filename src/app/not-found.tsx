import type { Metadata } from "next";
import Link from "next/link";
import { Icon, Swoosh } from "@/components/Icon";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: { absolute: "الصفحة غير موجودة | موكيت ومفروشات السريع" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section notfound" aria-labelledby="nf-title">
      <div className="container notfound__inner">
        <p className="notfound__code" aria-hidden="true">
          ٤٠٤
        </p>
        <Swoosh className="notfound__steps" />
        <h1 id="nf-title" className="notfound__title">
          هذه الصفحة غير موجودة
        </h1>
        <p className="notfound__text">ربما تغيّر الرابط. اختر صنفًا من هنا، أو ارجع للرئيسية.</p>
        <ul className="notfound__links">
          {products.map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="chip">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="btn btn--dark">
          <span>الصفحة الرئيسية</span>
          <Icon name="arrow" size={18} />
        </Link>
      </div>
    </section>
  );
}
