# Contract: icon set

- Grid 24×24, stroke 1.5, round caps and joins, no fills except tiny accent dots; colour `currentColor`.
- Sizes used: 16 (inline text), 20 (buttons, rows), 24 (cards), 32 (feature tiles). No other sizes.
- Decorative icons: `aria-hidden="true"`. Icon-only controls: Arabic `aria-label`.
- Mirroring in RTL: arrows/chevrons mirror; objects (phone, truck, mosque) never mirror.
- One component: `<Icon name="…" size={…} />`; unknown names fail the type check.

| Name | Use | Source |
|---|---|---|
| mosque | sector card, mosque product | custom |
| office | sector card | hugeicons |
| gym | sector card, rubber | custom (dumbbell on mat) |
| hospital | sector card, medical vinyl | hugeicons |
| home | sector card | hugeicons |
| carpet-roll | product type, catalogue | custom |
| carpet-tile | office tiles | custom |
| parquet | parquet products | custom |
| rubber-roll | rubber products | custom |
| tape-measure | inspection and measurement | custom |
| swatch | free sample | custom |
| install | supply and installation | hugeicons (tool) |
| delivery | delivery to all cities | hugeicons (truck) |
| phone, whatsapp, location, clock | contact rows | hugeicons / official WhatsApp glyph |
| arrow, chevron, menu, close, check, eye, plus, minus | navigation and UI | hugeicons |

Acceptance: an inventory script lists every icon use; 0 lucide imports; every name is in this table.
