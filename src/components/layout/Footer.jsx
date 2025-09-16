import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail, MessageCircle, Instagram, Linkedin } from 'lucide-react';

// ==== External Links ====
const LINKS = {
    WHATSAPP: 'https://chat.whatsapp.com/JVt4KRZ9LFrAKDUeIdIOc5',
    GITHUB_REPO: 'https://github.com/deepanshu-prajapati01/gssoc-tracker-frontend',
    GITHUB_ORG: 'https://github.com/deepanshu-prajapati01',
    INSTAGRAM: 'https://instagram.com/deepanshu_prajapati01',
    LINKEDIN: 'https://linkedin.com/in/deepanshu-prajapati01',
};

// ==== Quick Navigation Links ====
const quickLinks = [
    { label: 'Projects', href: '/projects' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Resources', href: '/resources' },
];

// ==== Community Links ====
const communityLinks = [
    {
        label: 'WhatsApp Group',
        href: LINKS.WHATSAPP,
        icon: <MessageCircle className="h-4 w-4 mr-2" />,
    },
    {
        label: 'GitHub Repository',
        href: LINKS.GITHUB_REPO,
        icon: <Github className="h-4 w-4 mr-2" />,
    },
];

// ==== Social Media Icons ====
const socialLinks = [
    {
        href: LINKS.GITHUB_ORG,
        icon: <Github className="h-5 w-5" />,
        label: 'GitHub',
    },
    {
        href: LINKS.INSTAGRAM,
        icon: <Instagram className="h-4 w-4 mr-2" />,
        label: 'Instagram',
    },
    {
        href: LINKS.LINKEDIN,
        icon: <Linkedin className="h-4 w-4 mr-2" />,
        label: 'LinkedIn',
    },
];

// ==== Footer Component ====
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8">
                    {/* Logo and Description */}
                    <div className="flex flex-col space-y-4 max-w-sm">
                        <h2 className="text-2xl font-bold">
                            <span className="text-slate-800 dark:text-neutral-100">
                                GSSoC
                            </span>{" "}
                            <span className="text-emerald-600 dark:text-violet-500">
                                Tracker
                            </span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            Track your contributions, earn badges, and grow your open-source
                            journey with GirlScript Summer of Code.
                        </p>

                        {/* Social Media */}
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                                Connect With Us
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.href}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Quick Links */}
                    <div className='flex flex-col items-center '>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="flex justify-center flex-col gap-1">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-violet-400 text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div className='flex flex-col items-center '>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Community Links
                        </h3>
                        <ul className="space-y-2">
                            {communityLinks.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-violet-400 text-sm transition-colors"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>


                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-slate-200 dark:border-neutral-800 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        © {currentYear} GSSoC Tracker. All rights reserved. | Made with ❤️
                        by the GSSoC Community
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
