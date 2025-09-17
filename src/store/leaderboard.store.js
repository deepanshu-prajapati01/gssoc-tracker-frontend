import { create } from 'zustand'
import axiosInstance from '@/lib/axiosInstance'

export const useLeaderboardStore = create((set, get) => ({
    error: null,
    isLoading: false,

    // Leaderboard
    leaderboard: [], // participants for current page
    leaderboardLastUpdated: null,
    totalParticipants: null,

    // Pagination (from API)
    pagination: {
        totalPages: null,
        hasNextPage: null,
        hasPreviousPage: null,
        nextPage: null,
        previousPage: null,
    },

    // Track which page user is on (local only)
    currentPage: 1,

    // Track fetched pages to prevent duplicate API calls
    pagesFetched: new Set(),

    /**
     * Fetch leaderboard for the current page (only if not already fetched)
     */
    fetchLeaderboard: async () => {
        const { currentPage, pagesFetched } = get()

        // 🛑 Skip API call if we've already fetched this page
        if (pagesFetched.has(currentPage)) {
            console.log(`Page ${currentPage} already fetched. Skipping API call.`)
            return
        }

        set({ isLoading: true, error: null })

        try {
            const apiResponse = await axiosInstance.get(`/leaderboard?page=${currentPage}`)
            const response = apiResponse.data

            if (!response.success) {
                set({ error: response.message || 'Something went wrong' })
                return
            }

            const data = response.data

            // Update state
            set((prev) => ({
                leaderboard: [...prev.leaderboard, ...data.participants], // append
                leaderboardLastUpdated: data.lastUpdated,
                totalParticipants: data.totalParticipants,

                pagination: {
                    totalPages: data.pagination.totalPages,
                    hasNextPage: data.pagination.hasNextPage,
                    hasPreviousPage: data.pagination.hasPreviousPage,
                    nextPage: data.pagination.nextPage,
                    previousPage: data.pagination.previousPage,
                },

                pagesFetched: new Set(prev.pagesFetched).add(currentPage),
            }))
        } catch (error) {
            if (axiosInstance.isAxiosError?.(error)) {
                set({ error: error.response?.data?.message || 'Something went wrong' })
            } else {
                set({ error: error.message || 'Something went wrong' })
            }
        } finally {
            set({ isLoading: false })
        }
    },

    /**
     * Set current page
     */
    setCurrentPage: (page) => {
        set({ currentPage: page })
    },
}))
