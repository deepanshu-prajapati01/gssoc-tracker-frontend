import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";


export const useProjectsStore = create((set, get) => ({
    isLoading: true,
    error: null,

    projects: {},

    fetchProject: async (projectName) => {
        const { projects } = get()

        // 🛑 Skip API call if project data already exists
        if (projects[projectName]) {
            return
        }

        set({ isLoading: true, error: null })
        try {
            const apiResponse = await axiosInstance.get(`/projects/${projectName}`)
            const response = apiResponse.data

            if (!response.success) {
                set({ error: response.message || "Something went wrong" })
                return
            }

            const data = response.data

            set((prev) => ({
                projects: {
                    ...prev.projects,
                    [projectName]: data,
                },
            }))


        } catch (error) {
            if (axiosInstance.isAxiosError?.(error)) {
                set({ error: error.response?.data?.message || "Something went wrong" })
            } else {
                set({ error: error.message || "Something went wrong" })
            }
        }finally{
            set({ isLoading: false })
        }
    },

}))
