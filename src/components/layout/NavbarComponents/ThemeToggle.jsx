'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react'; // Icons from lucide-react (shadcn-compatible)

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
            className="shadow-sm cursor-pointer p-2 rounded-full transition-all duration-300 ease-in-out dark:bg-black bg-white hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Toggle theme (Ctrl+K)"
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-black dark:text-white transition-transform duration-300 ease-in-out" />
            ) : (
                <Moon className="h-5 w-5 text-black dark:text-white transition-transform duration-300 ease-in-out" />
            )}
        </button>
    );
}
