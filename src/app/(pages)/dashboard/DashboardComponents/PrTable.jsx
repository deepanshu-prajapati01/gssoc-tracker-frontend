import React, { useState, useMemo } from "react";

const PrTable = ({ prs, labelStats }) => {
    const [activeFilter, setActiveFilter] = useState(null);

    const filteredPrs = useMemo(() => {
        if (!activeFilter) return prs;
        return prs.filter(pr => pr.status && pr.status.toLowerCase() === activeFilter.toLowerCase());
    }, [prs, activeFilter]);

    const clearFilter = () => setActiveFilter(null);

    const statusColors = {
        valid: "bg-emerald-100 text-emerald-800 dark:bg-violet-900/30 dark:text-violet-300",
        invalid: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    };

    return (
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Pull Requests</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Track all your contributions and their status
                    </p>
                </div>
                {activeFilter && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Filtered by:</span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-violet-900/30 text-emerald-800 dark:text-violet-300">
                            {activeFilter}
                            <button onClick={clearFilter} className="ml-1 font-bold">&times;</button>
                        </span>
                    </div>
                )}
            </div>

            {/* Label Filter */}
            {labelStats && Object.keys(labelStats).length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Filter by label:</h4>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={clearFilter}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!activeFilter
                                ? "bg-emerald-100 text-emerald-800 dark:bg-violet-900/30 dark:text-violet-300"
                                : "bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700"
                                }`}
                        >
                            All ({prs.length})
                        </button>
                        {Object.entries(labelStats).map(([label, count]) => (
                            <button
                                key={label}
                                onClick={() => setActiveFilter(label)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeFilter === label
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-violet-900/30 dark:text-violet-300"
                                    : "bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700"
                                    }`}
                            >
                                {label} ({count})
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* PR Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPrs.length > 0 ? filteredPrs.map((pr, idx) => (
                    <div
                        key={idx}
                        className="bg-slate-50 dark:bg-neutral-800 p-4 rounded-xl shadow hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                        <div className="mb-3">
                            <h4 className="text-md font-semibold text-slate-900 dark:text-white mb-1">{pr.title}</h4>
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Points: {pr.points}</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[pr.status] || statusColors.pending}`}>
                                    {pr.status}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {pr.labels.map((label, i) => (
                                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-neutral-700 text-slate-700 dark:text-slate-300">
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 mt-3">
                            <div>
                                <div>Created: {new Date(pr.createdAt).toLocaleDateString()}</div>
                                <div>Merged: {pr.mergedAt ? new Date(pr.mergedAt).toLocaleDateString() : "-"}</div>
                            </div>
                            <a
                                href={pr.prLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-violet-400 hover:text-emerald-700 dark:hover:text-violet-300 transition-colors"
                            >
                                View
                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-8 text-center text-slate-500 dark:text-slate-400">
                        No pull requests found
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrTable;
