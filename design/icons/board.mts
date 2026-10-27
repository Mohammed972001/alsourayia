// Renders the icon board for the owner's approval: every icon at 24 and 32 px in ink and dark mint, plus the
// icons inside the card tiles the site uses. Run: node design/icons/board.mts > design/icons/board.html
import { glyphs } from '../../components/icons/glyphs.ts';
const labels: Record<string, string> = {
  mosque: 'مساجد', office: 'مكاتب', gym: 'جيم', hospital: 'مستشفيات', home: 'منازل',
  carpet: 'موكيت', 'carpet-roll': 'رول موكيت', 'carpet-tile': 'بلاط موكيت', parquet: 'باركيه', 'rubber-roll': 'رول ربل',
  'tape-measure': 'معاينة وقياس', swatch: 'عينة مجانية', install: 'توريد وتركيب', delivery: 'توصيل', support: 'تواصل مباشر',
  phone: 'اتصال', whatsapp: 'واتساب', location: 'العنوان', map: 'الخريطة', store: 'المعرض', clock: 'المواعيد', message: 'رسالة',
  'arrow-start': 'سهم', 'arrow-end': 'سهم', 'chevron-down': 'فتح', menu: 'القائمة', close: 'إغلاق', check: 'صح', view: 'عرض', plus: 'زيادة', minus: 'نقص',
};
const custom = new Set(['carpet', 'carpet-roll', 'carpet-tile', 'parquet', 'rubber-roll', 'swatch']);
const svg = (name: string, size: number, color: string) => {
  const inner = (glyphs as any)[name].map(([tag, a]: any) => `<${tag} ${Object.entries(a).filter(([k]) => k !== 'key').map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}="${String(v).replace('currentColor', color)}"`).join(' ')}/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" style="color:${color}">${inner}</svg>`;
};
const groups: [string, string[]][] = [
  ['القطاعات', ['mosque', 'office', 'gym', 'hospital', 'home']],
  ['المنتجات (مرسومة خصيصاً للمحل)', ['carpet', 'carpet-roll', 'carpet-tile', 'parquet', 'rubber-roll']],
  ['الخدمات', ['tape-measure', 'swatch', 'install', 'delivery', 'support']],
  ['التواصل', ['phone', 'whatsapp', 'location', 'map', 'store', 'clock', 'message']],
  ['الواجهة', ['arrow-start', 'chevron-down', 'menu', 'close', 'check', 'view', 'plus', 'minus']],
];
const cell = (n: string) => `<div class="cell${custom.has(n) ? ' custom' : ''}"><div class="big">${svg(n, 32, '#141414')}${svg(n, 32, '#3B7B56')}</div><div class="small">${svg(n, 24, '#141414')}${svg(n, 20, '#3B7B56')}</div><span>${labels[n] ?? n}</span></div>`;
const tiles = ['mosque', 'gym', 'tape-measure', 'swatch', 'delivery', 'parquet'].map((n) => `<div class="tile"><span class="ic">${svg(n, 28, '#3B7B56')}</span><b>${labels[n]}</b></div>`).join('');
console.log(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=Reem+Kufi:wght@700&display=block" rel="stylesheet">
<style>body{margin:0;background:#F7F3EC;font-family:Cairo;color:#141414;width:1400px;padding:30px 50px;box-sizing:border-box}
h1{font-family:'Reem Kufi';font-size:34px;text-align:center;margin:0 0 4px}p.s{text-align:center;color:#6B7280;margin:0 0 24px}
h2{font-size:20px;margin:22px 0 10px;color:#3B7B56}.grid{display:grid;grid-template-columns:repeat(8,1fr);gap:12px}
.cell{background:#fff;border:1px solid #E8E6E1;border-radius:14px;padding:14px 8px;text-align:center}.cell.custom{border-color:#B8924F;box-shadow:inset 0 0 0 1px #F4ECDD}
.big,.small{display:flex;gap:10px;justify-content:center;align-items:center;margin-bottom:8px}span{font-size:13px;color:#4A4A4A}
.tiles{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}.tile{background:#fff;border:1px solid #DCF0E2;border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:12px}
.tile .ic{width:52px;height:52px;border-radius:14px;background:#F0F8F2;display:grid;place-items:center;box-shadow:inset 0 0 0 1px #DCF0E2}.tile b{font-size:16px}
.note{color:#6B7280;font-size:14px;margin-top:6px}</style></head><body>
<h1>لوحة الأيقونات الجديدة</h1><p class="s">عيلة واحدة: نفس سُمك الخط ونفس الزوايا ونفس المقاس. الإطار الدهبي = أيقونة مرسومة خصيصاً للمحل</p>
${groups.map(([t, ns]) => `<h2>${t}</h2><div class="grid">${ns.map(cell).join('')}</div>`).join('')}
<h2>شكلها جوه الكروت</h2><div class="tiles">${tiles}</div>
<p class="note">كل أيقونة فيكتور (SVG) بتتلوّن من الموقع، ومتشالة من قارئ الشاشة لو مجرد زينة.</p></body></html>`);
