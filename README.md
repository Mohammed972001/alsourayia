# موكيت ومفروشات السريع — www.mokeet-elsuarye.com

Static Next.js site on Cloudflare Workers. See `CLAUDE.md` for status and workflow.

```bash
npm install
npm run build      # photos -> public/media, then the static export in out/
npm run check      # page checks (SITE_LIVE=1 for the launch gate)
node scripts/serve.mjs 3061
```
