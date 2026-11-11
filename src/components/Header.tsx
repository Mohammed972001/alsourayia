"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { collections, products, rooms } from "@/content/products";
import type { CollectionId } from "@/content/types";
import { site } from "@/content/site";
import { displayPhone, whatsappHref } from "@/lib/contact";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Photo } from "./Photo";

// Header (same system as the sister build): a teal ticker with the shop's facts, a bar with the
// «إيه اللي محتاج تفرشه؟» finder, and a row of product chips with round photos.

const pages = [
  { href: "/products/category/parquet", label: "الباركيه" },
  { href: "/products/category/rubber-flooring", label: "الربل" },
  { href: "/about", label: "المحل" },
  { href: "/contact", label: "تواصل" },
];

const TICKER = [`محلنا في ${site.area} بالرياض`, site.hoursText, `اتصال: ${displayPhone(site.phone)}`, site.areaServedText];
const WORDS = ["المسجد", "المكتب", "النادي", "العيادة", "غرفة النوم", "المطبخ", "دورة المياه"];
const groups = (Object.keys(collections) as CollectionId[]).map((id) => ({ id, ...collections[id], items: products.filter((p) => p.collection === id) }));

/** Types the finder's sample words one letter at a time; a fixed word when motion is reduced. */
function TypedWord() {
  return (
    <span className="finder__word" aria-hidden="true">
      {useTypedWord()}
    </span>
  );
}

// Lives in its own small component so the ten-times-a-second typing re-renders this span only, not
// the whole header.
function useTypedWord(): string {
  const [text, setText] = useState(WORDS[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0;
    let c = WORDS[0].length;
    let deleting = true;
    let hold = 0;
    const id = window.setInterval(() => {
      if (hold > 0) {
        hold--;
        return;
      }
      if (deleting) {
        c--;
        if (c <= 0) {
          deleting = false;
          w = (w + 1) % WORDS.length;
        }
      } else {
        c++;
        if (c >= WORDS[w].length) {
          deleting = true;
          hold = 14;
        }
      }
      setText(WORDS[w].slice(0, Math.max(c, 0)));
    }, 95);
    return () => window.clearInterval(id);
  }, []);
  return text;
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const finderRef = useRef<HTMLDivElement>(null);
  const catsRef = useRef<HTMLUListElement>(null);
  // Which ends of the chip row have more chips past the edge (start = right in RTL).
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const row = catsRef.current;
    if (!row) return;
    const update = () => {
      const max = row.scrollWidth - row.clientWidth;
      const pos = Math.abs(row.scrollLeft); // RTL: 0 at the start, negative towards the end
      setEdges({ start: pos > 4, end: max - pos > 4 });
    };
    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // On a product page, bring that product's chip into view (it may sit past the edge of the row).
  useEffect(() => {
    catsRef.current?.querySelector<HTMLElement>(".cat.is-active")?.scrollIntoView({ block: "nearest", inline: "center", behavior: "instant" });
  }, [pathname]);

  /** Moves the chip row most of a width towards its end (1) or back to its start (-1). */
  const scrollCats = (dir: 1 | -1) => {
    const row = catsRef.current;
    if (row) row.scrollBy({ left: -dir * row.clientWidth * 0.7, behavior: "smooth" });
  };

  // Close the menus on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setFinderOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!finderOpen && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFinderOpen(false);
        setMenuOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (finderOpen && finderRef.current && !finderRef.current.contains(e.target as Node)) setFinderOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [finderOpen, menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="header-space" aria-hidden="true" />
      <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}>
        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[0, 1, 2, 3].map((k) => (
              <span key={k} className="ticker__group">
                {TICKER.map((t) => (
                  <span key={t} className="ticker__item">
                    {t}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <p className="visually-hidden">
          {site.name}، {site.area}، {site.city}. {site.hoursText}.
        </p>

        <div className="header__main">
          <div className="container header__bar">
            <Logo />

            <div className="finder" ref={finderRef}>
              <button
                type="button"
                className="finder__btn"
                aria-expanded={finderOpen}
                aria-controls="finder-panel"
                onClick={() => setFinderOpen((v) => !v)}
              >
                <Icon name="search" size={20} />
                <span className="finder__q">إيه اللي محتاج تفرشه؟</span>
                <TypedWord />
                <Icon name="chevronDown" size={18} className="finder__chev" />
              </button>
              <div id="finder-panel" className={`finder__panel${finderOpen ? " is-open" : ""}`}>
                <div className="finder__col">
                  <p className="finder__title">حسب المكان</p>
                  <ul className="finder__rooms">
                    {Object.entries(rooms).map(([key, r]) => {
                      const p = products.find((x) => x.slug === r.product)!;
                      return (
                        <li key={key}>
                          <Link href={`/products/${p.slug}`} className="finder__room">
                            <span>{r.name}</span>
                            <small>{p.name}</small>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="finder__col finder__col--wide">
                  <p className="finder__title">حسب الصنف</p>
                  <div className="finder__groups">
                    {groups.map((g) => (
                      <div key={g.id}>
                        <p className="finder__group">{g.name}</p>
                        <ul>
                          {g.items.map((p) => (
                            <li key={p.slug}>
                              <Link href={`/products/${p.slug}`} className="finder__link">
                                {p.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/products" className="finder__feature">
                  <Photo name="showroom" alt="ممر داخل المحل بين معروضات الموكيت" sizes="260px" />
                  <span className="finder__feature-text">
                    <span>كل الأرضيات</span>
                    <Icon name="arrow" size={18} />
                  </span>
                </Link>
              </div>
            </div>

            <nav className="header__links" aria-label="صفحات الموقع">
              {pages.map((item) => (
                <Link key={item.href} href={item.href} className={`nav-link${isActive(item.href) ? " is-active" : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="header__actions">
              <a className="btn btn--primary btn--sm header__cta" href={whatsappHref()} data-wa>
                <Icon name="whatsapp" size={18} />
                <span>واتساب</span>
              </a>
              <button
                type="button"
                className="header__burger"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <Icon name={menuOpen ? "close" : "menu"} size={24} />
              </button>
            </div>
          </div>

          <nav className={`cats${edges.start ? " has-start" : ""}${edges.end ? " has-end" : ""}`} aria-label="الأصناف">
            <div className="container cats__wrap">
              <button type="button" className="cats__nav cats__nav--start" onClick={() => scrollCats(-1)} aria-label="الأصناف السابقة" hidden={!edges.start}>
                <Icon name="chevron" size={20} />
              </button>
              <ul className="cats__row" ref={catsRef}>
                {products.map((p) => {
                  const on = isActive(`/products/${p.slug}`);
                  return (
                    <li key={p.slug}>
                      <Link href={`/products/${p.slug}`} className={`cat${on ? " is-active" : ""}`} aria-current={on ? "page" : undefined}>
                        <span className="cat__img">
                          <Photo name={p.images[0]} alt="" sizes="40px" />
                        </span>
                        <span>{p.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <button type="button" className="cats__nav cats__nav--end" onClick={() => scrollCats(1)} aria-label="الأصناف التالية" hidden={!edges.end}>
                <Icon name="chevron" size={20} />
              </button>
            </div>
          </nav>
        </div>

        <div id="mobile-menu" className={`mobile-menu${menuOpen ? " is-open" : ""}`} hidden={!menuOpen}>
          <div className="container">
            <p className="mobile-menu__label">المنتجات</p>
            <ul className="mobile-menu__products">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
            <ul className="mobile-menu__pages">
              <li>
                <Link href="/products">كل الأرضيات</Link>
              </li>
              {pages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label === "المحل" ? "عن المحل" : item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/privacy">سياسة الخصوصية</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
