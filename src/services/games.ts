import { api } from "@/services/api";

const apiKey = process.env.RAWG_KEY

export const getGames = async (page = 1) => {
    const response = await api.get(`/games`, {
        params: {
            key: apiKey,
            page,
            page_size: 12,
            tba: true,
        }
    })
    return response.data.results;
}