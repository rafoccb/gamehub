"use server"
import { GameParams } from "@/app/types/type";
import { getGames } from "@/services/games";
import { getDataRange } from "@/utils/lib";

export async function getRandomGame(filter: string) {
    let params: GameParams = {}
    const randomPage = Math.floor(Math.random() * 100) + 1;

    switch(filter) {
        case "recent":
            params = { ordering: "-released", dates: getDataRange(365), tba: false, page: randomPage, page_size: 40 }
        break;
        case "retro":
            params = { dates: "1980-01-01,2000-01-01", page: randomPage, page_size: 40 }
        break;
        case "popular":
            params = { ordering: "-added", page: randomPage, page_size: 40 }
        break;
        case "top":
            params = { ordering: "-rating", page: randomPage, page_size: 40 }
        break;
        
        default:
        return null;
    }

    const game = await getGames(params)
    if(!game || game.length === 0) return null;

    const randomGame = Math.floor(Math.random() * game.length)
    const random = game[randomGame]

    return {
        slug: random.slug,
        name: random.name,
    } 
}