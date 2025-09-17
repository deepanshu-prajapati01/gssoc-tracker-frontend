import { create } from 'zustand'
import axiosInstance from '@/lib/axiosInstance'

export const useLeaderboardStore = create((set, get) => ({
    error: null,
    isLoading: true,

    // Leaderboard: keyed by page number
    leaderboard: {}, // e.g., { 1: [...participants], 2: [...participants] }
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

    currentPage: 1, // Track which page user is on (local only)
    search: "", // Search term

    /**
     * Fetch leaderboard for the current page
     */
    fetchLeaderboard: async () => {
        const { currentPage, leaderboard, search } = get()

        // 🛑 Skip API call if page data already exists (and not searching)
        if (!search && leaderboard[currentPage]) {
            console.log(`Page ${currentPage} already in state. Skipping API call.`)
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
                set({ error: response.message || "Something went wrong" })
                return
            }

            const data = response.data

            set((prev) => ({
                leaderboard: {
                    ...prev.leaderboard,
                    [currentPage]: data.participants, // store participants under the current page key
                },
                leaderboardLastUpdated: data.lastUpdated,
                totalParticipants: data.totalParticipants,

                pagination: {
                    totalPages: data.pagination.totalPages,
                    hasNextPage: data.pagination.hasNextPage,
                    hasPreviousPage: data.pagination.hasPreviousPage,
                    nextPage: data.pagination.nextPage,
                    previousPage: data.pagination.previousPage,
                },
            }))
        } catch (error) {
            if (axiosInstance.isAxiosError?.(error)) {
                set({ error: error.response?.data?.message || "Something went wrong" })
            } else {
                set({ error: error.message || "Something went wrong" })
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
        // Reset leaderboard cache when a new search is applied
        set({
            search: searchText,
            leaderboard: {},
            currentPage: 1,
        })
    },
}))
