'use client'
import React from 'react'

// When there's no user 
import DashboardInput from './DashboardInput'
import DashboardSkeleton from './DashboardSkeleton'

// Display all the data of the user 
import Dashboard from './Dashboard'
import { useDashboardStore } from '@/store/dashboard.store'


const DashboardHandler = () => {

    const { username, isLoading, dashboardData, error: errorMessage } = useDashboardStore()
    if (!username) return (
        <div className=''>
            {/* Show the projects component as the background and dashboard input as the foreground  */}
            <div className='relative min-h-screen'>
                <Dashboard />
            </div>
            <div className='fixed py-10 inset-0 z-10'>
                <DashboardInput />
            </div>
        </div>
    )

    return (
        <>
            {isLoading ? (
                <DashboardSkeleton />
            ) : errorMessage ? (
                null
                // { errorMessage }
            ) : (
                <Dashboard dataToDisplay={dashboardData[username]} />
            )}



        </>
    )
}

export default DashboardHandler
