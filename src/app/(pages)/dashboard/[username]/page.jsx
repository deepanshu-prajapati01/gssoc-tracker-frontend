'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import DashboardSkeleton from '@/app/(pages)/dashboard/components/DashboardSkeleton'
import Dashboard from '@/app/(pages)/dashboard/components/Dashboard'
import { useDashboardStore } from '@/store/dashboard.store'

const page = () => {
    const { username } = useParams()
    const { dashboardData, isLoading, fetchDashboard } = useDashboardStore()

    useEffect(() => {
        if (username) {
            fetchDashboard(username)
        }
    }, [username, fetchDashboard])

    return (
        <>
            {isLoading ? <DashboardSkeleton /> : <Dashboard dataToDisplay={dashboardData[username]} />}
        </>
    )
}

export default page
