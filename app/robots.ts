import { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/business';

/**
 * robots.txt (App Router metadata route).
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 *
 * AI crawlers get their own explicit groups (T034, research R6): a crawler that finds a group
 * naming it follows only that group, so each one repeats the /api/ rule.
 */

const PRIVATE_PATHS = ['/api/', '/admin/', '/private/'];

// Search and answer engines of AI assistants, allowed on the public pages.
const AI_CRAWLERS = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'PerplexityBot',
    'ClaudeBot',
    'Google-Extended',
    'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // /_next/ is not blocked: Google needs the CSS and JS there to render the pages.
                disallow: PRIVATE_PATHS,
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
            {
                userAgent: 'Googlebot-Image',
                allow: '/',
            },
            ...AI_CRAWLERS.map((userAgent) => ({
                userAgent,
                allow: '/',
                disallow: PRIVATE_PATHS,
            })),
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
