'use client'
import { useDashboardStore } from '@/store/dashboard.store'
import { useEffect, useState } from 'react'

const Dashboard = ({ dataToDisplay }) => {

    const { dashboardData, fetchDashboard, isLoading, error, username } = useDashboardStore()

    useEffect(() => {
        if (!username) return
        fetchDashboard(username)
    }, [username])

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard
