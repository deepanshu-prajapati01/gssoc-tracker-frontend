import React, { useMemo } from "react";
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

// Status Header Component
const StatusHeader = ({ statusConfig }) => (
    <div className={`px-4 py-2 flex items-center gap-2 ${statusConfig.bg} ${statusConfig.text} rounded-t-lg`}>
        {statusConfig.icon}
        <div className="flex-1">
            <div className="text-sm font-medium">{statusConfig.title}</div>
            <div className="text-xs opacity-90">{statusConfig.message}</div>
        </div>
    </div>
);

// PR Title Component
const PrTitle = ({ title, prLink, isInvalid }) => (
    <h4 className="mb-2 group">
        <a
            href={prLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[15px] font-semibold leading-snug line-clamp-2 transition-colors ${isInvalid
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-900 dark:text-gray-100'
                } hover:text-emerald-600 dark:hover:text-violet-400 group-hover:underline`}
            title="View PR on GitHub"
        >
            {title}
        </a>
    </h4>
);

// PR Meta Info Component
const PrMeta = ({ points, status, isInvalid }) => (
    <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-800/50">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" />
            {points} Points
        </span>
        {isInvalid && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/80 text-gray-700 dark:bg-neutral-700/80 dark:text-gray-200 border border-gray-200 dark:border-neutral-600">
                {status.replace(/_/g, ' ')}
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
        <div className={`rounded-lg border border-gray-100 dark:border-neutral-700 overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-emerald-50 dark:hover:shadow-violet-900/20`}>
            {isInvalid && <StatusHeader statusConfig={statusConfig} />}
            <div className="p-4 space-y-4">
                <PrTitle title={pr.title} prLink={pr.prLink} isInvalid={isInvalid} />
                <PrMeta
                    points={pr.points || 0}
                    status={pr.status}
                    isInvalid={isInvalid}
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

// Main Component
const PrTable = ({ prs }) => {
    const sortedPrs = useMemo(() =>
        [...prs].sort((a, b) => {
            const dateA = a.mergedAt ? new Date(a.mergedAt) : new Date(0);
            const dateB = b.mergedAt ? new Date(b.mergedAt) : new Date(0);
            return dateB - dateA;
        }),
        [prs]
    );

    return (
        <div className="flex-1 border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-6 bg-white dark:bg-neutral-800/50 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Pull Requests</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Track all your contributions and their status
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedPrs.length > 0 ? (
                    sortedPrs.map((pr, idx) => <PrCard key={pr.id || idx} pr={pr} />)
                ) : (
                    <div className="col-span-full py-8 text-center text-slate-500 dark:text-slate-400">
                        No pull requests found
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrTable;
