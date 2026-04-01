'use client';

import dynamic from 'next/dynamic';

const WelcomePopup = dynamic(
    () => import('@/components/WelcomePopup').then((m) => m.WelcomePopup),
    { ssr: false }
);

export function WelcomePopupClient() {
    return <WelcomePopup />;
}
