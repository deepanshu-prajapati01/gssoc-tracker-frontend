'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

const AnimatedCounter = ({ value, suffix = '' }) => {
    const nodeRef = useRef()
    const observerRef = useRef()

    useEffect(() => {
        const node = nodeRef.current

        const startAnimation = () => {
            let start = 0
            let frame
            const duration = 1200
            const startTime = performance.now()

            function animateCounter(now) {
                const elapsed = now - startTime
                const progress = Math.min(elapsed / duration, 1)
                const current = Math.ceil(start + (value - start) * progress)
                node.textContent = current.toLocaleString() + suffix
                if (progress < 1) {
                    frame = requestAnimationFrame(animateCounter)
                }
            }

            frame = requestAnimationFrame(animateCounter)
            return () => {
                if (frame) cancelAnimationFrame(frame)
            }
        }

        // Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startAnimation()
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        observer.observe(node)
        observerRef.current = observer

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [value, suffix])

    return (
        <span
            ref={nodeRef}
            className="text-4xl sm:text-5xl font-extrabold inline-block min-w-[100px]"
        />
    )
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
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

const StatsSection = () => {
    const stats = [
        { value: 3000, title: "Total Contributions", description: "And counting!" },
        { value: 2000, title: "Active Contributors", description: "Passionate developers making an impact" },
        { value: 1000, title: "Mentors", description: "Experienced guides supporting growth" },
        { value: 500, title: "Open Source Projects", description: "Innovative projects to contribute to" },
    ]

    return (
        <section className="relative py-16 bg-white dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 overflow-hidden">
            {/* Decorative Grid Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-neutral-100 mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-neutral-400 max-w-3xl mx-auto">
                        Join thousands of developers in the GSSoC 2025 community and be part of something bigger
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={container}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="p-6 bg-white dark:bg-neutral-900 rounded-xl border-2 border-slate-200 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-violet-500 transition-all duration-300 shadow-sm"
                        >
                            <p className="text-3xl font-bold text-emerald-600 dark:text-violet-400">
                                <AnimatedCounter value={stat.value} suffix="+" />
                            </p>
                            <h3 className="mt-2 text-lg font-semibold text-slate-800 dark:text-neutral-100">
                                {stat.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-600 dark:text-neutral-400">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default StatsSection
