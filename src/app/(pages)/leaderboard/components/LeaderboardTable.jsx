'use client'
import React, { useEffect, useState } from 'react'
import { useLeaderboardStore } from '@/store/leaderboard.store'

const LeaderboardTable = () => {
    const {
        leaderboard,
        leaderboardLastUpdated,
        totalParticipants,
        pagination,
        currentPage,
        search,
        setSearch,
        setCurrentPage,
        fetchLeaderboard,
        isLoading,
        error,
    } = useLeaderboardStore()

    const [searchInput, setSearchInput] = useState("")

    // Fetch leaderboard whenever currentPage or search changes
    useEffect(() => {
        fetchLeaderboard()
    }, [currentPage, search])

    // Debounce search input → updates store after 500ms pause
    useEffect(() => {
        const handler = setTimeout(() => {
            // ✅ Only update if value changed
            if (searchInput !== search) {
                setSearch(searchInput)
                setCurrentPage(1) // reset to page 1 for new search
            }
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchInput, search])

    return (
        <section className="w-full max-w-5xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>

            {/* Search bar */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                        // setCurrentPage(1)
                    }}
                    placeholder="Search by name or username..."
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500 outline-none"
                />
            </div>

            {/* Status messages */}
            {isLoading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Leaderboard Table */}
            {leaderboard.length > 0 && (
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
                            {leaderboard.map((participant) => (
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

            {/* Empty state */}
            {!isLoading && leaderboard.length === 0 && (
                <p className="text-gray-500 mt-4">No participants found.</p>
            )}

            {/* Pagination controls (only if not searching) */}
            {!search && (
                <div className="mt-4 flex gap-4">
                    <button
                        disabled={!pagination.hasPreviousPage}
                        className={`bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-violet-600 dark:hover:bg-violet-700 transition-colors px-6 py-2 text-base rounded ${pagination.hasPreviousPage ? '' : 'opacity-50 cursor-not-allowed'
                            }`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>

                    <button
                        disabled={!pagination.hasNextPage}
                        className={`bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-violet-600 dark:hover:bg-violet-700 transition-colors px-6 py-2 text-base rounded ${pagination.hasNextPage ? '' : 'opacity-50 cursor-not-allowed'
                            }`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Extra info */}
            <div className="mt-4 text-sm text-gray-500">
                <p>Total Participants: {totalParticipants ?? '-'}</p>
                <p>Last Updated: {leaderboardLastUpdated ?? '-'}</p>
                {!search && (
                    <p>
                        Page {currentPage} of {pagination.totalPages ?? '-'}
                    </p>
                )}
            </div>
        </section>
    )
}

export default LeaderboardTable
