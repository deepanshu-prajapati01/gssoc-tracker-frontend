'use client'
import LeaderboardTable from "./components/LeaderboardTable"

const LeaderboardPage = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Contribution Leaderboard</h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                    Track the top contributors and their achievements in GSSoC 2025
                </p>
            </div>
            <LeaderboardTable />
        </div >
    )
}

export default LeaderboardPage
