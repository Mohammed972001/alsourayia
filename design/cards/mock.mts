// Card mockups for the owner's approval (spec 001 T016): photo-led sector and project cards, layered offer cards,
// numbered step cards with a drawn connector, contact rows, and the product card for reference. Real shop photos
// only; icons from the approved family. Run: node design/cards/mock.mts > design/cards/mock.html
import { glyphs } from '../../components/icons/glyphs.ts';

const P = '../../public';
const ph = (dir: string, name: string) => `${P}/${dir}/${encodeURIComponent(name)}`;
const photo = {
  mosque: ph('msaged', 'WhatsApp Image 2026-10-25 at 9.31.16 PM.webp'),
  mosque2: ph('msaged', 'WhatsApp Image 2026-10-25 at 9.31.19 PM (2).webp'),
  mosque3: ph('msaged', 'WhatsApp Image 2026-10-25 at 9.31.20 PM (1).webp'),
  gym: ph('Rabal-GEM', 'WhatsApp Image 2026-10-25 at 9.30.07 PM (1).webp'),
  rolls: ph('Rabal-GEM', 'WhatsApp Image 2026-10-25 at 9.30.04 PM (2).webp'),
  office: ph('mokeet makteb', 'WhatsApp Image 2026-10-25 at 9.29.42 PM (3).webp'),
  office2: ph('mokeet makteb', 'WhatsApp Image 2026-10-25 at 9.29.43 PM (3).webp'),
};
const icon = (name: string, size = 24) => {
  const inner = (glyphs as any)[name].map(([tag, a]: any) => `<${tag} ${Object.entries(a).filter(([k]) => k !== 'key').map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}="${v}"`).join(' ')}/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none">${inner}</svg>`;
};

const sectors = [
  ['mosque', 'مساجد', 'موكيت مساجد بخطوط صفوف على اتجاه القبلة', photo.mosque],
  ['gym', 'صالات رياضية', 'ربل جيم يمتص صدمة الأوزان', photo.gym],
  ['office', 'مكاتب وشركات', 'موكيت رول وبلاط موكيت', photo.office],
  ['hospital', 'مستشفيات وعيادات', 'فينيل طبي يتحمل المطهرات', ''],
  ['home', 'منازل ومجالس', 'موكيت وباركيه وفينيل', ''],
];
const sectorCard = ([ic, t, s, img]: string[], i: number) => img ? `
  <a class="sector photo ${i === 0 ? 'wide' : ''}" href="#">
    <img src="${img}" alt=""><span class="scrim"></span>
    <span class="chip">${icon(ic, 18)}${t}</span>
    <span class="txt"><b>${t}</b><small>${s}</small><em>اعرف المزيد ${icon('arrow-start', 16)}</em></span>
  </a>` : `
  <a class="sector plain" href="#"><span class="tile">${icon(ic, 28)}</span><b>${t}</b><small>${s}</small><em>اعرف المزيد ${icon('arrow-start', 16)}</em><span class="soon">صور قريباً</span></a>`;

const offers = [
  ['tape-measure', 'مجاناً', 'معاينة وقياس مجاناً', 'نأتي إلى مكانك في الرياض ونأخذ المقاسات قبل عرض السعر.', 'احجز معاينة'],
  ['swatch', 'مجاناً', 'عينة مجانية قبل الطلب', 'تختار اللون والملمس من عينة حقيقية في مكانك.', 'اطلب عينة'],
  ['install', 'خدمة', 'توريد وتركيب', 'نورّد ونركّب في طلب واحد.', 'اسأل عن التركيب'],
  ['delivery', 'المملكة', 'توريد لكل مدن المملكة', 'من معرضنا في الرياض إلى مدينتك.', 'اسأل عن مدينتك'],
];
const offerCard = ([ic, tag, t, p, c]: string[], i: number) => `
  <div class="offer"><span class="num">0${i + 1}</span><span class="frame">${icon(ic, 30)}</span><span class="tag">${tag}</span>
    <h3>${t}</h3><p>${p}</p><a href="#">${icon('whatsapp', 18)}${c}</a></div>`;

const steps = [['message', 'تواصل على الواتساب أو اتصل', 'ابعت المقاس وصورة للمكان.'], ['tape-measure', 'معاينة وقياس مجاناً', 'نقيس ونعرض العينات ثم نرسل عرض السعر.'], ['install', 'توريد وتركيب', 'في الموعد المتفق عليه.']];
const projects = [
  [photo.mosque2, 'مسجد', 'موكيت مساجد بنقشة الصفوف', 'mosque'],
  [photo.office2, 'مكتب', 'بلاط موكيت مكاتب', 'office'],
  [photo.gym, 'صالة رياضية', 'ربل جيم رول', 'gym'],
];
const products = [[photo.mosque3, 'موكيت مساجد وسجاد مساجد', 'موكيت مساجد'], [photo.rolls, 'ربل جيم', 'أرضيات مطاط'], [photo.office, 'موكيت مكاتب', 'موكيت مكاتب']];

console.log(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Reem+Kufi:wght@500;700&display=block" rel="stylesheet">
<style>
:root{--ink:#141414;--muted:#6B7280;--brass:#B8924F;--cream:#F8F6F1;--line:#E8E6E1;--mint:#86C79C;--md:#3B7B56;--ms:#F0F8F2;--ml:#DCF0E2;--wa:#25D366}
*{box-sizing:border-box;margin:0;padding:0}body{font-family:Cairo;color:var(--ink);background:#fff;line-height:1.7}
a{color:inherit;text-decoration:none}.wrap{max-width:1280px;margin:0 auto;padding:0 16px}@media(min-width:1024px){.wrap{padding:0 32px}}
section{padding:48px 0}@media(min-width:1024px){section{padding:76px 0}}
.head{text-align:center;margin-bottom:26px}.eyebrow{display:inline-flex;gap:8px;align-items:center;color:var(--md);font-weight:700;font-size:13px}.eyebrow:before{content:'';width:18px;height:2px;background:var(--brass);border-radius:2px}
.head h2{font-family:'Reem Kufi';font-size:26px;margin-top:4px}@media(min-width:1024px){.head h2{font-size:38px}}
.label{display:inline-block;background:var(--ink);color:#fff;font-size:12px;padding:3px 10px;border-radius:6px;margin-bottom:10px}
/* sectors */
.sectors{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.sector{position:relative;border-radius:18px;overflow:hidden;display:block}
.sector.photo{aspect-ratio:3/4;color:#fff}.sector.photo.wide{grid-column:span 2;aspect-ratio:16/10}
.sector img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:scale .8s}
.sector .scrim{position:absolute;inset:0;background:linear-gradient(to top,rgb(10 20 14/.88),rgb(10 20 14/.25) 55%,transparent)}
.sector .chip{position:absolute;top:12px;right:12px;display:inline-flex;gap:6px;align-items:center;background:rgb(255 255 255/.92);color:var(--md);font-size:12px;font-weight:700;border-radius:999px;padding:5px 10px}
.sector .txt{position:absolute;inset-inline:14px;bottom:14px;display:flex;flex-direction:column;gap:2px}
.sector b{font-size:18px;font-weight:700}.sector small{font-size:12.5px;opacity:.85;line-height:1.5}
.sector em{font-style:normal;font-size:13px;font-weight:700;display:inline-flex;gap:4px;align-items:center;margin-top:6px;color:var(--mint)}
.sector.plain{background:#fff;border:1px solid var(--line);padding:18px;display:flex;flex-direction:column;gap:4px}
.sector.plain .tile{width:52px;height:52px;border-radius:14px;background:var(--ms);color:var(--md);display:grid;place-items:center;margin-bottom:8px;box-shadow:inset 0 0 0 1px var(--ml)}
.sector.plain small{color:var(--muted);font-size:12.5px;line-height:1.6}.sector.plain em{color:var(--md)}
.sector .soon{position:absolute;top:14px;left:14px;font-size:11px;color:var(--muted);border:1px dashed var(--line);border-radius:6px;padding:1px 7px}
@media(min-width:1024px){.sectors{grid-template-columns:2fr 1fr 1fr;grid-auto-rows:220px;gap:18px}.sector.photo{aspect-ratio:auto}.sector.photo.wide{grid-column:auto;grid-row:span 2;aspect-ratio:auto}.sector:hover img{scale:1.06}}
/* offers */
.band{background:var(--ms)}
.offers{display:grid;gap:26px}
.offer{position:relative;background:#fff;border:1px solid var(--ml);border-radius:18px;padding:40px 20px 20px;margin-top:20px}
.offer .frame{position:absolute;top:-26px;right:20px;width:56px;height:56px;border-radius:16px;background:var(--md);color:#fff;display:grid;place-items:center;box-shadow:0 10px 22px -10px rgb(59 123 86/.7),0 0 0 6px var(--ms)}
.offer .num{position:absolute;top:10px;left:16px;font-family:'Reem Kufi';font-size:40px;line-height:1;color:var(--ml)}
.offer .tag{display:inline-block;font-size:11px;font-weight:700;color:var(--md);background:var(--ms);border-radius:999px;padding:2px 10px}
.offer h3{font-size:17px;margin-top:6px}.offer p{font-size:13.5px;color:var(--muted);margin-top:2px}
.offer a{display:inline-flex;gap:8px;align-items:center;margin-top:12px;font-weight:700;font-size:13.5px;color:#fff;background:var(--ink);border-radius:999px;padding:9px 16px}
.offer a svg{color:var(--wa)}
@media(min-width:1024px){.offers{grid-template-columns:repeat(4,1fr);gap:18px}}
/* steps */
.steps{display:grid;gap:0;position:relative}
.step{display:grid;grid-template-columns:64px 1fr;gap:16px;padding-bottom:26px;position:relative}
.step:not(:last-child):after{content:'';position:absolute;right:31px;top:64px;bottom:0;width:2px;background:repeating-linear-gradient(to bottom,var(--mint) 0 6px,transparent 6px 12px)}
.step .n{width:64px;height:64px;border-radius:50%;background:#fff;border:2px solid var(--ml);display:grid;place-items:center;position:relative;color:var(--md)}
.step .n i{position:absolute;top:-6px;left:-6px;font-style:normal;font-family:'Reem Kufi';font-size:13px;background:var(--brass);color:#fff;width:26px;height:26px;border-radius:50%;display:grid;place-items:center}
.step b{font-size:17px;display:block;margin-top:8px}.step span{font-size:13.5px;color:var(--muted)}
@media(min-width:1024px){.steps{grid-template-columns:repeat(3,1fr);gap:24px}.step{grid-template-columns:1fr;justify-items:center;text-align:center}.step:not(:last-child):after{right:auto;left:calc(-50% + 40px);top:31px;bottom:auto;width:calc(100% - 80px);height:2px;background:repeating-linear-gradient(to left,var(--mint) 0 6px,transparent 6px 12px)}}
/* projects */
.projects{display:grid;gap:14px}
.project{position:relative;border-radius:18px;overflow:hidden;aspect-ratio:4/3;color:#fff}
.project img{width:100%;height:100%;object-fit:cover}
.project .scrim{position:absolute;inset:0;background:linear-gradient(to top,rgb(10 10 10/.8),transparent 60%)}
.project .meta{position:absolute;inset-inline:14px;bottom:14px}
.project .meta span{display:inline-flex;gap:6px;align-items:center;font-size:12px;font-weight:700;background:rgb(255 255 255/.18);backdrop-filter:blur(6px);border:1px solid rgb(255 255 255/.25);border-radius:999px;padding:3px 10px;margin-inline-end:6px}
.project .meta b{display:block;font-size:17px;margin-top:8px}
.project .count{position:absolute;top:12px;left:12px;font-size:12px;background:rgb(0 0 0/.45);border-radius:6px;padding:2px 8px}
@media(min-width:1024px){.projects{grid-template-columns:repeat(3,1fr);gap:20px}}
/* contact rows */
.rows{border:1px solid var(--line);border-radius:18px;overflow:hidden;max-width:560px;margin:0 auto}
.row{display:flex;gap:14px;align-items:center;padding:16px 18px;border-bottom:1px solid var(--line)}.row:last-child{border-bottom:0}
.row .t{width:46px;height:46px;border-radius:14px;background:var(--ms);color:var(--md);display:grid;place-items:center;flex:none;box-shadow:inset 0 0 0 1px var(--ml)}
.row b{font-size:14px;display:block}.row span{font-size:14px;color:#4A4A4A}.row .go{margin-inline-start:auto;color:var(--md)}
/* products */
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.card{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#fff}.card .im{position:relative;aspect-ratio:1}.card img{width:100%;height:100%;object-fit:cover}
.card .badge{position:absolute;top:10px;right:10px;font-size:11px;font-weight:700;color:var(--md);background:rgb(255 255 255/.92);border-radius:6px;padding:2px 8px}
.card .bd{padding:12px;text-align:center}.card h3{font-size:14.5px;font-weight:600}.card .sub{color:var(--md);font-weight:700;font-size:12.5px}
@media(min-width:1024px){.grid{grid-template-columns:repeat(3,1fr);gap:20px}}
</style></head><body>
<section><div class="wrap"><span class="label">1 — كروت الأماكن (بصورك الحقيقية)</span><div class="head"><span class="eyebrow">الأماكن التي نخدمها</span><h2>أرضية مناسبة لكل مكان</h2></div>
<div class="sectors">${sectors.map(sectorCard).join('')}</div></div></section>
<section class="band"><div class="wrap"><span class="label">2 — كروت العروض والخدمات</span><div class="head"><span class="eyebrow">العروض والخدمات</span><h2>ما نقدمه مع كل طلب</h2></div>
<div class="offers">${offers.map(offerCard).join('')}</div></div></section>
<section><div class="wrap"><span class="label">3 — خطوات العمل</span><div class="head"><span class="eyebrow">كيف نعمل</span><h2>ثلاث خطوات من الاستفسار إلى التركيب</h2></div>
<div class="steps">${steps.map(([ic, b, s], i) => `<div class="step"><span class="n"><i>${i + 1}</i>${icon(ic, 26)}</span><div><b>${b}</b><span>${s}</span></div></div>`).join('')}</div></div></section>
<section style="background:var(--cream)"><div class="wrap"><span class="label">4 — كروت المشاريع (قسم جديد)</span><div class="head"><span class="eyebrow">من شغلنا</span><h2>مشاريع ركّبناها</h2></div>
<div class="projects">${projects.map(([img, type, prod, ic]) => `<a class="project" href="#"><img src="${img}" alt=""><span class="scrim"></span><span class="count">12 صورة</span><span class="meta"><span>${icon(ic, 14)}${type}</span><b>${prod}</b></span></a>`).join('')}</div></div></section>
<section><div class="wrap"><span class="label">5 — صفوف التواصل</span>
<div class="rows">
<div class="row"><span class="t">${icon('store', 22)}</span><div><b>المعرض</b><span>مخرج ٢٢ حراج بن قاسم، الرياض</span></div><span class="go">${icon('arrow-start', 20)}</span></div>
<div class="row"><span class="t">${icon('phone', 22)}</span><div><b>الهاتف</b><span>0550101867 — 0559686290</span></div><span class="go">${icon('arrow-start', 20)}</span></div>
<div class="row"><span class="t">${icon('clock', 22)}</span><div><b>المواعيد</b><span>يومياً من 9 صباحاً حتى 10 مساءً</span></div></div>
</div></div></section>
<section style="padding-top:0"><div class="wrap"><span class="label">6 — كارت المنتج (للمقارنة)</span>
<div class="grid">${products.map(([img, t, b]) => `<div class="card"><div class="im"><img src="${img}" alt=""><span class="badge">${b}</span></div><div class="bd"><h3>${t}</h3><p class="sub">اسأل عن السعر</p></div></div>`).join('')}</div></div></section>
</body></html>`);
