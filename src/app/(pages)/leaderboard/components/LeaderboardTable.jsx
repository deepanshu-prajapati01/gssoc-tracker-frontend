'use client'
import React, { useEffect, useState } from 'react'
import { useLeaderboardStore } from '@/store/leaderboard.store'
import LeaderboardPagination from './LeaderboardPagination'
import LeaderboardRow from './LeaderboardRow'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const LeaderboardTable = () => {
    const {
        leaderboard,
        currentPage,
        search,
        setSearch,
        setCurrentPage,
        fetchLeaderboard,
        isLoading,
        error,
        pagination,
    } = useLeaderboardStore()

    const [itemsPerPage] = useState(30)
    const [searchInput, setSearchInput] = useState(search || "")

    // Fetch whenever search or page changes
    useEffect(() => {
        fetchLeaderboard()
    }, [search, currentPage])

    // Debounce search input → updates store after 500ms pause
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchInput !== search) {
                setSearch(searchInput)
                setCurrentPage(1)
            }
        }, 500)

        return () => clearTimeout(handler)
    }, [searchInput, search, setSearch, setCurrentPage])

    // Grab data for current page
    const paginatedData = leaderboard[currentPage] || []

    return (
        <>
            

            {/* Search and Filters */}
            <div className="mb-8 bg-white dark:bg-neutral-900 p-5 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search by name or username..."
                                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            <svg
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status */}
            {isLoading && (
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-800 p-8 text-center shadow-sm">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded w-1/2"></div>
                    </div>
                </div>
            )}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 border border-red-200 dark:border-red-900/30">
                    {error}
                </div>
            )}

            {/* Table */}
            {paginatedData.length > 0 && (
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-neutral-800">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="py-4 px-6 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rank</TableHead>
                                <TableHead className="py-4 px-6 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contributor</TableHead>
                                <TableHead className="py-4 px-6 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total PRs</TableHead>
                                <TableHead className="py-4 px-6 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Points</TableHead>
                                <TableHead className="py-4 px-6 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Badge Earned</TableHead>
                                <TableHead className="py-4 px-6 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((participant) => (
                                <LeaderboardRow key={participant.username} participant={participant} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && paginatedData.length === 0 && (
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-800 p-12 text-center shadow-sm">
                    <svg
                        className="mx-auto h-12 w-12 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">No participants found</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        {search ? 'Try adjusting your search to find what you\'re looking for.' : 'There are currently no participants to display.'}
                    </p>
                </div>
            )}

            {/* Pagination */}
            {!search && paginatedData.length > 0 && (
                <div className="mt-6">
                    <LeaderboardPagination itemsPerPage={itemsPerPage} />
                </div>
            )}
        </>
    )
}

export default LeaderboardTable
