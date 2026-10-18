// Categories that held a single product duplicated that product's page, and
// Google indexed the thin category instead of the product. Each now redirects
// (308, next.config.ts) to its product; only real hubs keep a category page.
export const mergedCategories: Record<string, string> = {
  'mosque-carpets': 'mosque-carpets',
  'office-flooring': 'office-flooring',
  'artificial-grass': 'artificial-grass',
  'vinyl': 'vinyl-roll',
  'carpet': 'mokite',
  'hospital-flooring': 'hospital-flooring',
  'mosque-vinyl': 'vinyl-mosque',
  'office-carpet': 'office-carpet',
  'turkish-carpet': 'turky-mshager',
};
