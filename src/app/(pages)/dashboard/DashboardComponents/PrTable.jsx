import React, { useMemo, useState } from "react";
import { AlertCircle, AlertTriangle, ArrowUpRight, Info } from 'lucide-react';

// Status Configuration
const getStatusConfig = (status) => ({
    missing_labels: {
        bg: 'bg-red-50 dark:bg-red-900/20  border-red-400 dark:border-red-500',
        text: 'text-red-700 dark:text-red-100',
        icon: (
            <Info className="w-4 h-4 text-red-600 dark:text-red-400" />
        ),
        title: 'Missing Labels',
        message: 'This PR is missing required labels.'
    },
    missing_gssoc_and_level_labels: {
        bg: 'bg-amber-50 dark:bg-amber-900/20  border-amber-400 dark:border-amber-500',
        text: 'text-amber-700 dark:text-amber-100',
        icon: (
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        ),
        title: 'Missing GSSOC & Level Labels',
        message: 'Please add GSSOC and level labels.'
    },
    missing_or_invalid_level: {
        bg: 'bg-pink-50 dark:bg-pink-900/20  border-pink-400 dark:border-pink-500',
        text: 'text-pink-700 dark:text-pink-100',
        icon: (
            <Info className="w-4 h-4 text-pink-600 dark:text-pink-400" />
        ),
        title: 'Invalid Level',
        message: 'Missing or invalid level label.'
    },
    missing_gssoc_label: {
        bg: 'bg-blue-50 dark:bg-blue-900/20  border-blue-400 dark:border-blue-500',
        text: 'text-blue-700 dark:text-blue-100',
        icon: (
            <AlertTriangle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        ),
        title: 'Missing GSSOC Label',
        message: 'Please add the GSSOC label.'
    },
    valid: {
        bg: 'bg-white dark:bg-neutral-800/50  border-emerald-400 dark:border-violet-500',
        text: 'text-gray-900 dark:text-gray-100',
        icon: null,
        title: '',
        message: ''
    }
}[status] || {
    bg: 'bg-gray-50 dark:bg-neutral-800/50  border-gray-300 dark:border-neutral-700',
    text: 'text-gray-800 dark:text-gray-200',
    icon: null,
    title: '',
    message: ''
});

// PR Title Component
const PrTitle = ({ title, prLink }) => {
    // Extract PR number from the PR link if available
    const prNumber = prLink ? `#${prLink.split('/').pop()}` : '';

    return (
        <div className="mb-3 group">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-violet-500 flex-shrink-0"></div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {prNumber} • Pull Request
                </span>
            </div>
            <h3 className="text-[15px] font-semibold leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-violet-400 transition-colors">
                <a
                    href={prLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-violet-500/50 rounded"
                    title="View PR on GitHub"
                >
                    <span className="text-gray-900 dark:text-gray-100">{title}</span>
                </a>
            </h3>
        </div>
    );
};

// PR Meta Info Component
const PrMeta = ({ points, isInvalid, statusConfig }) => (
    <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-800/50">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" />
            {points} Points
        </span>
        {isInvalid && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/80 text-gray-700 dark:bg-neutral-700/80 dark:text-gray-200 border border-gray-200 dark:border-neutral-600">
                {statusConfig.title}
            </span>
        )}
    </div>
);

// PR Labels Component
const PrLabels = ({ labels }) => (
    labels?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
            {labels.map((label, i) => (
                <span
                    key={i}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-white/50 dark:bg-neutral-700/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-600"
                >
                    {label}
                </span>
            ))}
        </div>
    )
);

// PR Dates Component
const PrDates = ({ createdAt, mergedAt }) => (
    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-neutral-700 mt-auto">
        <div className="space-y-0.5">
            <div className="flex items-center gap-1">
                <span className="opacity-70">Created:</span>
                <span className="font-medium">{new Date(createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="opacity-70">Merged:</span>
                <span className="font-medium">
                    {mergedAt ? new Date(mergedAt).toLocaleDateString() : 'Pending'}
                </span>
            </div>
        </div>
    </div>
);

const PrCard = ({ pr }) => {
    const statusConfig = getStatusConfig(pr.status);
    const isInvalid = pr.status !== 'valid';

    return (
        <div className={`rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-emerald-50/50 dark:hover:shadow-violet-900/20`}>
            <div className="p-4 space-y-4">
                <PrTitle title={pr.title} prLink={pr.prLink} isInvalid={isInvalid} />
                <PrMeta
                    points={pr.points || 0}
                    status={pr.status}
                    isInvalid={isInvalid}
                    statusConfig={statusConfig}
                />
                {pr.labels && <PrLabels labels={pr.labels} />}
                <PrDates
                    createdAt={pr.createdAt}
                    mergedAt={pr.mergedAt}
                />
            </div>
        </div>
    );
};

// Filter and search utilities
const filterPrs = (prs, { searchQuery, levelFilter }) => {
    return prs.filter(pr => {
        // Search by title
        const matchesSearch = searchQuery === '' ||
            pr.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by level
        let matchesLevel = true;
        if (levelFilter) {
            if (levelFilter === 'needsAttention') {
                matchesLevel = pr.points === 0;
            } else {
                const levelPoints = { level1: 3, level2: 7, level3: 10 };
                matchesLevel = pr.points === levelPoints[levelFilter];
            }
        }

        return matchesSearch && matchesLevel;
    });
};

// Main Component
const PrTable = ({ prs, prCounts }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState(null);

    const filteredPrs = useMemo(() => {
        const sorted = [...prs].sort((a, b) => {
            const dateA = a.mergedAt ? new Date(a.mergedAt) : new Date(0);
            const dateB = b.mergedAt ? new Date(b.mergedAt) : new Date(0);
            return dateB - dateA;
        });

        return filterPrs(sorted, { searchQuery, levelFilter, showOnlyInvalid: false });
    }, [prs, searchQuery, levelFilter]);

    return (
        <div className="flex-1 border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-6 bg-white dark:bg-neutral-800/50 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Pull Requests</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Track all your contributions and their status
                </p>
            </div>

            <div className="space-y-4">
                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md leading-5 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500 focus:border-transparent sm:text-sm"
                            placeholder="Search PRs by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Level Filters */}
                    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                        {[
                            {
                                id: 'needsAttention',
                                label: 'Needs Attention',
                                sublabel: '0 pts',
                                color: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800',
                                count: prCounts?.needsAttention || 0
                            },
                            {
                                id: 'level1',
                                label: 'Level 1',
                                sublabel: '3 pts',
                                color: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800',
                                count: prCounts?.level1 || 0
                            },
                            {
                                id: 'level2',
                                label: 'Level 2',
                                sublabel: '7 pts',
                                color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
                                count: prCounts?.level2 || 0
                            },
                            {
                                id: 'level3',
                                label: 'Level 3',
                                sublabel: '10 pts',
                                color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800',
                                count: prCounts?.level3 || 0
                            },
                        ].map((level) => (
                            <button
                                key={level.id}
                                onClick={() => setLevelFilter(levelFilter === level.id ? null : level.id)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap border flex items-center gap-1.5 ${levelFilter === level.id
                                    ? `${level.color} border`
                                    : 'bg-gray-100 dark:bg-neutral-700/50 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-600/50 border-gray-200 dark:border-neutral-600'
                                    }`}
                            >
                                <span>{level.label} ({level.count})</span>

                            </button>
                        ))}

                        {/* Clear Filters */}
                        {(searchQuery || levelFilter) && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setLevelFilter(null);
                                }}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredPrs.length} {filteredPrs.length === 1 ? 'PR' : 'PRs'} found
                    {(searchQuery || levelFilter) && (
                        <span>
                            {' '}matching your {[searchQuery && 'search', levelFilter && 'level filter'].filter(Boolean).join(' and ')}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPrs.length > 0 ? (
                    filteredPrs.map((pr, idx) => <PrCard key={pr.id || idx} pr={pr} />)
                ) : (
                    <div className="col-span-full py-8 text-center text-slate-500 dark:text-slate-400">
                        {prs.length === 0 ? 'No pull requests available' : 'No pull requests match your filters'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrTable;
