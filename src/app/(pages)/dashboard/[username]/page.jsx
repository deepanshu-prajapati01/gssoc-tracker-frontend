'use client'

import { useEffect, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { Linkedin, Github, Copy, Check } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DashboardSkeleton from '@/app/(pages)/dashboard/components/DashboardSkeleton'
import Dashboard from '@/app/(pages)/dashboard/components/Dashboard'
import { useDashboardStore } from '@/store/dashboard.store'

const DashboardPage = () => {
  const { username } = useParams()
  const pathname = usePathname()
  const { dashboardData, isLoading, fetchDashboard } = useDashboardStore()

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dashboardUrl = `https://gssoc-tracker.netlify.app/dashboard/${username}`

  // Fetch dashboard data
  useEffect(() => {
    if (username) fetchDashboard(username)
  }, [username, fetchDashboard])

  // Route condition → only show dialog on /dashboard/[username]
  useEffect(() => {
    if (!username || !pathname.startsWith(`/dashboard/${username}`)) return

    const stored = JSON.parse(localStorage.getItem('dashboardDialogs') || '{}')

    // Show only if user hasn’t dismissed permanently
    if (!stored[username]) {
      const timer = setTimeout(() => setOpen(true), 5500) // 5.5 sec delay
      return () => clearTimeout(timer)
    }
  }, [username, pathname])

  // Handle copy link
  const handleCopy = async () => {
    await navigator.clipboard.writeText(dashboardUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Dismiss temporarily
  const handleDismiss = () => {
    setOpen(false)
  }

  // Never show again → store true for this user
  const handleNeverShowAgain = () => {
    const stored = JSON.parse(localStorage.getItem('dashboardDialogs') || '{}')
    stored[username] = true
    localStorage.setItem('dashboardDialogs', JSON.stringify(stored))
    setOpen(false)
  }

  return (
    <>
      {/* Dashboard Data */}
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <Dashboard dataToDisplay={dashboardData[username]} />
      )}

      {/* Delayed Share Info Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card text-card-foreground shadow-xl border border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              🌐 Share Your Dashboard
            </DialogTitle>
            <DialogDescription>
              You can now share your public dashboard link to showcase your GSSoC journey on platforms like LinkedIn and GitHub.
            </DialogDescription>
          </DialogHeader>

          {/* Dashboard URL Display */}
          <div className="bg-muted/40 rounded-md p-3 flex items-center justify-between mt-3">
            <code className="text-xs sm:text-sm break-all">{dashboardUrl}</code>
            <Button
              onClick={handleCopy}
              size="sm"
              variant="secondary"
              className="ml-3 flex items-center gap-1"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 mt-5">
            <Button
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    dashboardUrl
                  )}`,
                  '_blank'
                )
              }
              className="flex items-center justify-center gap-2 bg-[#0a66c2] text-white hover:bg-[#004182]"
            >
              <Linkedin size={16} /> Share on LinkedIn
            </Button>

            <Button
              onClick={() =>
                window.open('https://github.com/settings/profile', '_blank')
              }
              className="flex items-center justify-center gap-2 bg-[#24292e] text-white hover:bg-[#000]"
            >
              <Github size={16} /> Add to GitHub Bio
            </Button>
          </div>

          <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleDismiss}
            >
              Dismiss
            </Button>
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={handleNeverShowAgain}
            >
              Never Show Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DashboardPage
