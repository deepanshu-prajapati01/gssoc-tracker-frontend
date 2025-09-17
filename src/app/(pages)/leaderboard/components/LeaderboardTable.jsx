'use client'
import React, { useEffect } from 'react'
import { useLeaderboardStore } from '@/store/leaderboard.store'


const LeaderboardTable = () => {

    const { leaderboard, leaderboardLastUpdated, totalParticipants, pagination, setCurrentPage } = useLeaderboardStore()

    useEffect(() => {
        setCurrentPage(1)
    }, [])

    return (
        <section className=''>
            <h2>Leaderboard</h2>
        </section>
    )
}

export default LeaderboardTable
