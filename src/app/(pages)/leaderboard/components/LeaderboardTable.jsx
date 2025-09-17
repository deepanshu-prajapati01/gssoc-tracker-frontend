'use client'
import React, { useEffect } from 'react'
import { useLeaderboardStore } from '@/store/leaderboard.store'

const LeaderboardTable = () => {
    const {
        leaderboard,
        leaderboardLastUpdated,
        totalParticipants,
        pagination,
        currentPage,
        setCurrentPage,
        fetchLeaderboard,
        isLoading,
        error,
    } = useLeaderboardStore()

    // Fetch leaderboard whenever currentPage changes
    useEffect(() => {
        fetchLeaderboard()
    }, [currentPage])

    useEffect(() => {
        console.log('Leaderboard:', leaderboard)
        console.log('Pagination:', pagination)
        console.log('Current Page:', currentPage)
    }, [leaderboard, pagination, currentPage])

    return (
        <section>
            <h2 className="text-2xl font-bold">Leaderboard</h2>

            {/* Show status */}
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Participants */}
            <div>
                {leaderboard.length === 0 && !isLoading && <p>No participants found.</p>}
                {leaderboard.map((participant, index) => (
                    <div key={index}>
                        <p>{participant.rank}</p>
                        <p>{participant.fullName}</p>
                    </div>
                ))}
            </div>

            {/* Pagination buttons */}
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

            {/* Optional: extra info */}
            <div className="mt-2 text-sm text-gray-500">
                <p>Total Participants: {totalParticipants ?? '-'}</p>
                <p>Last Updated: {leaderboardLastUpdated ?? '-'}</p>
                <p>
                    Page {currentPage} of {pagination.totalPages ?? '-'}
                </p>
            </div>
        </section>
    )
}

export default LeaderboardTable
