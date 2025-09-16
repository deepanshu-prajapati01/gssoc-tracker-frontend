'use client';

import { motion } from 'framer-motion';
import { Github, MessageSquare, Users, Calendar } from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
};

const CommunitySection = () => {
    const features = [
        {
            icon: <MessageSquare className="h-6 w-6" />,
            title: 'Active Discussions',
            description:
                'Engage in meaningful conversations with mentors and peers in our community forums.',
        },
        {
            icon: <Calendar className="h-6 w-6" />,
            title: 'Events & Workshops',
            description:
                'Participate in regular coding sessions, workshops, and networking events.',
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: 'Mentorship',
            description:
                'Get guidance from experienced mentors to accelerate your learning and contributions.',
        },
    ];

    return (
        <section className="py-20 bg-zinc-50 dark:bg-neutral-900/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
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
                            transition: { type: 'spring', stiffness: 100, damping: 15 },
                        },
                    }}
                >
                    <motion.h2
                        className="text-3xl font-bold text-zinc-900 dark:text-white"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Join Our Growing Community
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Connect with developers, mentors, and open source enthusiasts. Learn,
                        collaborate, and grow together in your open source journey.
                    </motion.p>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-10 items-start">
                    {/* Features */}
                    <motion.div
                        className="space-y-6"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={container}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-4 group"
                                variants={item}
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <motion.div
                                    className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 dark:bg-violet-900/30 flex items-center justify-center text-emerald-600 dark:text-violet-400 group-hover:scale-110 transition-transform"
                                >
                                    {feature.icon}
                                </motion.div>
                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Card */}
                    <motion.div
                        className="bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-zinc-700"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
                        whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                    >
                        <motion.h3
                            className="text-2xl font-bold text-zinc-900 dark:text-white mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Ready to get started?
                        </motion.h3>
                        <motion.p
                            className="text-gray-600 dark:text-gray-300 mb-8"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            Contribute to our open-source frontend repo, or join the WhatsApp
                            community to collaborate in real time.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            className="space-y-4"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={container}
                        >
                            <motion.a
                                href="https://github.com/deepanshu-prajapati01/gssoc-tracker-frontend"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Github className="h-5 w-5" />
                                Contribute to Frontend Repo
                            </motion.a>

                            <motion.a
                                href="https://chat.whatsapp.com/JVt4KRZ9LFrAKDUeIdIOc5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 transition-colors"
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <MessageSquare className="h-5 w-5" />
                                Join WhatsApp Community
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CommunitySection;
