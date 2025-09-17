import React from 'react';

export default function LeaderboardSkeleton() {
    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-neutral-800">
                    <thead className="bg-slate-50 dark:bg-neutral-800/50">
                        <tr>
                            {['Rank', 'Contributor', 'Total PRs', 'Total Points', 'Badge Earned', ''].map((header, i) => (
                                <th
                                    key={i}
                                    className="py-4 px-6 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-slate-200 dark:divide-neutral-800">
                        {[...Array(30)].map((_, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-slate-50/50 dark:hover:bg-neutral-800/50 transition-colors duration-200">
                                {/* Rank */}
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center justify-center">
                                        <div className="w-10 h-6 rounded-lg bg-slate-200 dark:bg-neutral-700 animate-pulse"></div>
                                    </div>
                                </td>
                                
                                {/* Contributor */}
                                <td className="py-4 px-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden border-2 border-white dark:border-neutral-900 bg-slate-200 dark:bg-neutral-700 animate-pulse"></div>
                                        <div className="ml-4">
                                            <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded w-24 mb-1"></div>
                                            <div className="h-3 bg-slate-200 dark:bg-neutral-700 rounded w-16"></div>
                                        </div>
                                    </div>
                                </td>
                                
                                {/* Total PRs */}
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded w-8 mx-auto"></div>
                                </td>
                                
                                {/* Total Points */}
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded w-12 mx-auto"></div>
                                </td>
                                
                                {/* Badge Earned */}
                                <td className="py-4 px-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 size-12 rounded-full overflow-hidden border border-slate-200 dark:border-neutral-700 bg-slate-200 dark:bg-neutral-700 animate-pulse"></div>
                                        <div className="ml-3">
                                            <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded w-24 mb-1"></div>
                                            <div className="h-3 bg-slate-200 dark:bg-neutral-700 rounded w-12"></div>
                                        </div>
                                    </div>
                                </td>
                                
                                {/* Action */}
                                <td className="py-4 px-6 text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-emerald-700 bg-emerald-50 dark:bg-violet-500/10 dark:text-violet-300 h-9 w-24 animate-pulse"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
