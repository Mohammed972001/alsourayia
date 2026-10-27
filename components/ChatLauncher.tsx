'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Icon } from '@/components/icons/Icon';

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
        <Icon name="message" size={24} />
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
