// Runs before static assets (run_worker_first): one canonical host over https, permanent redirects for
// retired URLs, and security headers. Everything else is served from ./out unchanged (ADR-0001).

const CANONICAL_HOST = "www.mokeet-elsuarye.com";
const REDIRECT_HOSTS = new Set(["mokeet-elsuarye.com"]);

// Retired URLs -> where their visitors and links belong (301). Old category pages that held one product
// were merged into it on 2026-10-18; four products left the range on 2026-11-11 (spec 002).
const REDIRECTS: Record<string, string> = {
  "/products/vinyl-mosque": "/products/mosque-carpets",
  "/products/horse-rubber": "/products/category/rubber-flooring",
  "/products/office-flooring": "/products/office-carpet",
  "/products/turky-mshager": "/products/mokite",
  "/products/category/rabal-gem": "/products/category/rubber-flooring",
  "/products/category/non-slip-rubber": "/products/category/rubber-flooring",
  "/products/category/horse-rubber": "/products/category/rubber-flooring",
  "/products/category/mosque-carpets": "/products/mosque-carpets",
  "/products/category/mosque-vinyl": "/products/mosque-carpets",
  "/products/category/office-flooring": "/products/office-carpet",
  "/products/category/office-carpet": "/products/office-carpet",
  "/products/category/artificial-grass": "/products/artificial-grass",
  "/products/category/vinyl": "/products/vinyl-roll",
  "/products/category/carpet": "/products/mokite",
  "/products/category/turkish-carpet": "/products/mokite",
  "/products/category/hospital-flooring": "/products/hospital-flooring",
  "/service-areas": "/contact",
};

const CSP = [
  "default-src 'self'",
  // Next's static export inlines its bootstrap payload; the Google tag and TikTok pixel load from their hosts.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://analytics.tiktok.com https://*.tiktok.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self' https:",
  "frame-src https://www.googletagmanager.com https://td.doubleclick.net https://*.tiktok.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

// Next's client asks for `__next.<a>.<b>.__PAGE__.txt`; a static export writes `__next.<a>/<b>/__PAGE__.txt`.
const SEGMENT_PREFETCH = /\/__next\.([^/]+)\.__PAGE__\.txt$/;

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

function secure(response: Response, url: URL): Response {
  const out = new Response(response.body, response);
  out.headers.set("Content-Security-Policy", CSP);
  out.headers.set("X-Content-Type-Options", "nosniff");
  out.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  out.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/media/")) {
    out.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }
  if (url.hostname === CANONICAL_HOST) {
    out.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  } else {
    // Previews (workers.dev) never get indexed.
    out.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return out;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (REDIRECT_HOSTS.has(url.hostname) || (url.hostname === CANONICAL_HOST && url.protocol === "http:")) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;
    const target = REDIRECTS[path];
    if (target) {
      url.pathname = target;
      return Response.redirect(url.toString(), 301);
    }
    const segment = SEGMENT_PREFETCH.exec(url.pathname);
    if (segment) {
      const assetPath = url.pathname.slice(0, segment.index) + `/__next.${segment[1].replaceAll(".", "/").replaceAll("$", "%24")}/__PAGE__.txt`;
      return secure(await env.ASSETS.fetch(new Request(new URL(assetPath, url), request)), url);
    }
    return secure(await env.ASSETS.fetch(request), url);
  },
};

export default worker;
