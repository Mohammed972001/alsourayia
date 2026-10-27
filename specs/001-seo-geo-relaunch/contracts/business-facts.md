# Contract: business facts

One record (`data/business.ts`) is the only place a fact is typed. Consumers:

| Consumer | Fields |
|---|---|
| Header strip, footer, contact page, HelpBand | phones, hours, address, services |
| Layout JSON-LD `@graph` | brandName, legalName, unifiedNumber, vatNumber, address, geo, phones, hours, areaServed, logo |
| `/llms.txt`, `/llms-full.txt` | all public fields + product summaries + FAQs |
| Google Business Profile / directories text (docs/listing-text.md) | brandName, category, address, phones, hours, services, website |
| Chat assistant knowledge | all public fields |

Rule: any change to a fact is a one-line change in the record; a build check fails if a phone, hours string or
legal name appears hard-coded anywhere else.
