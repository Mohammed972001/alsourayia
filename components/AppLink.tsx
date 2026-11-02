import NextLink from 'next/link';
import type { ComponentProps } from 'react';

/**
 * next/link without prefetching. Every link in view fetched its page's data in the background (11 requests on the
 * home page), which most visitors from ads never open. Off: the phone downloads about 120 KB less on the home page.
 */
export default function AppLink(props: ComponentProps<typeof NextLink>) {
    return <NextLink prefetch={false} {...props} />;
}
