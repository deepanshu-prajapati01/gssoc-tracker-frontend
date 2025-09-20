import React from 'react'

const UserProfileCard = ({ userData }) => {
    return (
        <div className="flex flex-col items-center space-y-4 border border-gray-200 dark:border-neutral-700 p-4 rounded-lg">
            {/* Avatar */}
            <div className="relative">
                <img
                    src={userData.avatarUrl}
                    alt={userData.fullName}
                    className="w-24 h-24 rounded-full border-4 border-emerald-100 dark:border-violet-900/50"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 dark:bg-violet-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {userData.rank}
                </div>
            </div>

            {/* User Info */}
            <div className="text-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{userData.fullName}</h2>
                <a
                    href={userData.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-violet-400 hover:underline text-sm"
                >
                    @{userData.username}
                </a>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-slate-200 dark:border-neutral-700 my-2"></div>

            {/* Stats */}
            <div className="w-full grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-50 dark:bg-neutral-800/70 p-3 rounded-lg">
                    <p className="text-slate-500 dark:text-neutral-400 text-sm">Total Points</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-violet-400">
                        {userData.totalPoints}
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-neutral-800/70 p-3 rounded-lg">
                    <p className="text-slate-500 dark:text-neutral-400 text-sm">PRs Merged</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-violet-400">
                        {userData.totalPRs}
                    </p>
                </div>
            </div>

            {/* Rank Badge */}
            <div className="w-full bg-emerald-50 dark:bg-violet-900/20 rounded-lg px-4 py-2 flex items-center justify-center space-x-3 shadow-sm">
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Rank</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">#{userData.rank}</span>
                <span className="text-slate-400 dark:text-neutral-500">•</span>
                <span className="text-sm font-semibold text-emerald-700 dark:text-violet-300">
                    Top {Math.max(1, ((userData.rank / 5000) * 100).toFixed(1))}%
                </span>
            </div>

        </div>
    )
}

export default UserProfileCard
