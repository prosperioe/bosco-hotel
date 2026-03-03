'use client';

import React, { useState, useEffect } from 'react';

export default function Preloader({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [fadeLogo, setFadeLogo] = useState(false);
    const [slideUp, setSlideUp] = useState(false);

    useEffect(() => {
        // Sequence:
        // 0ms -> start (logo fades in via CSS)
        // 1500ms -> logo starts fading out, screen starts sliding up
        // 2300ms -> preloader removed from DOM completely

        const fadeOutTimer = setTimeout(() => {
            setFadeLogo(true);
            setSlideUp(true);
        }, 1500);

        const removeTimer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    return (
        <>
            {loading && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-stone-950 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${slideUp ? '-translate-y-full' : 'translate-y-0'}`}
                >
                    <div className="flex flex-col items-center">
                        <svg
                            className={`w-24 h-24 mb-6 text-amber-500 animate-draw-logo transition-opacity duration-700 ${fadeLogo ? 'opacity-0' : 'opacity-100'}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        <h1 className={`text-2xl tracking-[0.3em] uppercase text-stone-200 font-light animate-fade-in transition-opacity duration-700 delay-300 ${fadeLogo ? 'opacity-0' : 'opacity-100'}`}>
                            Bosco
                        </h1>
                    </div>
                </div>
            )}
            <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </div>
        </>
    );
}
