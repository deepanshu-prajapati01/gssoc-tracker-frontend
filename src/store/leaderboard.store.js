import { create } from 'zustand';
import axiosInstance from '@/lib/axiosInstance';

export const useLeaderboardStore = create((set, get) => ({
    error: null,
    isLoading: false,

    // Leaderboard
    leaderboard: [], // all participants from fetched pages
    leaderboardLastUpdated: null,
    totalParticipants: null,

    // Pagination
    pagination: {
        totalPages: null,
        hasNextPage: null,
        hasPreviousPage: true,
        nextPage: null,
        previousPage: null,
        currentPage: 0,
    },

    // Track fetched pages to prevent duplicate API calls
    pagesFetched: new Set(),

    /**
     * Fetch leaderboard for the current page (only if not already fetched)
     */
    fetchLeaderboard: async () => {
        const { currentPage, pagesFetched, leaderboard } = get();

        // 🛑 Skip API call if we've already fetched this page
        if (pagesFetched.has(currentPage)) {
            console.log(`Page ${currentPage} already fetched. Skipping API call.`);
            return;
        }

        set({ isLoading: true });

        try {
            const apiResponse = await axiosInstance.get(`/leaderboard?page=${currentPage}`);
            const response = apiResponse.data;

            if (!response.success) {
                set({ error: response.message || "Something went wrong" });
                return;
            }

            const data = response.data;

            // Append new participants to existing leaderboard
            const updatedLeaderboard = [...leaderboard, ...data.participants];

            // Update state
            set((prev) => ({
                leaderboard: updatedLeaderboard,
                leaderboardLastUpdated: data.lastUpdated,
                totalParticipants: data.totalParticipants,

                // Pagination
                pagination: {
                    totalPages: data.pagination.totalPages,
                    hasNextPage: data.pagination.hasNextPage,
                    hasPreviousPage: data.pagination.hasPreviousPage,
                    nextPage: data.pagination.nextPage,
                    previousPage: data.pagination.previousPage,
                    currentPage: data.pagination.currentPage,
                },

                // Add currentPage to fetched pages
                pagesFetched: new Set(prev.pagesFetched).add(currentPage),
            }));

        } catch (error) {
            if (axiosInstance.isAxiosError?.(error)) {
                set({ error: error.response?.data?.message || "Something went wrong" });
            } else {
                set({ error: error.message || "Something went wrong" });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    /**
     * Set current page
     */
    setCurrentPage: (page) => {
        set({ currentPage: page });
    },
}));
