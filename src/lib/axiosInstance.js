import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

const axiosInstance = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Request-Source": process.env.NEXT_PUBLIC_SOURCE_PASSWORD
    }
})

export default axiosInstance
