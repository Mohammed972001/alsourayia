import * as React from 'react';
import type { ReactNode } from 'react';

type VT = React.ComponentType<{ children?: ReactNode; enter?: string; exit?: string; default?: string; name?: string; share?: string }>;
// The React build Next.js ships has <ViewTransition>; without it (or in browsers without view transitions)
// the content is rendered as is.
const ViewTransition: VT = (React as unknown as { ViewTransition?: VT }).ViewTransition ?? (({ children }) => <>{children}</>);

/**
 * Page transition: wraps a page's content so moving between pages fades the old page out and lets the new
 * one rise in (rules in app/motion.css). It goes in each page, not in the layout: a layout stays mounted
 * across navigations, so it never enters or exits.
 */
export function PageView({ children }: { children: ReactNode }) {
    return (
        <ViewTransition enter="page-in" exit="page-out" default="none">
            {children}
        </ViewTransition>
    );
}

/** Shared name of a product picture, so a card's picture moves into the product page's main picture. */
export const productPictureName = (id: string) => `product-picture-${id}`;

/** A picture that morphs between the card and the product page; give it a name only once per page. */
export function SharedPicture({ name, children }: { name?: string; children: ReactNode }) {
    if (!name) return children;
    return (
        <ViewTransition name={name} share="morph" default="none">
            {children}
        </ViewTransition>
    );
}
