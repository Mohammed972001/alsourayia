import { llmsShort } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsShort(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
