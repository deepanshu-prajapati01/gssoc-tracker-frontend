import React from 'react';
import badgesData from '@/lib/badges.json';
import { Eye, UserCheck, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { TableRow, TableCell } from '@/components/ui/table';
import { useLeaderboardStore } from '@/store/leaderboard.store';
import { useDashboardStore } from '@/store/dashboard.store';

const LeaderboardRow = ({ participant }) => {
    const { setSelectedUserForDashboard } = useLeaderboardStore() // For choosing the user
    const { username, setUsername, resetUsername } = useDashboardStore()

    const earnedBadge = React.useMemo(() => {
        // Find the highest badge where participant's points meet or exceed the required points
        const eligibleBadges = badgesData.filter(badge => participant.totalPoints >= badge.pointsRequired);

        // If no eligible badges, return null
        if (eligibleBadges.length === 0) return null;

        // Return the badge with highest points requirement from eligible badges
        return eligibleBadges.reduce((highest, current) =>
            (current.pointsRequired > highest.pointsRequired) ? current : highest
        );
    }, [participant.totalPoints]);

    return (
        <TableRow
            key={participant.username}
            className={`group relative hover:bg-slate-50/50 dark:hover:bg-neutral-800/50 transition-colors duration-200 ${username === participant.username ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}
        >
            <TableCell className="py-4 px-6 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <span
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold relative group/rank
                            ${participant.rank === 1
                                ? 'bg-yellow-400 text-white'
                                : participant.rank === 2
                                    ? 'bg-gray-400 text-white'
                                    : participant.rank === 3
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                    >
                        {participant.rank}
                        {username !== participant.username && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setUsername(participant.username);
                                    toast.success('Profile Selected', {
                                        description: `${participant.fullName}'s data is now visible on your dashboard.`,
                                        duration: 3000,
                                    });
                                }}
                                className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover/rank:opacity-100 bg-black/30 rounded-lg transition-opacity duration-200"
                                title="Mark as me"
                            >
                                <UserPlus className="w-5 h-5 text-white" />
                            </button>
                        )}
                    </span>
                    {username === participant.username && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                resetUsername();
                                toast.info('Profile Removed', {
                                    description: 'This profile will no longer appear on your dashboard.',
                                    duration: 3000,
                                });
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors duration-200"
                            title="Unmark as me"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>
            </TableCell>

            <TableCell className="py-4 px-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0 size-12 rounded-full overflow-hidden border-2 border-white dark:border-neutral-900 shadow-sm group-hover:border-emerald-100 dark:group-hover:border-violet-500/20 transition-colors duration-200">
                        <img
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            src={participant.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.fullName || '')}&background=random`}
                            alt={participant.fullName}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.fullName || '')}&background=random`;
                            }}
                        />
                    </div>
                    <div className="ml-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                {participant.fullName}
                            </span>
                            {username === participant.username && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                                    You
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                @{participant.username}
                            </span>
                        </div>
                    </div>
                </div>
            </TableCell>
            <TableCell className="py-4 px-6 whitespace-nowrap">
                <div className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {participant.totalPRs}
                </div>
            </TableCell>
            <TableCell className="py-4 px-6 whitespace-nowrap">
                <div className="flex items-center">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {participant.totalPoints}
                    </span>
                </div>
            </TableCell>
            <TableCell className="py-4 px-6">
                {earnedBadge ? (
                    <div className="flex items-center">
                        <div className="flex-shrink-0 size-12 rounded-full overflow-hidden border border-slate-200 dark:border-neutral-700 shadow-sm">
                            <img
                                className="h-full w-full object-cover"
                                src={earnedBadge.badgeImage}
                                alt={earnedBadge.badgeName}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/placeholder-badge.png'; // Fallback image
                                }}
                            />
                        </div>
                        <div className="ml-3">
                            <div className="text-sm font-medium text-slate-900 dark:text-white">
                                {earnedBadge.badgeName}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                {earnedBadge.pointsRequired} pts
                            </div>
                        </div>
                    </div>
                ) : (
                    <span className="text-sm text-slate-500 dark:text-slate-400">No badges earned</span>
                )}
            </TableCell>
            <TableCell className="py-4 px-6 text-right">
                <button
                    onClick={() => {
                        setSelectedUserForDashboard(participant.username);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/20 dark:focus:ring-violet-500 transition-colors duration-200"
                    title="View dashboard"
                >
                    <Eye className="w-4 h-4" />
                    <span>View Dashboard</span>
                </button>
            </TableCell>
        </TableRow >
    );
};

export default LeaderboardRow;
