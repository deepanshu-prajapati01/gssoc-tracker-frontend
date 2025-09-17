import { create } from 'zustand'
import axiosInstance from '@/lib/axiosInstance'

export const useLeaderboardStore = create((set, get) => ({
    error: null,
    isLoading: false,

    // Leaderboard
    leaderboard: [], // participants from fetched pages
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

    currentPage: 1,    // Track which page user is on (local only)
    pagesFetched: new Set(), // Track fetched pages to prevent duplicate API calls
    search: "", // Search term

    /**
     * Fetch leaderboard for the current page (only if not already fetched)
     */
    fetchLeaderboard: async () => {
        const { currentPage, pagesFetched, search } = get()

        // 🛑 Skip API call if we've already fetched this page (only if not searching)
        if (!search && pagesFetched.has(currentPage)) {
            console.log(`Page ${currentPage} already fetched. Skipping API call.`)
            return
        }

        set({ isLoading: true, error: null })

        try {
            let url = `/leaderboard?page=${currentPage}`
            if (search && search.trim() !== "") {
                url += `&search=${search.trim()}`
            }

            const apiResponse = await axiosInstance.get(url)
            const response = apiResponse.data

            if (!response.success) {
                set({ error: response.message || 'Something went wrong' })
                return
            }

            const data = response.data

            set((prev) => ({
                leaderboard: search
                    ? data.participants // if searching → replace results
                    : [...prev.leaderboard, ...data.participants], // otherwise append
                leaderboardLastUpdated: data.lastUpdated,
                totalParticipants: data.totalParticipants,

                pagination: {
                    totalPages: data.pagination.totalPages,
                    hasNextPage: data.pagination.hasNextPage,
                    hasPreviousPage: data.pagination.hasPreviousPage,
                    nextPage: data.pagination.nextPage,
                    previousPage: data.pagination.previousPage,
                },

                // Only cache if not searching
                pagesFetched: search
                    ? new Set() // searching shouldn’t cache
                    : new Set(prev.pagesFetched).add(currentPage),
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

    /**
     * Set search term
     */
    setSearch: (searchText) => {
        // Reset leaderboard + pagesFetched when new search applied
        set({
            search: searchText,
            leaderboard: [],
            pagesFetched: new Set(),
            currentPage: 1,
        })
    },
}))
