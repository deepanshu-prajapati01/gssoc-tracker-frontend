'use client'
import React from 'react'
import { useLeaderboardStore } from '@/store/leaderboard.store'

const LeaderboardPagination = () => {
    const { currentPage, setCurrentPage, pagination } = useLeaderboardStore()
    const { totalPages, hasNextPage, hasPreviousPage } = pagination

    if (!totalPages || totalPages <= 1) return null

    // Decide which pages to show (windowed pagination)
    const getVisiblePages = () => {
        const pages = []
        const maxVisible = 2 // number of pages around currentPage

        // Always show first page
        if (currentPage > 2) {
            pages.push(1)
            if (currentPage > 3) {
                pages.push('...')
            }
        }

        // Pages around current page
        for (
            let i = Math.max(1, currentPage - maxVisible);
            i <= Math.min(totalPages, currentPage + maxVisible);
            i++
        ) {
            pages.push(i)
        }

        // Always show last page
        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                pages.push('...')
            }
            pages.push(totalPages)
        }

        return pages
    }

    const visiblePages = getVisiblePages()

    return (
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            {/* Prev button */}
            <button
                disabled={!hasPreviousPage}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-4 py-2 rounded bg-emerald-600 text-white dark:bg-violet-600 ${!hasPreviousPage
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-emerald-700 dark:hover:bg-violet-700'
                    }`}
            >
                Prev
            </button>

            {/* Page numbers */}
            <div className="flex gap-2">
                {visiblePages.map((page, index) =>
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">
                            ...
                        </span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded ${currentPage === page
                                    ? 'bg-emerald-700 text-white dark:bg-violet-700'
                                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Next button */}
            <button
                disabled={!hasNextPage}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-4 py-2 rounded bg-emerald-600 text-white dark:bg-violet-600 ${!hasNextPage
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-emerald-700 dark:hover:bg-violet-700'
                    }`}
            >
                Next
            </button>
        </div>
    )
}

export default LeaderboardPagination
