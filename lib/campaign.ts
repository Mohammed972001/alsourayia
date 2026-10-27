/**
 * Date windows for home-page offers (data/offers.ts).
 *
 * Riyadh is UTC+3 all year (no daylight saving), so the offset is a constant. The comparison is made
 * on the Riyadh calendar date, never on the server's or the visitor's local date, so a dated offer
 * starts and ends at the same moment wherever the page is rendered.
 */

export interface DatedWindow {
    /** First day the offer shows, inclusive, as YYYY-MM-DD (Riyadh). */
    startsAt?: string;
    /** Last day the offer shows, inclusive, as YYYY-MM-DD (Riyadh). */
    endsAt?: string;
}

const RIYADH_OFFSET_MS = 3 * 60 * 60 * 1000;

/** Today's date in Riyadh, as YYYY-MM-DD. */
export function riyadhToday(now: Date = new Date()): string {
    return new Date(now.getTime() + RIYADH_OFFSET_MS).toISOString().slice(0, 10);
}

/**
 * Whether an offer should show. An offer without dates is always on. A dated offer is on only
 * between its dates; with `now` unknown (null) it stays off, so a server render never shows a
 * window that may already have closed by the time the page is read.
 */
export function isActive(offer: DatedWindow, now: Date | null = new Date()): boolean {
    if (!offer.startsAt && !offer.endsAt) return true;
    if (!now) return false;
    const today = riyadhToday(now);
    if (offer.startsAt && today < offer.startsAt) return false;
    if (offer.endsAt && today > offer.endsAt) return false;
    return true;
}

/** The offers that should show right now, in their listed order. */
export function activeOffers<T extends DatedWindow>(offers: readonly T[], now: Date | null = new Date()): T[] {
    return offers.filter((offer) => isActive(offer, now));
}
