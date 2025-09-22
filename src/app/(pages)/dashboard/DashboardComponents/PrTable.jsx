import React, { useState, useMemo, useRef, useEffect } from "react";

const PrTable = ({ prs, labelStats }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
    const [pointFilter, setPointFilter] = useState(null);
    const filterRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredPrs = useMemo(() => {
        let result = [...prs]; // Create a copy of the array to avoid mutating the original

        // Apply status filter
        if (activeFilter) {
            result = result.filter(pr => pr.status && pr.status.toLowerCase() === activeFilter.toLowerCase());
        }

        // Apply point filter
        if (pointFilter !== null) {
            result = result.filter(pr => pr.points === pointFilter);
        }

        // Sort by mergedAt date in descending order (newest first)
        result.sort((a, b) => {
            const dateA = a.mergedAt ? new Date(a.mergedAt) : new Date(0);
            const dateB = b.mergedAt ? new Date(b.mergedAt) : new Date(0);

            // Debug logs
            console.log('Comparing dates:', {
                a: { mergedAt: a.mergedAt, title: a.title, date: dateA },
                b: { mergedAt: b.mergedAt, title: b.title, date: dateB },
                comparison: dateB - dateA
            });

            return dateB - dateA; // For descending order
        });

        // Log the final sorted result
        console.log('Sorted PRs:', result.map(pr => ({
            title: pr.title,
            mergedAt: pr.mergedAt,
            date: pr.mergedAt ? new Date(pr.mergedAt) : null
        })));

        return result;
    }, [prs, activeFilter, pointFilter]);

    const clearFilters = () => {
        setActiveFilter(null);
        setPointFilter(null);
        setIsFilterOpen(false);
    };

    const activeFilterCount = (activeFilter ? 1 : 0) + (pointFilter !== null ? 1 : 0);

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
                            <button onClick={() => setActiveFilter(null)} className="ml-1 font-bold hover:text-emerald-900 dark:hover:text-violet-200">&times;</button>
                        </span>
                    </div>
                )}
            </div>

            {/* Combined Filter Dropdown */}
            <div className="relative mb-6" ref={filterRef}>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-violet-900/30 dark:text-violet-300">
                                {activeFilterCount}
                            </span>
                        )}
                        <svg className={`w-4 h-4 ml-1 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Active Filters */}
                    <div className="flex-1 flex items-center gap-2 flex-wrap">
                        {activeFilter && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-violet-900/30 text-emerald-800 dark:text-violet-300">
                                {activeFilter}
                                <button onClick={() => setActiveFilter(null)} className="ml-1 font-bold hover:text-emerald-900 dark:hover:text-violet-200">&times;</button>
                            </span>
                        )}
                        {pointFilter !== null && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                {pointFilter === 0 ? 'No Points' : `${pointFilter} Points`}
                                <button onClick={() => setPointFilter(null)} className="ml-1 font-bold hover:text-blue-900 dark:hover:text-blue-200">&times;</button>
                            </span>
                        )}
                        {(activeFilter || pointFilter !== null) && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 flex items-center gap-1"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                </div>

                {/* Dropdown Menu */}
                {isFilterOpen && (
                    <div className="absolute z-10 mt-2 w-72 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-slate-200 dark:border-neutral-700">
                        <div className="p-3 space-y-4">
                            {/* Status Filter Section */}
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-2">Status</h4>
                                <div className="space-y-1">
                                    {Object.entries(labelStats || {}).map(([label, count]) => (
                                        <button
                                            key={`status-${label}`}
                                            onClick={() => {
                                                setActiveFilter(activeFilter === label ? null : label);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between ${activeFilter === label
                                                    ? 'bg-emerald-50 dark:bg-violet-900/20 text-emerald-800 dark:text-violet-300'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-700/50'
                                                }`}
                                        >
                                            <span>{label}</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">{count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Points Filter Section */}
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-2">Points</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {[0, 3, 7, 10].map((points) => {
                                        const count = prs.filter(pr => pr.points === points).length;
                                        return (
                                            <button
                                                key={`points-${points}`}
                                                onClick={() => {
                                                    setPointFilter(pointFilter === points ? null : points);
                                                }}
                                                className={`px-3 py-2 text-sm rounded-md flex items-center justify-between ${pointFilter === points
                                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-700/50'
                                                    }`}
                                            >
                                                <span>{points === 0 ? 'No Points' : `${points} Points`}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">{count}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-neutral-700 px-4 py-3 bg-slate-50 dark:bg-neutral-800/50 rounded-b-lg">
                            <button
                                onClick={clearFilters}
                                className="w-full text-sm font-medium text-emerald-600 dark:text-violet-400 hover:text-emerald-700 dark:hover:text-violet-300 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reset all filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

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
                                <div>Created: {new Date(pr.createdAt).toISOString().split('T')[0]}</div>
                                <div>Merged: {pr.mergedAt ? new Date(pr.mergedAt).toISOString().split('T')[0] : "-"}</div>
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
