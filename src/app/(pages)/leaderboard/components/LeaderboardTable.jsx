'use client'
import React, { useEffect, useState } from 'react'
import { useLeaderboardStore } from '@/store/leaderboard.store'
import LeaderboardPagination from './LeaderboardPagination'
import LeaderboardRow from './LeaderboardRow'

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
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Leaderboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Track the top contributors and their achievements</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search by name or username..."
                                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            <svg
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
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
                    {/* Add filter buttons here if needed */}
                </div>
            </div>

            {/* Status */}
            {isLoading && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
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
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">PRs</th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Points</th>
                                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Badges</th>
                                <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {paginatedData.map((participant, index) => (
                                <LeaderboardRow key={participant.username} participant={participant} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && paginatedData.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
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
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No participants found</h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        {search ? 'Try adjusting your search or filter to find what you\'re looking for.' : 'There are currently no participants to display.'}
                    </p>
                </div>
            )}

            {/* Pagination */}
            {!search && paginatedData.length > 0 && (
                <div className="mt-6">
                    <LeaderboardPagination itemsPerPage={itemsPerPage} />
                </div>
            )}
        </section>
    )
}

export default LeaderboardTable
