'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import badgesData from '@/lib/badges.json'
import { ArrowRight, Award } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

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
}

const BadgesSection = () => {
    return (
        <section className="relative py-16 bg-white dark:bg-neutral-900 overflow-hidden">
            {/* Decorative Grid Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />


            {/* Geometric Shape Decorations */}
            <div className="absolute top-1/3 -left-6 w-24 h-24 border border-emerald-300 dark:border-violet-400/40 rounded-full opacity-30" />
            <div className="absolute bottom-1/4 -right-8 w-20 h-20 border border-emerald-300 dark:border-violet-400/40 rotate-12 opacity-30" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="flex flex-col md:flex-row items-center gap-12"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={container}
                >
                    {/* Spotlight Badge */}
                    <motion.div className="w-full md:w-1/2 flex justify-center" variants={item}>
                        <div className="relative flex flex-col items-center">
                            <div className="relative aspect-square w-full max-w-xs mx-auto">
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-emerald-100/50 dark:bg-violet-500/20 blur-3xl animate-pulse"
                                    aria-hidden="true"
                                />
                                <img
                                    src="/badges/Legend-Badge.png"
                                    alt="Legend Badge"
                                    className="object-contain relative z-10 drop-shadow-lg"
                                />
                            </div>
                            <motion.p
                                className="text-lg font-medium text-slate-700 dark:text-neutral-300 mt-6 text-center"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                {badgesData[badgesData.length - 1]?.badgeName || 'Legend Badge'}
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Text + Badge Grid */}
                    <motion.div className="w-full md:w-1/2 text-center md:text-left" variants={item}>
                        {/* Small Pill */}
                        <motion.div
                            className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium px-4 py-2 rounded-full mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Award className="h-4 w-4" />
                            <span>Showcase Your Work</span>
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Earn Digital Badges
                        </motion.h2>

                        <motion.p
                            className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Showcase your contributions with exclusive digital badges. Earn them by working on issues and climbing the leaderboard.
                        </motion.p>

                        {/* Badge Grid */}
                        <motion.div
                            className="grid grid-cols-3 gap-4 sm:gap-6 mt-8"
                            variants={container}
                        >
                            {badgesData.slice(0, 6).map((badge, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center group"
                                    variants={item}
                                >
                                    <motion.div
                                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-50 dark:bg-neutral-800/50 flex items-center justify-center mb-2 shadow-sm group-hover:shadow-md transition-all duration-300 border border-slate-200 dark:border-neutral-700 group-hover:border-emerald-200 dark:group-hover:border-violet-500/30"
                                        whileHover={{ scale: 1.05, y: -4 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Image
                                            src={badge.badgeImage || '/badges/default-badge.png'}
                                            alt={badge.badgeName}
                                            width={48}
                                            height={48}
                                            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/badges/default-badge.png';
                                            }}
                                        />
                                    </motion.div>
                                    <span className="text-xs font-medium text-slate-600 dark:text-neutral-300 text-center leading-tight px-1">
                                        {badge.badgeName}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            className="text-center md:text-left mt-10"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link href="/badges">
                                <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-violet-600 dark:hover:bg-violet-700 transition-colors group">
                                    View All Badges
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default BadgesSection
