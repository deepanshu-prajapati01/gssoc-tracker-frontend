'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // To avoid hydration mismatches
    useEffect(() => {
        setMounted(true);
    }, []);

    // Add keyboard shortcut listener
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Toggle theme on Ctrl/Cmd + K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setTheme(theme === 'dark' ? 'light' : 'dark');
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [theme, setTheme]);

    if (!mounted) return null; // Prevent rendering until mounted

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="shadow-sm cursor-pointer p-2 rounded-full border border-emerald-500 dark:border-purple-500 transition-all duration-300 ease-in-out hover:bg-emerald-100 dark:hover:bg-violet-700/30"
            title="Toggle theme (Ctrl+K)"
        >
            {theme === 'dark' ? (
                <Sun
                    className="h-5 w-5 text-emerald-600 dark:text-violet-500 ease-in-out"
                />
            ) : (
                <Moon
                    className="h-5 w-5 text-emerald-600 dark:text-violet-500  ease-in-out"
                />
            )}
        </button>
    );
}
