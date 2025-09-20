const RankProgress = ({ progressToMake }) => {
    const nextTarget = progressToMake.nextTarget;
    const ultimateTarget = progressToMake.ultimateTarget;

    // Progress % calculations
    const nextProgressPercent = nextTarget
        ? (progressToMake.currentPoints / nextTarget.targetPoints) * 100
        : 100;

    const ultimateProgressPercent =
        (progressToMake.currentPoints / ultimateTarget.targetPoints) * 100;

    return (
        <div className="flex-1 w-full border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-6">
            {/* Header */}
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Rank Progress
            </h3>

            {/* Next Rank Progress */}
            <div>
                {nextTarget ? (
                    <>
                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-1">
                            <span>To Rank #{nextTarget.targetRank}</span>
                            <span>
                                {progressToMake.currentPoints}/{nextTarget.targetPoints} pts
                            </span>
                        </div>

                        {/* Progress Bar with % */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="h-2.5 transition-all duration-500 rounded-full bg-emerald-500 dark:bg-violet-500"
                                    style={{
                                        width: `${Math.min(nextProgressPercent, 100)}%`,
                                    }}
                                />
                            </div>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-10 text-right">
                                {Math.min(nextProgressPercent, 100).toFixed(1)}%
                            </span>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {nextTarget.pointsNeeded} more points to rank up
                        </p>
                    </>
                ) : (
                    <div className="text-center space-y-1">
                        <p className="text-base font-bold text-emerald-600 dark:text-violet-400 flex items-center justify-center gap-1">
                            🏆 You are already Rank #1
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            You’ve reached the top spot with the maximum points.
                        </p>
                    </div>
                )}
            </div>

            {/* Ultimate Target */}
            <div className="pt-4 border-t border-slate-200 dark:border-neutral-700 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Ultimate Target
                    </span>
                    <span className="px-2 py-1 bg-emerald-100 dark:bg-violet-900/30 text-emerald-700 dark:text-violet-300 text-xs font-medium rounded">
                        Rank #{ultimateTarget.targetRank}
                    </span>
                </div>

                {/* Ultimate Progress Bar with % */}
                <div>
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-1">
                        <span>Progress</span>
                        <span>
                            {progressToMake.currentPoints}/{ultimateTarget.targetPoints} pts
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="h-2.5 transition-all duration-500 rounded-full bg-emerald-600 dark:bg-violet-500"
                                style={{
                                    width: `${Math.min(ultimateProgressPercent, 100)}%`,
                                }}
                            />
                        </div>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-10 text-right">
                            {Math.min(ultimateProgressPercent, 100).toFixed(1)}%
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Total Points Needed
                        </p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                            {ultimateTarget.targetPoints}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Remaining
                        </p>
                        <p className="text-lg font-bold text-emerald-600 dark:text-violet-400">
                            {ultimateTarget.pointsNeeded}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RankProgress;
