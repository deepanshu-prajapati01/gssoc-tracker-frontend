import React from 'react';

export default function LeaderboardSkeleton() {
    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-neutral-800">
                    <thead className="bg-slate-50 dark:bg-neutral-800/50">
                        <tr>
                            {[...Array(6)].map((_, i) => (
                                <th
                                    key={i}
                                    className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                                >
                                    <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded w-3/4"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-slate-200 dark:divide-neutral-800">
                        {[...Array(30)].map((_, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-slate-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                {[...Array(6)].map((_, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {cellIndex === 1 ? (
                                                // For user cell with avatar
                                                <>
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 dark:bg-neutral-700 animate-pulse"></div>
                                                    <div className="ml-4">
                                                        <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded w-24 mb-2"></div>
                                                        <div className="h-3 bg-slate-200 dark:bg-neutral-700 rounded w-16"></div>
                                                    </div>
                                                </>
                                            ) : cellIndex === 4 ? (
                                                // For badge cell
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-200 dark:bg-neutral-700 animate-pulse"></div>
                                                    <div className="ml-3">
                                                        <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded w-24 mb-1"></div>
                                                        <div className="h-3 bg-slate-200 dark:bg-neutral-700 rounded w-12"></div>
                                                    </div>
                                                </div>
                                            ) : cellIndex === 5 ? (
                                                // For action button
                                                <div className="h-9 w-24 bg-slate-200 dark:bg-neutral-700 rounded-lg animate-pulse ml-auto"></div>
                                            ) : (
                                                // For regular cells
                                                <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded w-3/4"></div>
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
