# ADR-0002 — Identity «تيل ونحاسي اللوجو»

**Status:** accepted, 2026-11-11

## Context

The user asked for the same design-system work as the sister build «مفروشات العمودي», for this shop. The colours
come from the shop's own badge, as the sister build took its gold from the shop sign.

## Decision

- **Teal** sampled from the word «السريع» on the badge (`#214953`, darkest `#0B282C`): an 11-step scale; text
  `#091F24`, dark sections `#0F2C33`.
- **Copper** from the badge's burnt orange (`#925B3C` to `#B8672E`): buttons `#9A5124` with white labels, small
  copper text `#7E421E`; a light copper `#E0A577` button on dark sections.
- **Bronze** from the S emblem for rules and dividers; **cream marble** grounds: ivory `#FCFAF5`, sand `#F5EFE4`,
  linen `#EBE2D2`.
- **Type:** El Messiri for display (its curves echo the wordmark), IBM Plex Sans Arabic for text.
- **Motifs from the badge:** the swoosh arc over the logo (dividers, eyebrows, the footer edge), the herringbone
  inside the S (marquee marks), photos in arch frames, the textured word «السريع» in the hero.
- **Logo:** the owner's badge. The header uses a horizontal lockup cut from it with the background removed;
  nothing was redrawn.

## Consequences

`npm run tokens` measures 39 contrast pairs; all pass. The site looks related to the sister build in structure but
not in colour or type.

## Amendment — round 3 (2026-11-12)

After round 2 the user asked for a picker with many options (`design/options/`, 13 groups, 50 options) and
chose, among others:

- **Colours «د أبيض وتيل اللوجو»:** white pages, mist panels (`#F1F6F6`, `#E2EDEE`), the logo's own teal
  `#214953` for buttons and dark sections (raised `#2A5A65`), copper kept for small accents (`#9A5124` text,
  `#B8672E` display), light copper `#F0B98A` on dark. `npm run tokens`: 42/42 pairs pass.
- **Display type Lalezar** (one weight; weight synthesis is off so headings never get a fake bold).
- **Motion «بلاط بيتقلب»:** blocks flip down from their top edge one after another.
- **AI art** (Figma image generator) for the hero scenes, the room floor swap, the 3D slab textures and the
  floating product shots, always labelled «رسمة توضيحية»; the owner's photos stay the evidence of real work.

The swoosh, arch frames and cream grounds of round 1 are retired. The picker is kept as the reference for
future client sites (`D:/work/_design-reference/options-picker/`).
