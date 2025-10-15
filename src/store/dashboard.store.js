import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

export const useDashboardStore = create((set, get) => ({
    isLoading: true,
    error: null,

    dashboardData: {},
    username: typeof window !== "undefined" ? localStorage.getItem("username") || "" : "",

    resetLoading: () => {
        set({ isLoading: false })
    },

    fetchDashboard: async (username) => {
        const { dashboardData, resetLoading } = get()

        // To avoid multiple requests for the same username
        if (dashboardData[username]) {
            resetLoading()
            return
        }

        set({ isLoading: true, error: null })

        try {
            const apiResponse = await axiosInstance.post(`/dashboard`, { username })
            const response = apiResponse.data

            if (!response.success) {
                set({ error: response.message || "Something went wrong" })
                resetLoading()
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
            resetLoading()
        }
    },

    setUsername: (username) => {
        localStorage.setItem("username", username);
        set({ username });
    },

    resetUsername: () => {
        localStorage.removeItem("username");
        set({ username: "" });
    },


}))
