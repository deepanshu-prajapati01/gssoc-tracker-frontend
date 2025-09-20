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
        <div className="fixed inset-0 z-50 bg-white dark:bg-neutral-900 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-neutral-800">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Progress made so far by <span className="text-emerald-600 dark:text-purple-500">{dashboardData[selectedUserForDashboard]?.fullName}</span>
                </h2>
                <button
                    onClick={() => setSelectedUserForDashboard(null)}
                    className="rounded-full h-10 w-10"
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1">
                <div className="p-6 max-w-7xl mx-auto w-full">
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
            </ScrollArea>
        </div>
    );
};

export default LeaderboardDashboard;