import React from 'react';
import { Trophy, ExternalLink } from 'lucide-react';

const SkeletonBox = ({ className = '', children, ...props }) => (
    <div
        className={`bg-gray-200 dark:bg-neutral-700 rounded-lg animate-pulse ${className}`}
        {...props}
    >
        {children}
    </div>
);

const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen p-4 bg-zinc-50 dark:bg-neutral-900/80">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6">
                {/* Left sidebar skeleton */}
                <div className="rounded-lg col-span-12 lg:col-span-4 xl:col-span-3 space-y-4">
                    {/* User Profile Skeleton */}
                    <div className="border border-gray-200 dark:border-neutral-700 p-4 rounded-lg bg-white dark:bg-neutral-800/50 shadow-sm">
                        <div className="flex flex-col items-center space-y-4">
                            {/* Avatar */}
                            <div className="relative">
                                <SkeletonBox className="h-24 w-24 rounded-full border-4 border-emerald-100 dark:border-violet-900/50" />
                            </div>

                            {/* User Info */}
                            <div className="text-center">
                                <SkeletonBox className="h-7 w-40 mx-auto mb-1" />
                                <div className="flex items-center justify-center">
                                    <SkeletonBox className="h-4 w-24" />
                                    <ExternalLink className="h-3.5 w-3.5 ml-1 text-gray-400" />
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="w-full grid grid-cols-2 gap-3 mt-2">
                                <div className="bg-slate-50 dark:bg-neutral-800 p-3 rounded-lg">
                                    <SkeletonBox className="h-3 w-16 mb-2 mx-auto" />
                                    <SkeletonBox className="h-6 w-12 mx-auto" />
                                </div>
                                <div className="bg-slate-50 dark:bg-neutral-800 p-3 rounded-lg">
                                    <SkeletonBox className="h-3 w-16 mb-2 mx-auto" />
                                    <SkeletonBox className="h-6 w-12 mx-auto" />
                                </div>
                            </div>

                            {/* Rank Badge */}
                            <div className="w-full bg-emerald-50 dark:bg-violet-900/30 rounded-lg p-3">
                                <div className="flex items-center justify-center gap-2">
                                    <Trophy className="h-4 w-4 text-amber-500" />
                                    <SkeletonBox className="h-4 w-16" />
                                </div>
                                <SkeletonBox className="h-3 w-32 mt-1 mx-auto" />
                            </div>
                        </div>
                    </div>

                    {/* Streaks Section Skeleton */}
                    <div className="border border-gray-200 dark:border-neutral-700 p-4 rounded-lg bg-white dark:bg-neutral-800/50 shadow-sm">
                        {/* Current Streak */}
                        <div className="relative bg-emerald-50 dark:bg-violet-900/30 p-5 rounded-lg mb-4 overflow-hidden">
                            <div className="text-center">
                                <SkeletonBox className="h-4 w-24 mx-auto mb-2" />
                                <SkeletonBox className="h-10 w-32 mx-auto mb-1" />
                                <SkeletonBox className="h-3 w-40 mx-auto" />
                            </div>
                        </div>

                        {/* Best Streak */}
                        <div className="bg-slate-50 dark:bg-neutral-800 p-3 rounded-lg flex justify-between items-center mb-3">
                            <div>
                                <SkeletonBox className="h-4 w-16 mb-1" />
                                <SkeletonBox className="h-7 w-20" />
                            </div>
                            <SkeletonBox className="h-3 w-24" />
                        </div>

                        {/* Contribution Range */}
                        <div className="pt-3 border-t border-slate-200 dark:border-neutral-700">
                            <SkeletonBox className="h-4 w-32 mb-2" />
                            <SkeletonBox className="h-4 w-48" />
                        </div>
                    </div>
                </div>

                {/* Main content area skeleton */}
                <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">
                    {/* Top row - Rank Progress and PR Points */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 border border-gray-200 dark:border-neutral-700 p-6 rounded-lg bg-white dark:bg-neutral-800/50 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-100 dark:bg-violet-900/30 rounded-lg">
                                    <Trophy className="h-5 w-5 text-emerald-600 dark:text-violet-500" />
                                </div>
                                <SkeletonBox className="h-6 w-32" />
                            </div>

                            {/* Next Rank Progress */}
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <SkeletonBox className="h-4 w-24" />
                                        <SkeletonBox className="h-4 w-20" />
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-1">
                                        <div className="flex items-center">
                                            <div className="flex-1 bg-slate-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                                                <SkeletonBox className="h-2 w-3/4" style={{ minWidth: '20%' }} />
                                            </div>
                                            <SkeletonBox className="ml-3 h-4 w-12" />
                                        </div>
                                        <SkeletonBox className="h-3 w-40" />
                                    </div>
                                </div>

                                {/* Ultimate Target */}
                                <div className="pt-4 border-t border-slate-100 dark:border-neutral-800 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <SkeletonBox className="h-4 w-32" />
                                        <SkeletonBox className="h-4 w-24" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <div className="flex-1 bg-slate-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                                                <SkeletonBox className="h-2 w-1/2" style={{ minWidth: '10%' }} />
                                            </div>
                                            <SkeletonBox className="ml-3 h-4 w-12" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                                                    Points needed
                                                </p>
                                                <div className="relative">
                                                    <SkeletonBox className="h-5 w-20" />
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                                                    Total target
                                                </p>
                                                <div className="flex justify-end">
                                                    <SkeletonBox className=" h-5 w-20" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 border border-gray-200 dark:border-neutral-700 p-6 rounded-lg bg-white dark:bg-neutral-800/50">
                            <SkeletonBox className="h-6 w-32 mb-4" />
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="flex flex-col items-center p-3">
                                        <SkeletonBox className="h-4 w-16 mb-2" />
                                        <SkeletonBox className="h-8 w-8 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom row - Contribution Graph and Badges */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-[66] border border-gray-200 dark:border-neutral-700 p-6 rounded-lg bg-white dark:bg-neutral-800/50">
                            <SkeletonBox className="h-6 w-48 mb-4" />
                            <div className="flex justify-between mb-2">
                                {[...Array(7)].map((_, i) => (
                                    <SkeletonBox key={i} className="h-4 w-2" />
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1 h-40">
                                {[...Array(35)].map((_, i) => (
                                    <SkeletonBox key={i} className="h-full" />
                                ))}
                            </div>
                        </div>
                        <div className="flex-[33] border border-gray-200 dark:border-neutral-700 p-6 rounded-lg bg-white dark:bg-neutral-800/50">
                            <SkeletonBox className="h-6 w-32 mb-4" />
                            <div className="grid grid-cols-2 gap-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <SkeletonBox key={item} className="h-20 rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* PR Table Skeleton */}
                <div className="col-span-12 space-y-4">
                    <div className="border border-gray-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800/50 p-6">
                        <SkeletonBox className="h-6 w-48 mb-6" />
                        <div className="space-y-3">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 mb-2">
                                {['w-16', 'w-32', 'w-24', 'w-16', 'w-16', 'w-16'].map((width, i) => (
                                    <SkeletonBox key={i} className={`h-4 ${width}`} />
                                ))}
                            </div>
                            {/* Table Rows */}
                            {[1, 2, 3].map((row) => (
                                <div key={row} className="grid grid-cols-12 gap-4 py-2">
                                    <SkeletonBox className="h-4 w-16" />
                                    <SkeletonBox className="h-4 w-32" />
                                    <SkeletonBox className="h-4 w-24" />
                                    <SkeletonBox className="h-4 w-16" />
                                    <SkeletonBox className="h-4 w-16" />
                                    <SkeletonBox className="h-4 w-16" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
