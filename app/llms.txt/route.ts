// /llms.txt: a short plain-text summary of the business for AI assistants (T033).
import { llmsText } from '@/lib/llms';

export const dynamic = 'force-static';

export function GET() {
    return new Response(llmsText(), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
