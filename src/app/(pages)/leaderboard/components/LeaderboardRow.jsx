import React, { useState } from 'react'
import badgesData from '@/lib/badges.json'
import { Eye, ExternalLink } from 'lucide-react'
import { TableRow, TableCell } from '@/components/ui/table'


const LeaderboardRow = ({ participant }) => {
    const [isHovered, setIsHovered] = useState(false)

    const earnedBadge = React.useMemo(() => {
        return badgesData
            .filter(badge => participant.totalPoints >= badge.pointsRequired)
            .sort((a, b) => a.pointsRequired - b.pointsRequired)
            .pop()
    }, [participant.totalPoints])

    return (
        <TableRow
            key={participant.username}
            className={`border-b transition-all duration-300 ${isHovered ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <TableCell className="py-5 px-6">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${participant.rank <= 3 ? 'bg-yellow-400 text-white' : 'bg-gray-100 dark:bg-gray-800'} font-bold text-sm`}>
                    {participant.rank}
                </div>
            </TableCell>
            <TableCell className="py-4 px-6">
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <img
                            src={participant.avatarUrl}
                            alt={participant.fullName}
                            className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-sm transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute -inset-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                    </div>
                    <div className="min-w-0">
                        <a
                            href={participant.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-violet-400 transition-colors group"
                        >
                            {participant.fullName}
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">@{participant.username}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell className="py-4 px-6 text-center text-gray-700 dark:text-gray-300 font-medium">
                {participant.totalPRs}
            </TableCell>
            <TableCell className="py-4 px-6 text-center">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold text-sm border border-emerald-100 dark:border-emerald-800/50">
                    {participant.totalPoints}
                </span>
            </TableCell>
            <TableCell className="py-4 px-6">
                <div className="flex justify-center">
                    {earnedBadge ? (
                        <div className="group relative">
                            <img
                                src={earnedBadge.badgeImage}
                                alt={earnedBadge.badgeName}
                                className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-md transition-transform duration-300 hover:scale-110"
                            />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                <div className="font-semibold">{earnedBadge.badgeName}</div>
                            </div>
                        </div>
                    ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-500">—</span>
                    )}
                </div>
            </TableCell>
            <TableCell className="py-4 px-6 text-right">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                </button>
            </TableCell>
        </TableRow>
    )
}

export default LeaderboardRow
