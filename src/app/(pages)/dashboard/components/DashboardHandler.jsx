'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// When there's no user 
import DashboardInput from './DashboardInput'
import DashboardSkeleton from './DashboardSkeleton'

// Display all the data of the user 
import Dashboard from './Dashboard'
import { useDashboardStore } from '@/store/dashboard.store'
import { toast } from 'sonner'

const DashboardHandler = () => {
    const { username, isLoading, dashboardData, error: errorMessage, setUsername, fetchDashboard } = useDashboardStore()
    const router = useRouter()

    // Handle error side effect
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            setUsername("")
        }
    }, [errorMessage, setUsername])

    useEffect(() => {
        if (username) {
            fetchDashboard(username)
        }
    }, [username, fetchDashboard])

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

    // Otherwise, take user to dashboard/[username]
    router.push(`/dashboard/${username}`)
}

export default DashboardHandler
