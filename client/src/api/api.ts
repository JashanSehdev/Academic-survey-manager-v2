import axios from "axios";

export const backend_api = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials : true
})

