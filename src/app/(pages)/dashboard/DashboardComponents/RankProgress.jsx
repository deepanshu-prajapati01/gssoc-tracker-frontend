import { Trophy, Target, Award } from 'lucide-react';

const RankProgress = ({ progressToMake }) => {
    const nextTarget = progressToMake.nextTarget;
    const ultimateTarget = progressToMake.ultimateTarget;

    // Progress % calculations
    const nextProgressPercent = nextTarget
        ? (progressToMake.currentPoints / nextTarget.targetPoints) * 100
        : 100;

    const ultimateProgressPercent = Math.min(
        (progressToMake.currentPoints / ultimateTarget.targetPoints) * 100,
        100
    );

    return (
        <div className="flex-1 border border-gray-200 dark:border-neutral-700 p-4 rounded-lg bg-white dark:bg-neutral-800/50 shadow-sm hover:shadow transition-shadow duration-200 h-full space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 dark:bg-violet-900/30 rounded-lg">
                    <Trophy className="h-5 w-5 text-emerald-600 dark:text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Rank Progress
                </h3>
            </div>

            {/* Next Rank Progress */}
            <div className="space-y-4">
                {nextTarget ? (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Next Rank #{nextTarget.targetRank}
                            </span>
                            <span className="text-sm font-medium text-emerald-600 dark:text-violet-400">
                                {progressToMake.currentPoints}/{nextTarget.targetPoints} pts
                            </span>
                        </div>

                        {/* Progress Bar with % */}
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 bg-slate-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="h-2 rounded-full bg-emerald-500 dark:bg-violet-500 "
                                        style={{
                                            width: `${Math.min(nextProgressPercent, 100)}%`,
                                        }}
                                    />
                                </div>
                                <span className="ml-3 text-sm font-medium text-slate-500 dark:text-slate-400 w-12 text-right">
                                    {Math.min(nextProgressPercent, 100).toFixed(1)}%
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {nextTarget.pointsNeeded} more points to rank up
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 bg-emerald-50 dark:bg-violet-900/20 rounded-lg text-center">
                        <div className="inline-flex items-center justify-center gap-2 text-emerald-700 dark:text-violet-300 font-medium">
                            <Award className="h-5 w-5" />
                            You are Rank #1!
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                            You've reached the top spot with the maximum points.
                        </p>
                    </div>
                )}

                {/* Ultimate Target */}
                <div className="pt-4 border-t border-slate-100 dark:border-neutral-800 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Ultimate Target
                            </span>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 dark:bg-violet-900/30 text-emerald-700 dark:text-violet-300 text-xs font-medium rounded-full">
                            Rank #{ultimateTarget.targetRank}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Progress</span>
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                {progressToMake.currentPoints}/{ultimateTarget.targetPoints} pts
                            </span>
                        </div>

                        <div className="flex items-center">
                            <div className="flex-1 bg-slate-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-violet-500 dark:to-violet-600 transition-all duration-500"
                                    style={{
                                        width: `${ultimateProgressPercent}%`,
                                    }}
                                />
                            </div>
                            <span className="ml-3 text-sm font-medium text-slate-500 dark:text-slate-400 w-12 text-right">
                                {ultimateProgressPercent.toFixed(1)}%
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                                Points needed
                            </p>
                            <p className="text-lg font-bold text-emerald-600 dark:text-violet-400">
                                {Math.max(0, ultimateTarget.targetPoints - progressToMake.currentPoints)}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                                Total target
                            </p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {ultimateTarget.targetPoints} pts
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RankProgress;
