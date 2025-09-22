'use client';

import { Trophy, Award, Zap, Star, TrendingUp, ArrowRight, GitPullRequest, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import badgesData from '@/lib/badges.json';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export default function BadgesPage() {
    const sortedBadges = [...badgesData].sort((a, b) => a.pointsRequired - b.pointsRequired);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-neutral-900/80 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }
                        }
                    }}
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 dark:bg-violet-500/10 dark:text-violet-400 mb-6">
                        <Trophy className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Badges & Rewards
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Earn badges by making contributions and climbing the leaderboard. Each badge represents a significant milestone in your open source journey.
                    </p>
                </motion.div>

                {/* Badges Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {sortedBadges.map((badge, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group bg-white dark:bg-neutral-900 rounded-xl border-2 border-slate-200 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-violet-500 transition-all duration-300 shadow-sm overflow-hidden"
                        >
                            <div className="p-2">
                                <div className="flex items-center justify-center p-6">
                                    <div className="relative w-32 h-32">
                                        <Image
                                            src={badge.badgeImage}
                                            alt={badge.badgeName}
                                            fill
                                            className="object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/badges/default-badge.png';
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-neutral-800/50 h-full border-t border-slate-100 dark:border-neutral-700/50">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {badge.badgeName}
                                    </h3>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-violet-700/30 dark:text-violet-300">
                                        {badge.pointsRequired} Points
                                    </span>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300">
                                    {badge.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* How to Earn Section */}
                <motion.div 
                    className="bg-white dark:bg-neutral-900 p-8 md:p-12 mb-16 rounded-xl border-2 border-slate-200 dark:border-neutral-800 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-violet-500/10 dark:text-violet-400 mb-6">
                            <Zap className="h-7 w-7" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                            How to Earn Badges?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
                            Earn points by contributing to open source projects. Each badge requires a specific number of points, which you can earn by:
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                            {[
                                { icon: <GitPullRequest className="h-6 w-6" />, text: "Submitting quality pull requests" },
                                { icon: <MessageSquare className="h-6 w-6" />, text: "Helping other contributors" },
                                { icon: <Star className="h-6 w-6" />, text: "Completing assigned issues" }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    className="flex flex-col items-center p-6 bg-slate-50 dark:bg-neutral-800/50 rounded-xl border border-slate-200 dark:border-neutral-700/50"
                                    variants={item}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                >
                                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 dark:bg-violet-700/30 dark:text-violet-300 mb-4 flex justify-center items-center">
                                        {item.icon}
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-200 text-center">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/projects">
                                <Button className="h-12 px-6 text-base bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-violet-600 dark:hover:bg-violet-700 transition-colors group">
                                    Start Contributing
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/leaderboard">
                                <Button 
                                    variant="outline" 
                                    className="h-12 px-6 text-base border-slate-300 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-violet-700/20 dark:hover:text-violet-400"
                                >
                                    View Leaderboard
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}