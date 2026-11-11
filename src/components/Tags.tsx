import Script from "next/script";
import { siteLive } from "@/content/site";
import { ADS_ID, GA4_ID, TIKTOK_PIXEL } from "@/lib/tracking";

/**
 * Google tag (Ads + GA4 share one gtag.js) and the TikTok pixel — the site's only third-party scripts
 * (ADR-0001 amendment). Live build only, so previews add nothing to the client's data.
 * The gtag queue exists from the first paint, so a tap before gtag.js arrives is still sent. gtag.js loads
 * on the first touch, scroll or key, or 2.5 s after load; TikTok after load (it was the heaviest script
 * on phones).
 */
export function Tags() {
  if (!siteLive) return null;
  const boot = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('js',new Date());gtag('config','${ADS_ID}');gtag('config','${GA4_ID}');
(function(){var done=false;function load(){if(done)return;done=true;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${ADS_ID}';document.head.appendChild(s);}
['pointerdown','touchstart','scroll','keydown'].forEach(function(e){addEventListener(e,load,{once:true,passive:true});});
addEventListener('load',function(){setTimeout(load,2500);});})();`;
  const tiktok = `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=d.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=d.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.load('${TIKTOK_PIXEL}');
  ttq.page();
}(window, document, 'ttq');`;
  return (
    <>
      <Script id="gtag-boot" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: boot }} />
      <Script id="tiktok-pixel" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: tiktok }} />
    </>
  );
}
