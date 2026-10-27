/**
 * The site's one icon family (spec 001, contracts/icon-set.md): a 24-unit grid, 1.5 stroke, round caps and joins,
 * drawn in currentColor. Generic glyphs come from the Hugeicons free set (the family used on hamasat-beity); the
 * trade-specific ones (carpet roll, carpet tile, parquet, rubber roll, swatch) are drawn here on the same grid so
 * they sit with the rest.
 */
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Call02Icon,
    Cancel01Icon,
    Clock01Icon,
    CustomerService01Icon,
    DeliveryTruck01Icon,
    Dumbbell01Icon,
    Home01Icon,
    Hospital01Icon,
    Location01Icon,
    Menu01Icon,
    Mosque01Icon,
    OfficeIcon,
    PlusSignIcon,
    MinusSignIcon,
    TapeMeasureIcon,
    Tick02Icon,
    ToolsIcon,
    ViewIcon,
    WhatsappIcon,
    ArrowDown01Icon,
    MapsLocation01Icon,
    StoreLocation01Icon,
    Message01Icon,
} from '@hugeicons/core-free-icons';

/** Same shape as a Hugeicons glyph: a list of [tag, attributes]. */
export type Glyph = readonly (readonly [string, Readonly<Record<string, string | number>>])[];

const s = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;
const dot = (cx: number, cy: number, key: string) => ['circle', { cx, cy, r: 0.75, fill: 'currentColor', key }] as const;

/** A carpet roll seen at an angle: the spiral end, the body and the far end. */
const carpetRoll: Glyph = [
    ['ellipse', { ...s, cx: 6, cy: 11, rx: 2.5, ry: 4.5, key: 'a' }],
    ['ellipse', { ...s, cx: 6, cy: 11, rx: 0.9, ry: 1.7, key: 'b' }],
    ['path', { ...s, d: 'M6 6.5h11.5M6 15.5h11.5', key: 'c' }],
    ['path', { ...s, d: 'M17.5 6.5a2.5 4.5 0 0 1 0 9', key: 'd' }],
    ['path', { ...s, d: 'M3 20h18', key: 'e' }],
];

/** A rug with a centre medallion and fringes — carpet in general (mosque and home carpet). */
const carpet: Glyph = [
    ['rect', { ...s, x: 5, y: 3.5, width: 14, height: 17, rx: 1.5, key: 'a' }],
    ['rect', { ...s, x: 8, y: 6.5, width: 8, height: 11, rx: 0.75, key: 'b' }],
    ['path', { ...s, d: 'M12 9.5l2 2.5-2 2.5-2-2.5z', key: 'c' }],
    ['path', { ...s, d: 'M7.5 1.5v2M10.5 1.5v2M13.5 1.5v2M16.5 1.5v2M7.5 20.5v2M10.5 20.5v2M13.5 20.5v2M16.5 20.5v2', key: 'd' }],
];

/** Four carpet tiles with alternating pile direction. */
const carpetTile: Glyph = [
    ['rect', { ...s, x: 3.5, y: 3.5, width: 7.5, height: 7.5, rx: 1.5, key: 'a' }],
    ['rect', { ...s, x: 13, y: 3.5, width: 7.5, height: 7.5, rx: 1.5, key: 'b' }],
    ['rect', { ...s, x: 3.5, y: 13, width: 7.5, height: 7.5, rx: 1.5, key: 'c' }],
    ['rect', { ...s, x: 13, y: 13, width: 7.5, height: 7.5, rx: 1.5, key: 'd' }],
    ['path', { ...s, d: 'M6 6.5h2.5M6 8.5h2.5M15.5 16h2.5M15.5 18h2.5M16 6v2.5M18 6v2.5M6 15.5V18M8 15.5V18', key: 'e' }],
];

/** Parquet in a herringbone pattern inside its frame. */
const parquet: Glyph = [
    ['rect', { ...s, x: 3, y: 3, width: 18, height: 18, rx: 2, key: 'a' }],
    ['path', { ...s, d: 'M3 8l4.5 4.5L12 8l4.5 4.5L21 8', key: 'b' }],
    ['path', { ...s, d: 'M3 14l4.5 4.5L12 14l4.5 4.5L21 14', key: 'c' }],
    ['path', { ...s, d: 'M7.5 12.5v6M16.5 12.5v6M12 3v5M12 14v7', key: 'd' }],
];

/** A rubber gym roll with the speckled granules of EPDM. */
const rubberRoll: Glyph = [
    ['circle', { ...s, cx: 8, cy: 12, r: 5, key: 'a' }],
    ['circle', { ...s, cx: 8, cy: 12, r: 2, key: 'b' }],
    ['path', { ...s, d: 'M8 7h10.5a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5H8', key: 'c' }],
    dot(13.5, 10, 'd'), dot(16.5, 12.5, 'e'), dot(14, 14.5, 'f'), dot(18, 9.75, 'g'),
];

/** A fan of material swatches — the free sample. */
const swatch: Glyph = [
    ['path', { ...s, d: 'M5 3.5h4.5a1 1 0 0 1 1 1V18a3.75 3.75 0 0 1-7.5 0V5.5a2 2 0 0 1 2-2z', key: 'a' }],
    ['path', { ...s, d: 'M10.5 8.5l3.2-3.2a1 1 0 0 1 1.4 0l3.2 3.2a1 1 0 0 1 0 1.4l-7.8 7.8', key: 'b' }],
    ['path', { ...s, d: 'M7 21.5h12.5a1 1 0 0 0 1-1v-4.5a1 1 0 0 0-1-1h-4', key: 'c' }],
    dot(6.75, 18, 'd'),
];

export const glyphs = {
    // sectors
    mosque: Mosque01Icon,
    office: OfficeIcon,
    gym: Dumbbell01Icon,
    hospital: Hospital01Icon,
    home: Home01Icon,
    // products
    carpet,
    'carpet-roll': carpetRoll,
    'carpet-tile': carpetTile,
    parquet,
    'rubber-roll': rubberRoll,
    // services
    'tape-measure': TapeMeasureIcon,
    swatch,
    install: ToolsIcon,
    delivery: DeliveryTruck01Icon,
    support: CustomerService01Icon,
    // contact
    phone: Call02Icon,
    whatsapp: WhatsappIcon,
    location: Location01Icon,
    map: MapsLocation01Icon,
    store: StoreLocation01Icon,
    clock: Clock01Icon,
    message: Message01Icon,
    // interface
    'arrow-start': ArrowLeft01Icon,
    'arrow-end': ArrowRight01Icon,
    'chevron-down': ArrowDown01Icon,
    menu: Menu01Icon,
    close: Cancel01Icon,
    check: Tick02Icon,
    view: ViewIcon,
    plus: PlusSignIcon,
    minus: MinusSignIcon,
} satisfies Record<string, Glyph>;

export type IconName = keyof typeof glyphs;

/** Glyphs that point in a reading direction (they are drawn for RTL already: «start» points left). */
export const directional: ReadonlySet<IconName> = new Set(['arrow-start', 'arrow-end']);
