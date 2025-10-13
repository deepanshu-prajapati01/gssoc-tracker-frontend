import { Trophy, ExternalLink, CheckCircle2, XCircle } from 'lucide-react'

const UserProfileCard = ({ userData }) => {
    return (
        <div className="flex-1 border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-6 bg-white dark:bg-neutral-800/50 shadow-sm hover:shadow transition-shadow duration-200">
            <div className="flex flex-col items-center text-center space-y-4">
                {/* Avatar with Rank Badge */}
                <div className="relative">
                    <img
                        src={userData.avatarUrl}
                        alt={userData.fullName}
                        className="size-24 rounded-full border-4 border-emerald-100 dark:border-violet-900/50 object-cover"
                    />

                </div>

                {/* User Info */}
                <div className="w-full">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {userData.fullName}
                    </h2>
                    <a
                        href={userData.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-emerald-600 dark:text-violet-400 hover:underline text-sm mt-1"
                    >
                        @{userData.username}
                        <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </a>
                </div>

                {/* Stats */}
                <div className="w-full grid grid-cols-2 gap-3 mt-2">
                    <div className="bg-slate-50 dark:bg-neutral-800 p-3 rounded-lg">
                        <p className="text-slate-500 dark:text-neutral-400 text-xs font-medium">Total Points</p>
                        <p className="text-xl font-bold text-emerald-600 dark:text-violet-400">
                            {userData.totalPoints}
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-neutral-800 p-3 rounded-lg">
                        <p className="text-slate-500 dark:text-neutral-400 text-xs font-medium">PRs Merged</p>
                        <p className="text-xl font-bold text-emerald-600 dark:text-violet-400">
                            {userData.totalPRs}
                        </p>
                    </div>
                </div>

                {/* Rank Badge */}
                <div className="w-full bg-emerald-50 dark:bg-violet-900 rounded-lg p-3 flex flex-col items-center">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Rank #{userData.rank}
                        </span>
                    </div>
                    <span className="text-xs font-medium text-emerald-700 dark:text-violet-300 mt-1">
                        Top {Math.max(1, ((userData.rank / 3000) * 100).toFixed(1))}% of contributors
                    </span>
                </div>

                {/* Postman Status */}
                {userData.postmanCompletion ? (
                    <div className="w-full py-2 px-3 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-neutral-800">
                        <div className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mr-2" />
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Successfully completed Postman Challenge</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-full py-2 px-3 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-neutral-800">
                        <div className="flex items-center">
                            <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 mr-2" />
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Not completed Postman Challenge</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserProfileCard
