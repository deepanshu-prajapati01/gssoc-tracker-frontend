'use client'
import { useDashboardStore } from '@/store/dashboard.store'
import { useEffect, useState } from 'react'
import { DashboardApiData } from './DashboardApiData'
import badges from '@/lib/badges.json'


const Dashboard = ({ dataToDisplay = DashboardApiData }) => {

    const { exists, rank, username, fullName, avatarUrl, profileUrl, totalPRs, totalPoints, streaks, contributionGraph, labelStats, progressToMake, prs, lastUpdated } = dataToDisplay;

    // grabbing data from dataToDisplay. 
    const userData = { exists, rank, username, fullName, avatarUrl, profileUrl, totalPRs, totalPoints }
    const graphsData = { labelStats, contributionGraph }
    const progressData = { progressToMake }
    const prsData = prs



    return (
        <div className='min-h-screen p-4 bg-zinc-50 dark:bg-neutral-900/80 '>

            <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6">

                {/* Left side bar */}
                <div className=" rounded-lg col-span-12 lg:col-span-4 xl:col-span-3 space-y-4">
                    {/* User Profile Section */}
                    <div className="flex flex-col items-center space-y-4 border border-gray-200 dark:border-neutral-700 p-4 rounded-lg">
                        {/* Avatar */}
                        <div className="relative">
                            <img
                                src={userData.avatarUrl}
                                alt={userData.fullName}
                                className="w-24 h-24 rounded-full border-4 border-emerald-100 dark:border-violet-900/50"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-emerald-500 dark:bg-violet-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                                {userData.rank}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{userData.fullName}</h2>
                            <a
                                href={userData.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 dark:text-violet-400 hover:underline text-sm"
                            >
                                @{userData.username}
                            </a>
                        </div>

                        {/* Divider */}
                        <div className="w-full border-t border-slate-200 dark:border-neutral-700 my-2"></div>

                        {/* Stats */}
                        <div className="w-full grid grid-cols-2 gap-4 text-center">
                            <div className="bg-slate-50 dark:bg-neutral-800/70 p-3 rounded-lg">
                                <p className="text-slate-500 dark:text-neutral-400 text-sm">Total Points</p>
                                <p className="text-2xl font-bold text-emerald-600 dark:text-violet-400">
                                    {userData.totalPoints}
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-neutral-800/70 p-3 rounded-lg">
                                <p className="text-slate-500 dark:text-neutral-400 text-sm">PRs Merged</p>
                                <p className="text-2xl font-bold text-emerald-600 dark:text-violet-400">
                                    {userData.totalPRs}
                                </p>
                            </div>
                        </div>

                        {/* Rank Badge */}
                        <div className="w-full bg-emerald-50 dark:bg-violet-900/20 rounded-lg px-4 py-2 flex items-center justify-center space-x-3 shadow-sm">
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Rank</span>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">#{userData.rank}</span>
                            <span className="text-slate-400 dark:text-neutral-500">•</span>
                            <span className="text-sm font-semibold text-emerald-700 dark:text-violet-300">
                                Top {Math.max(1, ((userData.rank / 5000) * 100).toFixed(1))}%
                            </span>
                        </div>

                    </div>

                    {/* Streaks Section */}
                    <div className="border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-5">

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
                        <div className="bg-slate-50 dark:bg-neutral-800/70 p-3 rounded-lg flex justify-between items-center">
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



                    {/* Rank Progress Section */}
                    <div className="border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-5">
                        {/* Header */}
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Rank Progress
                        </h3>

                        {/* Next Rank Progress */}
                        <div>
                            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-1">
                                <span>To Rank #{progressToMake.nextTarget.targetRank}</span>
                                <span>
                                    {progressToMake.currentPoints}/{progressToMake.nextTarget.targetPoints} pts
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="h-2.5 transition-all duration-500 rounded-full bg-emerald-500 dark:bg-violet-500"
                                    style={{
                                        width: `${(progressToMake.currentPoints / progressToMake.nextTarget.targetPoints) * 100}%`,
                                    }}
                                />
                            </div>

                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {progressToMake.nextTarget.pointsNeeded} more points to rank up
                            </p>
                        </div>

                        {/* Ultimate Target */}
                        <div className="pt-4 border-t border-slate-200 dark:border-neutral-700">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Ultimate Target
                                </span>
                                <span className="px-2 py-1 bg-emerald-100 dark:bg-violet-900/30 text-emerald-700 dark:text-violet-300 text-xs font-medium rounded">
                                    Rank #{progressToMake.ultimateTarget.targetRank}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Total Points Needed
                                    </p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                                        {progressToMake.ultimateTarget.targetPoints}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Remaining</p>
                                    <p className="text-lg font-bold text-emerald-600 dark:text-violet-400">
                                        {progressToMake.ultimateTarget.pointsNeeded}
                                    </p>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>


                {/* Main content area */}
                <div className=" col-span-12 lg:col-span-8 xl:col-span-9 space-y-3 lg:space-y-6">

                    <div className='flex-1 flex gap-4 '>
                        {/* Rank Progress Section */}
                        <div className="border border-gray-200 dark:border-neutral-700 p-4 rounded-lg space-y-5">
                            {/* Header */}
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Rank Progress
                            </h3>

                            {/* Next Rank Progress */}
                            <div>
                                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-1">
                                    <span>To Rank #{progressToMake.nextTarget.targetRank}</span>
                                    <span>
                                        {progressToMake.currentPoints}/{progressToMake.nextTarget.targetPoints} pts
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-slate-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="h-2.5 transition-all duration-500 rounded-full bg-emerald-500 dark:bg-violet-500"
                                        style={{
                                            width: `${(progressToMake.currentPoints / progressToMake.nextTarget.targetPoints) * 100}%`,
                                        }}
                                    />
                                </div>

                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {progressToMake.nextTarget.pointsNeeded} more points to rank up
                                </p>
                            </div>

                            {/* Ultimate Target */}
                            <div className="pt-4 border-t border-slate-200 dark:border-neutral-700">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Ultimate Target
                                    </span>
                                    <span className="px-2 py-1 bg-emerald-100 dark:bg-violet-900/30 text-emerald-700 dark:text-violet-300 text-xs font-medium rounded">
                                        Rank #{progressToMake.ultimateTarget.targetRank}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Total Points Needed
                                        </p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                                            {progressToMake.ultimateTarget.targetPoints}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Remaining</p>
                                        <p className="text-lg font-bold text-emerald-600 dark:text-violet-400">
                                            {progressToMake.ultimateTarget.pointsNeeded}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Earned Badges */}
                            <div className="pt-4 border-t border-slate-200 dark:border-neutral-700">
                                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                    Earned Badges
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {badges
                                        .filter(badge => progressToMake.currentPoints >= badge.pointsRequired)
                                        .map((badge, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center text-center p-2 rounded-lg bg-slate-50 dark:bg-neutral-800/70"
                                            >
                                                <img
                                                    src={badge.badgeImage}
                                                    alt={badge.badgeName}
                                                    className="w-12 h-12 mb-2"
                                                />
                                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                                    {badge.badgeName}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                                {badges.filter(badge => progressToMake.currentPoints >= badge.pointsRequired).length === 0 && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                                        No badges earned yet
                                    </p>
                                )}
                            </div>
                        </div>



                    </div>

                </div>





            </div>



        </div>
    )
}

export default Dashboard
