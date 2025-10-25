import { GameAchievements } from "@/app/types/type";
import { api } from "@/services/api";
import { getDataRange } from "@/utils/date";

const apiKey = process.env.RAWG_KEY

type GameParams = {
    page?: number,
    page_size ?: number,
    tba?: boolean,
    dates?: string,
    genres?: string,
    developers?: string,
    publishers?: string,
    metacritic?: string,
}

export const getGames = async (params: GameParams = {}) => {
    const response = await api.get(`/games`, {
        params: {
            key: apiKey,
            page: params.page ?? 1,
            page_size: params.page_size,
            tba: params.tba ?? true,
            dates: params.dates ?? getDataRange(180),
            genres: params.genres,
            developers: params.developers,
            publishers: params.publishers,
            metacritic: params.metacritic
        }
    })
    // console.log(response.data.results)
    return response.data.results;
}

export const getGamesBySlug = async (slug: string) => {
    const response = await api.get(`/games/${slug}`, {
        params: {
            key: apiKey,
        }
    })
    // console.log(response.data)
    return response.data
}

export const getScreenshotByGame = async (id: number) => {
    const response = await api.get(`/games/${id}/screenshots`, {
        params: {
            key: apiKey
        }
    })
    return response.data
}

export const getPlatforms = async () => {
    const response = await api.get("/platforms", {
        params: {
            key: apiKey
        }
    })
    return response.data
}

export async function getAchievementsByGame (id: number) {
    let page = 1;
    let all: GameAchievements[] = []
    let hasNext = true;

    while(hasNext) {
        const response = await api.get(`games/${id}/achievements`, {
            params: {
                key: apiKey,
                page
            }
        })

        const data = response.data;
        all = [...all, ...data.results]

        hasNext = !!data.next;
        page++;

    }
    return all;
}

export const getMoviesByGame = async (id: number) => {
    const response = await api.get(`/games/${id}/movies`, {
        params: {
            key: apiKey
        }
    })

    return response.data
}

export const getGamesAdditions = async (id: number) => {
    const response = await api.get(`/games/${id}/additions`, {
        params: {
            key: apiKey
        }
    })
    return response.data;
}

export const getGamesSeries = async (id: number) => {
    const response = await api.get(`/games/${id}/game-series`, {
        params: {
            key: apiKey
        }
    })
    return response.data;
}