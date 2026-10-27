// /llms-full.txt: the long form of /llms.txt, with hub copy, product details and FAQs (T033).
import { llmsFullText } from '@/lib/llms';

export const dynamic = 'force-static';

export function GET() {
    return new Response(llmsFullText(), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
