'use client'
import { motion } from 'framer-motion';
import { Search, GitBranch, GitPullRequest } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
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

const steps = [
    {
        icon: <Search className="h-8 w-8 text-emerald-600 dark:text-violet-500" />,
        title: "Find Your Project",
        description: "Browse through our curated list of projects and find one that matches your tech stack and interests.",
    },
    {
        icon: <GitBranch className="h-8 w-8 text-emerald-600 dark:text-violet-500" />,
        title: "Get Assigned",
        description: "Look for open issues or propose new ones. Get assigned by project maintainers to start working.",
    },
    {
        icon: <GitPullRequest className="h-8 w-8 text-emerald-600 dark:text-violet-500" />,
        title: "Contribute & Merge",
        description: "Work on your assigned issue, submit a pull request, and get your code reviewed and merged.",
    },
];

const HowItWorksSection = () => {
    return (
        <section className="relative py-16 bg-slate-50 dark:bg-neutral-900 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Decorative Elements */}
            <div className="absolute top-1/4 -left-12 w-32 h-32 rounded-full bg-emerald-100/50 dark:bg-violet-500/20 blur-3xl" />
            <div className="absolute bottom-1/3 -right-12 w-40 h-40 rounded-full bg-emerald-100/30 dark:bg-violet-500/10 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
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
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        How to Contribute
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Join our community of developers and make your mark on open source. Here's how you can get started.
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="p-6 bg-white dark:bg-neutral-900 rounded-xl border-2 border-slate-200 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-violet-500 transition-all duration-300 shadow-sm"
                            variants={item}
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-violet-500/10 flex items-center justify-center mb-6 mx-auto">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-center text-slate-900 dark:text-white mb-3">
                                {step.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 text-center">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                        Want to learn more about contributing to open source?
                    </p>
                    <Link href="/resources">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-violet-600 dark:hover:bg-violet-700 transition-colors group px-6 py-6 text-base">
                            View Detailed Contribution Guide
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
