"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { collections, productsIn } from "@/content/products";
import type { CollectionId } from "@/content/types";
import { whatsappHref } from "@/lib/contact";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Photo } from "./Photo";

// Header (round 3, user pick «ب شفاف فوق الصورة», 2026-11-12). One bar: the logo, the four floor groups as
// menu buttons that open a panel of their products with photos and starting prices, the page links,
// WhatsApp and the burger. Phones get a full-height sheet with the same groups.
//
// On the pages listed in HEADER_OVER the first block is a dark full-bleed hero: there the header is fixed,
// transparent with white text and the ivory logo, and turns solid once the page scrolls. The hero on those
// pages starts at the very top of <main> and MUST pad its content with var(--header-h) so nothing hides
// under the bar. Every other page gets a solid sticky header in the normal flow.
export const HEADER_OVER = ["/", "/about"];

const GROUPS: CollectionId[] = ["carpet", "parquet", "rubber", "special"];
const pages = [
  { href: "/about", label: "المحل" },
  { href: "/catalogs", label: "الكتالوجات" },
  { href: "/contact", label: "تواصل" },
];

export function Header() {
  const pathname = usePathname();
  const over = HEADER_OVER.includes(pathname);
  const [open, setOpen] = useState<CollectionId | null>(null);
  const [sheet, setSheet] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  // The sheet starts at the bar's bottom edge.
  const [sheetTop, setSheetTop] = useState(0);

  // Close everything on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setSheet(false);
  }

  // Solid after ~40px of scroll; any open group panel closes on scroll.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setOpen(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!open && !sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setSheet(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (open && navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open, sheet]);

  useEffect(() => {
    document.documentElement.classList.toggle("sheet-open", sheet);
  }, [sheet]);

  const toggleSheet = () => {
    if (!sheet && headerRef.current) setSheetTop(Math.round(headerRef.current.getBoundingClientRect().bottom));
    setSheet((v) => !v);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const groupActive = (id: CollectionId) => productsIn(id).some((p) => isActive(`/products/${p.slug}`)) || (collections[id].hub ? isActive(collections[id].hub!) : false);
  const solid = !over || scrolled || sheet;

  return (
    <header ref={headerRef} className={`site-header${over ? " site-header--over" : ""}${solid ? " is-solid" : ""}${sheet ? " is-sheet-open" : ""}`}>
      <div className="container header__bar">
        <Logo swap={over} />

        <nav className="mainnav" aria-label="الأرضيات" ref={navRef}>
          <ul className="mainnav__list">
            {GROUPS.map((id) => (
              <li key={id} className="mainnav__item">
                <button
                  type="button"
                  className={`mainnav__btn${groupActive(id) ? " is-active" : ""}`}
                  aria-expanded={open === id}
                  aria-controls={`panel-${id}`}
                  onClick={() => setOpen((v) => (v === id ? null : id))}
                >
                  {collections[id].name}
                  <Icon name="chevronDown" size={16} />
                </button>
                <div id={`panel-${id}`} className={`mega${open === id ? " is-open" : ""}`}>
                  <ul className="mega__list">
                    {productsIn(id).map((p) => (
                      <li key={p.slug}>
                        <Link href={`/products/${p.slug}`} className="mega__item">
                          <span className="mega__img">
                            <Photo name={p.images[0]} alt="" sizes="96px" />
                          </span>
                          <span className="mega__text">
                            <span className="mega__name">{p.name}</span>
                            <span className="mega__price">{p.priceFrom !== null ? `من ${p.priceFrom} ريال/م²` : "السعر بعد القياس"}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mega__foot">
                    {collections[id].note}
                    {collections[id].hub && (
                      <Link href={collections[id].hub!} className="text-link">
                        مقارنة {collections[id].name}
                        <Icon name="arrow" size={16} />
                      </Link>
                    )}
                  </p>
                </div>
              </li>
            ))}
            {pages.map((item) => (
              <li key={item.href} className="mainnav__item">
                <Link href={item.href} className={`mainnav__link${isActive(item.href) ? " is-active" : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a className="header__wa" href={whatsappHref()} data-wa>
            <Icon name="whatsapp" size={20} />
            <span>واتساب</span>
          </a>
          <button
            type="button"
            className="header__burger"
            aria-expanded={sheet}
            aria-controls="sheet"
            aria-label={sheet ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={toggleSheet}
          >
            <Icon name={sheet ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      <div id="sheet" className={`sheet${sheet ? " is-open" : ""}`} hidden={!sheet} style={{ top: sheetTop || undefined }}>
        <div className="container sheet__inner">
          {GROUPS.map((id) => (
            <div key={id} className="sheet__group">
              <p className="sheet__title">{collections[id].name}</p>
              <ul className="sheet__list">
                {productsIn(id).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} className="sheet__item">
                      <span className="sheet__img">
                        <Photo name={p.images[0]} alt="" sizes="56px" />
                      </span>
                      <span>{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="sheet__pages">
            <li>
              <Link href="/products">كل الأرضيات</Link>
            </li>
            <li>
              <Link href="/guides">أدلة الشراء</Link>
            </li>
            {pages.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label === "المحل" ? "عن المحل" : item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/faq">الأسئلة الشائعة</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
