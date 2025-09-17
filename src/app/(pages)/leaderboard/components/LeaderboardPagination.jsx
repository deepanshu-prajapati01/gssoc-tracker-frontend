'use client'

import React from 'react'
import { useLeaderboardStore } from '@/store/leaderboard.store'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const LeaderboardPagination = () => {
    const {
        currentPage,
        setCurrentPage,
        pagination,
        totalParticipants,
    } = useLeaderboardStore()

    const itemsPerPage = 30;
    const { totalPages } = pagination

    if (!totalPages || totalPages <= 1) return null

    const startItem = totalParticipants > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0
    const endItem = Math.min(currentPage * itemsPerPage, totalParticipants)

    return (
        <div className="bg-white dark:bg-zinc-800 px-4 py-3 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                {/* Left side: Showing info */}
                <div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        Showing <span className="font-medium">{startItem}</span> to{' '}
                        <span className="font-medium">{endItem}</span> of{' '}
                        <span className="font-medium">{totalParticipants}</span> participants
                    </p>
                </div>

                {/* Right side: Controls */}
                <div>
                    <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                    >
                        {/* First */}
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${currentPage === 1
                                ? 'bg-zinc-100 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                                : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                                }`}
                        >
                            <span className="sr-only">First</span>
                            <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 border ${currentPage === 1
                                ? 'bg-zinc-100 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                                : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                                }`}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {/* Current page info */}
                        <span className="relative inline-flex items-center px-4 py-2 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Page {currentPage} of {totalPages}
                        </span>

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 border ${currentPage === totalPages
                                ? 'bg-zinc-100 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                                : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                                }`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {/* Last */}
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${currentPage === totalPages
                                ? 'bg-zinc-100 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                                : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                                }`}
                        >
                            <span className="sr-only">Last</span>
                            <ChevronsRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardPagination
