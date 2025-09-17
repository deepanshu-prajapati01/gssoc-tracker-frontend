import LeaderboardTable from "./components/LeaderboardTable"
const LeaderboardPage = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Leaderboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Track the top contributors and their achievements</p>
            </div>
            <LeaderboardTable />
        </div>
    )
}

export default LeaderboardPage
