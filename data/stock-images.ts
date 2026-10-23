/**
 * Licensed stock photos (CC0 or Public Domain Mark; source, author and licence of
 * each one are in docs/image-sources.md) shown where the shop has no photo of its
 * own yet. Each alt text says what the photo shows. None of them is the shop's
 * work, so no copy may present them as its projects or installations.
 */
export const stockImageAlts: Record<string, string> = {
  // parket
  '/stock/parket/light-oak-bedroom.webp': 'أرضية خشبية بلون البلوط الفاتح في غرفة نوم',
  '/stock/parket/herringbone-close-up.webp': 'باركيه خشبي بنقشة عظم السمكة عن قرب',
  '/stock/parket/parquet-blocks-room.webp': 'باركيه خشبي بنقشة مربعات في غرفة فارغة',
  '/stock/parket/hardwood-room.webp': 'أرضية خشبية لامعة في غرفة واسعة',
  // water-resistant-carpet
  '/stock/water-resistant-carpet/wood-look-kitchen-nook.webp': 'أرضية بمظهر الخشب في ركن طعام بجانب المطبخ',
  '/stock/water-resistant-carpet/light-oak-planks-hallway.webp': 'ألواح أرضية بمظهر خشب البلوط الفاتح في ممر منزلي',
  // artificial-grass
  '/stock/artificial-grass/turf-close-up.webp': 'عشب صناعي أخضر عن قرب',
  '/stock/artificial-grass/balcony-turf.webp': 'عشب صناعي مفروش في شرفة منزل',
  // mokite
  '/stock/mokite/carpeted-sitting-room.webp': 'موكيت بيج يغطي أرضية غرفة جلوس من الجدار إلى الجدار',
  '/stock/mokite/carpeted-living-room.webp': 'موكيت فاتح من الجدار إلى الجدار في صالة معيشة',
  '/stock/mokite/grey-carpet-close-up.webp': 'موكيت رمادي عن قرب',
  // turky-mshager
  '/stock/turky-mshager/patterned-carpets-close-up.webp': 'سجادتان بنقشات مشجرة تقليدية عن قرب',
  '/stock/turky-mshager/patterned-carpet-floor.webp': 'موكيت منقوش بزخارف نباتية يغطي أرضية قاعة',
  '/stock/turky-mshager/floral-carpet-corridor.webp': 'موكيت بنقشة زهور حمراء في ممر فندق',
  // office-flooring
  '/stock/office-flooring/grey-office-hallway.webp': 'أرضية رمادية ملساء في ممر مبنى مكاتب',
  '/stock/office-flooring/meeting-room-floor.webp': 'أرضية فاتحة لامعة في قاعة اجتماعات',
  '/stock/office-flooring/dark-floor-meeting-area.webp': 'أرضية داكنة في مساحة اجتماعات بمكتب',
  // hospital-flooring
  '/stock/hospital-flooring/exam-room-coved-vinyl.webp': 'أرضية رمادية ملساء ترتفع على أطراف الجدار في غرفة كشف',
  '/stock/hospital-flooring/hospital-corridor.webp': 'أرضية ملساء في ممر مستشفى',
  '/stock/hospital-flooring/exam-room-plank-vinyl.webp': 'أرضية بشكل ألواح الخشب في غرفة فحص بعيادة',
};

export function isStockImage(src: string): boolean {
  return Object.prototype.hasOwnProperty.call(stockImageAlts, src);
}

/** The alt text of a stock photo, or the caller's own alt for the shop's photos. */
export function imageAlt(src: string, ownAlt: string): string {
  return isStockImage(src) ? stockImageAlts[src] : ownAlt;
}
