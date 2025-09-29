import axios from "axios";
export const api = axios.create({
    baseURL: `https://api.rawg.io/api`,
    timeout: 8000,
})
