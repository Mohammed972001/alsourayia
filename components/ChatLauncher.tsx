'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

/**
 * Stand-in for the chat launcher button. The widget itself (state, fetch to
 * /api/chat, the panel) is only downloaded after the first tap, so visitors who
 * never open the assistant do not pay for it on every page. Same spot, same
 * look; once loaded the widget renders its own identical button and opens.
 */
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
    ssr: false,
    loading: () => <LauncherButton busy />,
});

function ChatIcon() {
    return (
        <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z" />
            <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
        </svg>
    );
}

function LauncherButton({ onClick, busy = false }: { onClick?: () => void; busy?: boolean }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="اسأل المساعد"
            aria-expanded={false}
            aria-controls="site-chat"
            aria-busy={busy || undefined}
            className="flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-colors bg-ink text-white hover:bg-brass-deep"
        >
            <ChatIcon />
        </button>
    );
}

export function ChatLauncher({ panelPosition }: { panelPosition?: string }) {
    const [wanted, setWanted] = useState(false);
    if (!wanted) return <LauncherButton onClick={() => setWanted(true)} />;
    return <ChatWidget panelPosition={panelPosition} defaultOpen />;
}
