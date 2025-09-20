'use client';
import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboard.store';
import { Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardInput = () => {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUsername: setStoreUsername, fetchDashboard } = useDashboardStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setIsLoading(true);
        try {
            await fetchDashboard(username);
            setStoreUsername(username);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen  backdrop-blur-sm p-3 lg:p-6 flex justify-center space-y-10 relative overflow-hidden">
            <div className=' min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8'>
                <motion.div
                    className="w-full max-w-md p-8 rounded-2xl bg-white/30 dark:bg-neutral-900/50 border border-white/20 dark:border-neutral-700/50 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 dark:bg-violet-500/10 mb-6">
                            <Github className="h-8 w-8 text-emerald-600 dark:text-violet-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            Track Your GSSoC Journey
                        </h2>
                        <p className="text-slate-600 dark:text-neutral-400 mb-8">
                            Enter your GitHub username to view your contribution progress and statistics
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="github-username" className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">
                                GitHub Username
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-slate-500 dark:text-neutral-400">
                                        github.com/
                                    </span>
                                </div>
                                <input
                                    id="github-username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-28 pr-4 py-3 border border-slate-300 dark:border-neutral-700 rounded-lg bg-white/50 dark:bg-neutral-800/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                                    placeholder="yourusername"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                            </div>
                        </div>

                        <div>
                            <motion.button
                                type="submit"
                                className="group w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-violet-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading || !username.trim()}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        View My Dashboard
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-500 dark:text-neutral-500">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </motion.div>
            </div>

        </div>
    );
};

export default DashboardInput;
