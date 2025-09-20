'use client'
import React, { useEffect } from 'react'

// When there's no user 
import DashboardInput from './DashboardInput'
import DashboardSkeleton from './DashboardSkeleton'

// Display all the data of the user 
import Dashboard from './Dashboard'
import { useDashboardStore } from '@/store/dashboard.store'
import { toast } from 'sonner'

const DashboardHandler = () => {
    const { username, isLoading, dashboardData, error: errorMessage, setUsername } = useDashboardStore()

    // Handle error side effect
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            setUsername("")
        }
    }, [errorMessage, setUsername])

    // If no user, show the input overlay on top of projects
    if (!username) {
        return (
            <div className='relative min-h-screen'>
                <Dashboard />
                <div className='fixed py-10 inset-0 z-10'>
                    <DashboardInput />
                </div>
            </div>
        )
    }

    // If loading, show skeleton
    if (isLoading) return <DashboardSkeleton />

    // If user data exists is false
    if (!dashboardData[username]) {
        return (
            <div className='relative min-h-screen'>
                <Dashboard />
                <div className='fixed py-10 inset-0 z-10'>
                    <DashboardInput />
                </div>
            </div>
        )
    }

    // Otherwise, render dashboard
    return <Dashboard dataToDisplay={dashboardData[username]} />
}

export default DashboardHandler
