
const StreaksSection = ({streaks}) => {
    return (
        <div className="flex-1 border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-4 bg-white dark:bg-neutral-800/50 shadow-sm hover:shadow transition-shadow duration-200">

            {/* Current Streak (Hero Section with Flames) */}
            <div className="relative bg-emerald-50 dark:bg-violet-900/30 p-5 rounded-lg flex flex-col items-center text-center overflow-hidden">
                {/* Flame Glow Effect */}
                <div className="absolute -top-6 -left-6 text-5xl opacity-30 animate-pulse select-none">🔥</div>
                <div className="absolute -top-6 -right-6 text-5xl opacity-30 animate-pulse delay-200 select-none">🔥</div>
                <div className="absolute -bottom-6 -left-4 text-5xl opacity-20 animate-pulse delay-500 select-none">🔥</div>
                <div className="absolute -bottom-6 -right-4 text-5xl opacity-20 animate-pulse delay-700 select-none">🔥</div>

                {/* Main Streak Info */}
                <p className="text-sm text-slate-600 dark:text-slate-300">Current Streak</p>
                <p className="text-4xl font-extrabold text-emerald-600 dark:text-violet-400 drop-shadow-sm flex items-center">
                    🔥 {streaks.current.count} {streaks.current.count === 1 ? "day" : "days"}
                </p>
                {streaks.current.count > 0 ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {streaks.current.startDate} → {streaks.current.endDate}
                    </p>
                ) : (
                    <p className="text-xs italic text-slate-500 dark:text-slate-400 mt-1">
                        No active streak
                    </p>
                )}
            </div>

            {/* Best Streak */}
            <div className="bg-slate-50 dark:bg-neutral-800 p-3 rounded-lg flex justify-between items-center">
                <div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Best Streak</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-violet-400">
                        {streaks.max.count} {streaks.max.count === 1 ? "day" : "days"}
                    </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    {streaks.max.startDate} → {streaks.max.endDate}
                </p>
            </div>

            {/* Contribution Range */}
            <div className="pt-2 border-t border-slate-200 dark:border-neutral-700">
                <p className="text-sm text-slate-600 dark:text-slate-300">Contribution Range</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {streaks.contributionRange.startDate} → {streaks.contributionRange.endDate}
                </p>
            </div>
        </div>
    )
}

export default StreaksSection
