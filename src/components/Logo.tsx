import Link from "next/link";

/**
 * The owner's «السريع» logo (constitution: the owner approves any logo change). Light grounds use the
 * horizontal lockup cut from the badge (public/brand/logo-lockup.webp, emblem + wordmark, background
 * removed, nothing redrawn); dark grounds use the same lockup in ivory (logo-lockup-inverse.webp).
 */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`logo${inverse ? " logo--inverse" : ""}`} aria-label="موكيت ومفروشات السريع — الرئيسية">
      {/* eslint-disable-next-line @next/next/no-img-element -- static logo with fixed dimensions */}
      <img className="logo__img" src={inverse ? "/brand/logo-lockup-inverse.webp" : "/brand/logo-lockup.webp"} alt="" width={640} height={304} decoding="async" />
    </Link>
  );
}
