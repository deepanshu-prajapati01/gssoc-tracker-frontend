'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Github, Globe, X, Copy, Check } from 'lucide-react'

import DashboardSkeleton from '@/app/(pages)/dashboard/components/DashboardSkeleton'
import Dashboard from '@/app/(pages)/dashboard/components/Dashboard'
import { useDashboardStore } from '@/store/dashboard.store'

const DashboardPage = () => {
  const { username } = useParams()
  const { dashboardData, isLoading, fetchDashboard } = useDashboardStore()

  const [showGuide, setShowGuide] = useState(true)
  const [current, setCurrent] = useState(0)
  const [copied, setCopied] = useState(false)

  const dashboardUrl = `https://gssoc-tracker.netlify.app/dashboard/${username}`

  const slides = [
    {
      icon: <Globe className="w-6 h-6 text-yellow-400" />,
      title: 'Your Public Dashboard is Live!',
      text: 'You now have a sharable GSSoC dashboard link. Use it to showcase your contribution stats anywhere.',
      actions: [
        {
          label: 'Copy Link',
          icon: copied ? <Check size={16} /> : <Copy size={16} />,
          onClick: async () => {
            await navigator.clipboard.writeText(dashboardUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          },
        },
      ],
    },
    {
      icon: <Linkedin className="w-6 h-6 text-white" />,
      title: 'Share on LinkedIn',
      text: 'Showcase your open-source journey! Add this link in your LinkedIn “Featured” or “Projects” section.',
      actions: [
        {
          label: 'Post on LinkedIn',
          icon: <Linkedin size={16} />,
          onClick: () =>
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                dashboardUrl
              )}`,
              '_blank'
            ),
        },
      ],
    },
    {
      icon: <Github className="w-6 h-6 text-gray-800 dark:text-gray-200" />,
      title: 'Add to Your GitHub',
      text: 'Add your tracker link in your GitHub bio or pin it in your README to highlight your progress!',
      actions: [
        {
          label: 'Open GitHub Profile',
          icon: <Github size={16} />,
          onClick: () => window.open('https://github.com/settings/profile', '_blank'),
        },
      ],
    },
  ]

  useEffect(() => {
    if (username) {
      fetchDashboard(username)
    }
  }, [username, fetchDashboard])

  useEffect(() => {
    if (!showGuide) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [showGuide])

  // Remember user's dismissal
  useEffect(() => {
    const seenGuide = localStorage.getItem('seenShareGuide')
    if (seenGuide) setShowGuide(false)
  }, [])

  const handleClose = () => {
    localStorage.setItem('seenShareGuide', 'true')
    setShowGuide(false)
  }

  return (
    <>
      {/* Interactive Share Hub */}
      {showGuide && (
        <div className="w-full flex justify-center mt-4">
          <div className="relative w-[95%] sm:w-[80%] md:w-[70%] bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-500 text-white rounded-2xl shadow-lg p-5 overflow-hidden">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center flex flex-col items-center gap-3"
              >
                <div className="flex items-center justify-center gap-2">
                  {slides[current].icon}
                  <h2 className="font-semibold text-lg sm:text-xl">
                    {slides[current].title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base opacity-90 max-w-xl">
                  {slides[current].text}
                </p>

                <code className="bg-white text-purple-700 rounded px-2 py-1 text-xs sm:text-sm mt-1">
                  {dashboardUrl}
                </code>

                {/* Action buttons */}
                <div className="flex gap-2 flex-wrap justify-center mt-2">
                  {slides[current].actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={action.onClick}
                      className="flex items-center cursor-pointer gap-2 bg-white/20 hover:bg-white/30 transition-all px-3 py-1.5 rounded-full text-sm"
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide dots */}
            <div className="flex justify-center gap-2 mt-3">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                    current === idx ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dashboard below */}
      <div className="mt-6">
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <Dashboard dataToDisplay={dashboardData[username]} />
        )}
      </div>
    </>
  )
}

export default DashboardPage
