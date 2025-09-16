'use client'
import { useState } from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Menu, Home, LayoutDashboard, Trophy, Folder, BookOpen, Github, Linkedin, Instagram } from 'lucide-react'
import ThemeToggle from "./NavbarComponents/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
    const pathname = usePathname()

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
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
            <div className="flex h-16 items-center px-4 sm:px-6">
                {/* Logo / Brand - Always on the left */}
                <div className="flex-shrink-0">
                    <Link 
                        href="/" 
                        className="text-lg font-bold text-foreground transition-colors hover:text-primary"
                    >
                        GSSoC <span className="text-primary">Tracker</span>
                    </Link>
                </div>

                {/* Desktop Navigation Links - Centered */}
                <div className="hidden md:flex items-center justify-center flex-1">
                    <div className="flex space-x-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex h-10 items-center px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                                    pathname === link.href
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right side - Mobile menu and theme toggle */}
                <div className="flex items-center space-x-2 ml-auto">
                    <ThemeToggle />
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-0">
                            <div className="flex-1 overflow-y-auto">
                                <div className="px-6 pt-6 pb-2">
                                    <h2 className="text-lg font-semibold text-foreground">Menu</h2>
                                    <div className="mt-1 h-0.5 w-12 bg-primary/50 rounded-full"></div>
                                </div>
                                <div className="p-2 space-y-1">
                                {links.map((link) => {
                                    const Icon = link.icon || Menu;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`flex items-center h-12 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                                pathname === link.href
                                                    ? 'bg-accent text-accent-foreground'
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                                            }`}
                                        >
                                            <Icon className="mr-3 h-5 w-5 flex-shrink-0 opacity-75" />
                                            <span className="relative">
                                                {link.name}
                                                {pathname === link.href && (
                                                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50 rounded-full"></span>
                                                )}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                            </div>

                            <div className="border-t p-6 space-y-4 bg-muted/10">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-foreground">GSSoC Tracker</p>
                                    <p className="text-xs text-muted-foreground">Track your GirlScript Summer of Code progress and connect with the community.</p>
                                </div>
                                
                                <div className="pt-2">
                                    <p className="text-xs text-muted-foreground mb-2">Built with ❤️ by</p>
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20">
                                            <img 
                                                src="https://avatars.githubusercontent.com/u/98377377?u=96ff9abd7851416e7e997b4efa7efdf1df1ca9b0&v=4" 
                                                alt="Deepanshu Prajapati"
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">Deepanshu Prajapati</p>
                                            <p className="text-xs text-muted-foreground">Full Stack Developer</p>
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
                                                className="h-9 w-9 flex items-center justify-center rounded-md bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
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
