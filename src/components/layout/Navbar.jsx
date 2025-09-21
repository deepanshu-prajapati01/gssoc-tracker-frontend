'use client'
import { useState, useEffect } from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Menu, Home, LayoutDashboard, Trophy, Folder, BookOpen, Github, Linkedin, Instagram, RefreshCw } from 'lucide-react'
import ThemeToggle from "./NavbarComponents/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useDashboardStore } from '@/store/dashboard.store'
import { useLeaderboardStore } from '@/store/leaderboard.store'

function RefreshLeaderboard() {
    const { adminRefreshLeaderboard } = useLeaderboardStore()
    const { username } = useDashboardStore()

    if (username !== 'deepanshu-prajapati01') return null;

    const handleRefreshLeaderboard = () => {
        const password = prompt("Enter password")
        if (password.length < 8) return;
        adminRefreshLeaderboard(password)
    }

    return (
        <button
            className="shadow-sm cursor-pointer p-2 rounded-full border border-emerald-500 dark:border-purple-500 transition-all duration-300 ease-in-out hover:bg-emerald-100 dark:hover:bg-violet-700/30"
            onClick={() => handleRefreshLeaderboard()}
            title="Refresh leaderboard"
        >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
        </button>
    )



}




export default function Navbar() {
    const { username: storeUsername, resetUsername } = useDashboardStore()
    const [isMounted, setIsMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const links = [
        { name: "Home", href: "/", icon: Home },
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
        { name: "Projects", href: "/projects", icon: Folder },
        { name: "Resources", href: "/resources", icon: BookOpen },
    ]

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/deepanshu-prajapati01', icon: Github },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/deepanshu-prajapati01', icon: Linkedin },
        { name: 'Instagram', url: 'https://instagram.com/deepanshu_prajapati01', icon: Instagram },
    ]

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm">
            <div className="flex h-16 items-center px-4 sm:px-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link
                        href="/"
                        className="text-lg font-bold text-slate-800 dark:text-neutral-100"
                    >
                        GSSoC <span className="text-emerald-600 dark:text-violet-500">Tracker</span>
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center justify-center flex-1">
                    <div className="flex space-x-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex h-10 items-center px-3 py-2 text-sm font-medium rounded-md
                                    ${pathname === link.href
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-violet-700/30 dark:text-violet-300'
                                        : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-neutral-400 dark:hover:text-violet-400 dark:hover:bg-violet-700/20'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-2 ml-auto">
                    <div className='flex justify-center items-center gap-x-4'>

                        < RefreshLeaderboard />
                        <ThemeToggle />

                        {!isMounted ? (
                            <div className='h-8 w-24 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse' />
                        ) : storeUsername ? (
                            <button
                                className='text-xs border border-emerald-500 dark:border-purple-500 px-3 py-1.5 rounded-md hover:bg-emerald-100 dark:hover:bg-violet-900 transition-colors duration-200 flex items-center gap-1.5'
                                onClick={resetUsername}
                            >
                                <span>Logout</span>
                                <span className='text-xs opacity-70'>({storeUsername})</span>
                            </button>
                        ) : (
                            <Link
                                href="/dashboard"
                                className='text-xs border border-emerald-500 dark:border-purple-500 px-3 py-1.5 rounded-md hover:bg-emerald-100 dark:hover:bg-violet-900 transition-colors duration-200'
                            >
                                Add an account
                            </Link>
                        )}




                    </div>


                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-0 bg-white dark:bg-neutral-900">
                            <div className="flex-1 overflow-y-auto">
                                <div className="px-6 pt-6 pb-2">
                                    <h2 className="text-lg font-semibold text-slate-800 dark:text-neutral-100">Menu</h2>
                                    <div className="mt-1 h-0.5 w-12 bg-emerald-500 dark:bg-violet-500 rounded-full"></div>
                                </div>
                                <div className="p-2 space-y-1">
                                    {links.map((link) => {
                                        const Icon = link.icon || Menu;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`flex items-center h-12 px-4 py-2 text-sm font-medium rounded-md
                                                    ${pathname === link.href
                                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-violet-700/30 dark:text-violet-300'
                                                        : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-neutral-400 dark:hover:text-violet-400 dark:hover:bg-violet-700/20'
                                                    }`}
                                            >
                                                <Icon className="mr-3 h-5 w-5 flex-shrink-0 opacity-75" />
                                                <span className="relative">{link.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="border-t border-slate-200 dark:border-neutral-700 p-6 space-y-4 bg-slate-50 dark:bg-neutral-800/50">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-slate-800 dark:text-neutral-100">GSSoC Tracker</p>
                                    <p className="text-xs text-slate-500 dark:text-neutral-400">Track your GirlScript Summer of Code progress and connect with the community.</p>
                                </div>

                                <div className="pt-2">
                                    <p className="text-xs text-slate-500 dark:text-neutral-400 mb-2">Built with ❤️ by</p>
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-emerald-300 dark:border-violet-400/40">
                                            <img
                                                src="https://avatars.githubusercontent.com/u/98377377?u=96ff9abd7851416e7e997b4efa7efdf1df1ca9b0&v=4"
                                                alt="Deepanshu Prajapati"
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-800 dark:text-neutral-100">Deepanshu Prajapati</p>
                                            <p className="text-xs text-slate-500 dark:text-neutral-400">Full Stack Developer</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 pt-2">
                                    {socialLinks.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="h-9 w-9 flex items-center justify-center rounded-md bg-slate-100 border border-slate-300 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-violet-400 dark:hover:bg-violet-700/20"
                                                aria-label={social.name}
                                                title={social.name}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
