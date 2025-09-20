'use client';
import { useEffect } from "react";
import { X } from "lucide-react";
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
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col">
            {/* Dialog Container */}
            <div className="relative h-screen w-screen overflow-hidden">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-slate-900/95 to-slate-900/0 backdrop-blur-sm border-b border-slate-800/50">
                    <div className="max-w-[95vw] mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-emerald-500/50">
                                    <img
                                        src={dashboardData[selectedUserForDashboard].avatarUrl}
                                        alt={dashboardData[selectedUserForDashboard].fullName}
                                        className="object-cover h-full w-full"
                                    />
                                </div>

                                {/* Name & Info */}
                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        {dashboardData[selectedUserForDashboard]?.fullName.split(" ")[0].toUpperCase()}'s Dashboard
                                    </h2>
                                    {dashboardData[selectedUserForDashboard]?.rank && (
                                        <p className="text-sm text-slate-400">
                                            Rank #{dashboardData[selectedUserForDashboard]?.rank} •{" "}
                                            {dashboardData[selectedUserForDashboard]?.totalPoints} points
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedUserForDashboard(null)}
                                className="h-10 w-10 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
                            >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="h-full w-full pt-20 pb-6 overflow-auto">
                    <div className="w-full">
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl p-6">
                            {isLoading ? (
                                <DashboardSkeleton />
                            ) : error ? (
                                <div className="flex items-center justify-center h-64">
                                    <p className="text-red-500 dark:text-red-400">{error}</p>
                                </div>
                            ) : dashboardData[selectedUserForDashboard] ? (
                                <Dashboard dataToDisplay={dashboardData[selectedUserForDashboard]} />
                            ) : (
                                <div className="flex items-center justify-center h-64 text-slate-500 dark:text-neutral-400">
                                    No data available
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