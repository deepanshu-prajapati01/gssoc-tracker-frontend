'use client'
import { useDashboardStore } from '@/store/dashboard.store'
import { useEffect, useState } from 'react'
import { DashboardApiData } from './DashboardApiData'
import badges from '@/lib/badges.json'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import PRPointsCard from '../DashboardComponents/PRPointsCard'
import ContributionGraph from '../DashboardComponents/ContributionGraph'
import RankProgress from '../DashboardComponents/RankProgress'
import EarnedBadges from '../DashboardComponents/EarnedBadges'
import StreaksSection from '../DashboardComponents/StreaksSection'
import UserProfileCard from '../DashboardComponents/UserProfileCard'
import PrTable from '../DashboardComponents/PrTable'


const Dashboard = ({ dataToDisplay = DashboardApiData }) => {

    const { exists, rank, username, fullName, avatarUrl, profileUrl, totalPRs, totalPoints, streaks, contributionGraph, labelStats, progressToMake, prs, lastUpdated } = dataToDisplay;

    // grabbing data from dataToDisplay. 
    const userData = { exists, rank, username, fullName, avatarUrl, profileUrl, totalPRs, totalPoints }



    return (
        <div className='min-h-screen p-4 bg-zinc-50 dark:bg-neutral-900/80 '>

            <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6">

                {/* Left side bar */}
                <div className=" rounded-lg col-span-12 lg:col-span-4 xl:col-span-3 space-y-4">
                    {/* User Profile Section */}
                    <UserProfileCard userData={userData} />

                    {/* Streaks Section */}
                    <StreaksSection streaks={streaks} />
                </div>


                {/* Main content area */}
                <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">

                    <div className='flex-1 flex flex-col sm:flex-row gap-4 '>
                        {/* Rank Progress Section */}
                        <RankProgress progressToMake={progressToMake} />
                        <PRPointsCard prs={prs} />
                    </div>


                    <div className='flex-1 flex flex-col sm:flex-row gap-4  '>
                        <ContributionGraph className={'flex-[66]'} contributionGraph={contributionGraph} />
                        <EarnedBadges totalPoints={totalPoints} className={'flex-[33]'} />
                    </div>

                </div>


                {/* PR data */}
                <div className='col-span-12 space-y-4'>
                    <PrTable prs={prs} labelStats={labelStats} />
                </div>


            </div>



        </div>
    )
}

export default Dashboard
