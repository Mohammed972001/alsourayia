import Link from "next/link";

/**
 * The owner's «السريع» logo (constitution: the owner approves any logo change). Light grounds use the
 * horizontal lockup cut from the badge (public/brand/logo-lockup.webp, emblem + wordmark, background
 * removed, nothing redrawn); dark grounds use the same lockup in ivory (logo-lockup-inverse.webp).
 * `swap` renders both and lets CSS show one (the header over a dark hero turns solid on scroll).
 */
export function Logo({ inverse = false, swap = false, className = "" }: { inverse?: boolean; swap?: boolean; className?: string }) {
  return (
    <Link href="/" className={`logo${inverse ? " logo--inverse" : ""}${swap ? " logo--swap" : ""}${className ? ` ${className}` : ""}`} aria-label="موكيت ومفروشات السريع — الرئيسية">
      {swap ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- static logo with fixed dimensions */}
          <img className="logo__img logo__img--light" src="/brand/logo-lockup.webp" alt="" width={640} height={304} decoding="async" />
          {/* eslint-disable-next-line @next/next/no-img-element -- static logo with fixed dimensions */}
          <img className="logo__img logo__img--dark" src="/brand/logo-lockup-inverse.webp" alt="" width={640} height={304} decoding="async" />
        </>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- static logo with fixed dimensions
        <img className="logo__img" src={inverse ? "/brand/logo-lockup-inverse.webp" : "/brand/logo-lockup.webp"} alt="" width={640} height={304} decoding="async" />
      )}
    </Link>
  );
}
