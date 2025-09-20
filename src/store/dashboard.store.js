import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

export const useDashboardStore = create((set, get) => ({
    isLoading: true,
    error: null,

    dashboardData: {},
    username: "",


    fetchDashboard: async (username) => {
        set({ isLoading: true, error: null })
        const { dashboardData } = get()

        // To avoid multiple requests for the same username
        if (dashboardData[username]) {
            return
        }

        try {
            const apiResponse = await axiosInstance.post(`/dashboard`, { username })
            const response = apiResponse.data

            if (!response.success) {
                set({ error: response.message || "Something went wrong" })
                return
            }

            const data = response.data

            set((prev) => ({
                dashboardData: {
                    ...prev.dashboardData,
                    [username]: data,
                },
            }))
        }
        catch (error) {
            if (axiosInstance.isAxiosError?.(error)) {
                set({ error: error.response?.data?.message || "Something went wrong" })
            } else {
                set({ error: error.message || "Something went wrong" })
            }
        } finally {
            set({ isLoading: false })
        }
    },
    setUsername: (username) => set({ username }),


}))