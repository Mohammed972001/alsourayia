import Link from "next/link";
import { Icon } from "./Icon";

/** Visible breadcrumb; the matching BreadcrumbList is in the page's JSON-LD graph. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav className="crumbs" aria-label="مسار الصفحة">
      <ol>
        {trail.map((t, i) => (
          <li key={t.path}>
            {i < trail.length - 1 ? (
              <>
                <Link href={t.path}>{t.name}</Link>
                <Icon name="chevron" size={14} />
              </>
            ) : (
              <span aria-current="page">{t.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
