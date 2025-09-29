import { api } from "@/services/api";
import { getDataRange } from "@/utils/date";

const apiKey = process.env.NEXT_PUBLIC_RAWG_KEY
const dates = getDataRange(180)

export const getGamesForBanner = async (page = 1) => {
    const response = await api.get(`/games`, {
        params: {
            key: apiKey,
            page,
            page_size: 3,
            tba: true,
            dates,
        }
    })
    return response.data.results;
}