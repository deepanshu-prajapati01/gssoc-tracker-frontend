'use client';
import { useEffect } from "react";
import { X, XCircle, RefreshCw, Info } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard.store";
import { useLeaderboardStore } from "@/store/leaderboard.store";
import DashboardSkeleton from "../../dashboard/components/DashboardSkeleton";
import Dashboard from "../../dashboard/components/Dashboard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const LeaderboardDashboard = () => {
    const {
        fetchDashboard,
        isLoading,
        error,
        dashboardData,
    } = useDashboardStore();

    const { setSelectedUserForDashboard, selectedUserForDashboard } = useLeaderboardStore();

    useEffect(() => {
        console.log(selectedUserForDashboard)
        if (selectedUserForDashboard) {
            fetchDashboard(selectedUserForDashboard);
        }
    }, [selectedUserForDashboard, fetchDashboard]);

    if (!selectedUserForDashboard) return null;

    return (
        <div className="fixed inset-0 z-50 bg-zinc-50/95 dark:bg-neutral-900/95 backdrop-blur-sm flex flex-col">
            {/* Dialog Container */}
            <div className="relative h-screen w-screen overflow-hidden">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-neutral-800">
                    <div className="max-w-[95vw] mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-emerald-500/80 dark:border-violet-500">
                                    <img
                                        src={dashboardData[selectedUserForDashboard]?.avatarUrl || 'https://i.pinimg.com/736x/27/5f/99/275f99923b080b18e7b474ed6155a17f.jpg'}
                                        alt={dashboardData[selectedUserForDashboard]?.fullName || selectedUserForDashboard}
                                        className="object-cover h-full w-full"
                                    />
                                </div>

                                {/* Name & Info */}
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {dashboardData[selectedUserForDashboard]?.fullName.split(" ")[0].toUpperCase()}'s Dashboard
                                    </h2>
                                    {dashboardData[selectedUserForDashboard]?.rank && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-violet-700/30 dark:text-violet-300 rounded-full">
                                                Rank #{dashboardData[selectedUserForDashboard]?.rank}
                                            </span>
                                            <span className="text-sm text-slate-600 dark:text-neutral-400">
                                                {dashboardData[selectedUserForDashboard]?.totalPoints} points
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedUserForDashboard(null)}
                                className="h-10 w-10 rounded-full bg-white/80 hover:bg-slate-100 text-slate-600 hover:text-slate-900 dark:bg-neutral-800/80 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:hover:text-white flex items-center justify-center border border-slate-200 hover:border-emerald-500 dark:border-neutral-700 dark:hover:border-violet-500"
                                aria-label="Close dashboard"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="h-full w-full pt-24 pb-8 overflow-auto px-4">
                    <div className="w-full">
                        <div className="bg-white/80 dark:bg-neutral-900/95 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-xl duration-300">
                            {isLoading ? (
                                <DashboardSkeleton />
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
                                    <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
                                        <XCircle className="h-6 w-6 text-rose-500 dark:text-rose-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                                        Error Loading Dashboard
                                    </h3>
                                    <p className="text-slate-600 dark:text-neutral-400 mb-4 max-w-md">
                                        We couldn't load the dashboard data. Please check your connection and try again.
                                    </p>
                                    <Button
                                        onClick={() => fetchDashboard(selectedUserForDashboard)}
                                        variant="outline"
                                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-violet-500/30 dark:text-violet-300 dark:hover:bg-violet-900/30"
                                    >
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Retry
                                    </Button>
                                </div>
                            ) : dashboardData[selectedUserForDashboard] ? (
                                <Dashboard dataToDisplay={dashboardData[selectedUserForDashboard]} />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
                                    <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                                        <Info className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                                        No Data Available
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        There's no data to display for this user at the moment.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LeaderboardDashboard;