'use client';

import { useTheme } from '@/components/providers/ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="
        relative w-14 h-7 rounded-full transition-all duration-500 cursor-pointer flex-shrink-0
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
        bg-stone-700/80 dark:bg-stone-700/80 light-mode:bg-amber-100
      "
            style={{
                background: theme === 'dark' ? 'rgba(41,37,36,0.85)' : 'rgba(254,243,199,0.95)',
                border: theme === 'dark' ? '1.5px solid rgba(245,158,11,0.3)' : '1.5px solid rgba(245,158,11,0.5)',
                boxShadow: theme === 'dark'
                    ? '0 0 12px rgba(245,158,11,0.15) inset'
                    : '0 0 12px rgba(245,158,11,0.25) inset',
            }}
        >
            {/* Track icons */}
            <span
                className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none select-none"
                aria-hidden
            >
                {/* Moon icon (left side) */}
                <svg className="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                {/* Sun icon (right side) */}
                <svg className="w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </span>

            {/* Sliding thumb */}
            <span
                className="absolute top-[3px] w-[22px] h-[22px] rounded-full shadow-md transition-all duration-500 ease-in-out flex items-center justify-center"
                style={{
                    left: theme === 'dark' ? '3px' : 'calc(100% - 25px)',
                    background: theme === 'dark'
                        ? 'linear-gradient(135deg, #78716c, #57534e)'
                        : 'linear-gradient(135deg, #f59e0b, #d97706)',
                    boxShadow: theme === 'dark'
                        ? '0 1px 6px rgba(0,0,0,0.5)'
                        : '0 1px 6px rgba(245,158,11,0.5)',
                }}
            />
        </button>
    );
}
