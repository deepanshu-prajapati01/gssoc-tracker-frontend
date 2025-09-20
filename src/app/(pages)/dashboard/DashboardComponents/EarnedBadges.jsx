// import badges from '@/lib/badges.json'

// const EarnedBadges = ({ className, totalPoints }) => {
//     return (
//         <div className={` ${className} border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-4`}>
//             {/* Header */}
//             <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
//                 🏅 Earned Badges
//             </h3>

//             {/* Badges Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {badges
//                     .filter(badge => totalPoints >= badge.pointsRequired)
//                     .map((badge, index) => (
//                         <div
//                             key={index}
//                             className="flex flex-col items-center text-center p-3 rounded-lg bg-slate-50 dark:bg-neutral-800/70 hover:shadow-md transition"
//                         >
//                             <img
//                                 src={badge.badgeImage}
//                                 alt={badge.badgeName}
//                                 className="w-14 h-14 mb-2"
//                             />
//                             <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
//                                 {badge.badgeName}
//                             </p>
//                         </div>
//                     ))}
//             </div>

//             {/* Empty State */}
//             {badges.filter(badge => totalPoints >= badge.pointsRequired).length === 0 && (
//                 <p className="text-xs text-slate-500 dark:text-slate-400 italic">
//                     No badges earned yet
//                 </p>
//             )}
//         </div>
//     )
// }

// export default EarnedBadges


import badges from '@/lib/badges.json'
import { ScrollArea } from "@/components/ui/scroll-area"  // Make sure the import path matches your project

const EarnedBadges = ({ className, totalPoints }) => {
    const earnedBadges = badges.filter(badge => totalPoints >= badge.pointsRequired);

    return (
        <div className={` ${className} border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-4`}>
            {/* Header */}
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                🏅 Earned Badges
            </h3>

            {/* Scrollable Badges Grid */}
            {earnedBadges.length > 0 ? (
                <ScrollArea className="h-64">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {earnedBadges.map((badge, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center p-3 rounded-lg bg-slate-50 dark:bg-neutral-800/70 hover:shadow-md transition"
                            >
                                <img
                                    src={badge.badgeImage}
                                    alt={badge.badgeName}
                                    className="w-14 h-14 mb-2"
                                />
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                    {badge.badgeName}
                                </p>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    No badges earned yet
                </p>
            )}
        </div>
    )
}

export default EarnedBadges
