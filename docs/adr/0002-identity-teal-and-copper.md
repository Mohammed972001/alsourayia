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
