"use client";

import { useEffect } from 'react';

export const HideDevBadge = () => {
    useEffect(() => {
        // Aggressively hide Next.js dev tools
        const style = document.createElement('style');
        style.innerHTML = `
            #nextjs-portal, 
            [data-nextjs-toast], 
            [data-nextjs-dialog],
            .__next-dev-tools-icon { 
                display: none !important; 
                opacity: 0 !important; 
                pointer-events: none !important; 
                visibility: hidden !important; 
            }
        `;
        document.head.appendChild(style);

        // Also try to remove from DOM if possible
        const timer = setInterval(() => {
            const badge = document.querySelector('nextjs-portal') || document.querySelector('.__next-dev-tools-icon');
            if (badge) {
                badge.remove();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return null;
};
