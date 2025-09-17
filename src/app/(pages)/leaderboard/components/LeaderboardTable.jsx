'use client'
import React, { useEffect, useState } from 'react'
import { useLeaderboardStore } from '@/store/leaderboard.store'
import LeaderboardPagination from './LeaderboardPagination'

const LeaderboardTable = () => {
    const {
        leaderboard,
        leaderboardLastUpdated,
        totalParticipants,
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
                setCurrentPage(1) // reset to page 1 for new search
            }
        }, 500)

        return () => clearTimeout(handler)
    }, [searchInput, search, setSearch, setCurrentPage])

    // Grab data for current page
    const paginatedData = leaderboard[currentPage] || []

    return (
        <section className="w-full max-w-5xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>

            {/* Search bar */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search by name or username..."
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500 outline-none"
                />
            </div>

            {/* Status */}
            {isLoading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Table */}
            {paginatedData.length > 0 && (
                <div className="overflow-x-auto border rounded-lg shadow-sm">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="py-3 px-4 text-left">Rank</th>
                                <th className="py-3 px-4 text-left">User</th>
                                <th className="py-3 px-4 text-left">Pull Requests</th>
                                <th className="py-3 px-4 text-left">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((participant) => (
                                <tr
                                    key={participant.username}
                                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="py-3 px-4 font-semibold">{participant.rank}</td>
                                    <td className="py-3 px-4 flex items-center gap-3">
                                        <img
                                            src={participant.avatarUrl}
                                            alt={participant.fullName}
                                            className="w-10 h-10 rounded-full border"
                                        />
                                        <div>
                                            <a
                                                href={participant.profileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-emerald-600 dark:text-violet-400 hover:underline"
                                            >
                                                {participant.fullName}
                                            </a>
                                            <p className="text-sm text-gray-500">@{participant.username}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{participant.totalPRs}</td>
                                    <td className="py-3 px-4 font-bold">{participant.totalPoints}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Empty */}
            {!isLoading && paginatedData.length === 0 && (
                <p className="text-gray-500 mt-4">No participants found.</p>
            )}

            {/* API Pagination (only show if not searching) */}
            {!search && <LeaderboardPagination />}
        </section>
    )
}

export default LeaderboardTable
