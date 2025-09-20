import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PrTable = ({ prs, labelStats }) => {
    const [activeFilter, setActiveFilter] = useState(null);
    
    const filteredPrs = useMemo(() => {
        if (!activeFilter) {
            console.log('No active filter, showing all PRs:', prs);
            return prs;
        }
        
        const filtered = prs.filter(pr => {
            // Check if the PR's status matches the active filter (case-insensitive)
            return pr.status && pr.status.toLowerCase() === activeFilter.toLowerCase();
        });
        
        console.log('Filtered PRs by status:', {
            activeFilter,
            totalPRs: prs.length,
            filteredCount: filtered.length,
            sampleStatuses: prs.slice(0, 3).map(pr => pr.status)
        });
        
        return filtered;
    }, [prs, activeFilter]);
    
    const clearFilter = () => setActiveFilter(null);
    return (
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm">
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Pull Requests</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Track all your contributions and their status
                        </p>
                    </div>
                    {activeFilter && (
                        <div className="flex items-center">
                            <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">
                                Filtered by: 
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-violet-900/30 text-emerald-800 dark:text-violet-300">
                                {activeFilter}
                                <button 
                                    onClick={clearFilter}
                                    className="ml-2 text-emerald-600 dark:text-violet-400 hover:text-emerald-800 dark:hover:text-violet-200"
                                    aria-label="Clear filter"
                                >
                                    &times;
                                </button>
                            </span>
                        </div>
                    )}
                </div>
                
                {labelStats && Object.keys(labelStats).length > 0 && (
                    <div className="mt-4 mb-6">
                        <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Filter by label:</h4>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={clearFilter}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                    !activeFilter 
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-violet-900/30 dark:text-violet-300' 
                                        : 'bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
                                }`}
                            >
                                All ({prs.length})
                            </button>
                            {Object.entries(labelStats).map(([label, count]) => (
                                <button
                                    key={label}
                                    onClick={() => setActiveFilter(label)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                        activeFilter === label
                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-violet-900/30 dark:text-violet-300'
                                            : 'bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
                                    }`}
                                >
                                    {label} ({count})
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            <div className="overflow-x-auto">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow className="border-b border-slate-200 dark:border-neutral-800">
                            <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Title</TableHead>
                            <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Points</TableHead>
                            <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Status</TableHead>
                            <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Labels</TableHead>
                            <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Created</TableHead>
                            <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Merged</TableHead>
                            <TableHead className="text-right text-slate-600 dark:text-slate-400 font-medium">Link</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPrs.length > 0 ? (
                            filteredPrs.map((pr, index) => (
                                <TableRow 
                                    key={index} 
                                    className="border-b border-slate-100 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800/50 transition-colors"
                                >
                                    <TableCell className="py-3.5">
                                        <div className="font-medium text-slate-900 dark:text-white">
                                            {pr.title}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-900 dark:text-white">
                                        {pr.points}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                pr.status === "valid"
                                                    ? "bg-emerald-100 text-emerald-800 dark:bg-violet-900/30 dark:text-violet-300"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                            }`}
                                        >
                                            {pr.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {pr.labels.map((label, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300"
                                                >
                                                    {label}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                                        {new Date(pr.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                                        {pr.mergedAt ? new Date(pr.mergedAt).toLocaleDateString() : "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
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
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="py-8 text-center text-slate-500 dark:text-slate-400">
                                    No pull requests found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            
        </div>
    );
};

export default PrTable;
