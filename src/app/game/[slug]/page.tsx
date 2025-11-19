import { getAchievementsByGame, getGamesAdditions, getGamesBySlug, getGamesSeries, getMoviesByGame, getScreenshotByGame } from "@/services/games"
import { Star, Calendar, Clock3} from "lucide-react"
import type { Game, ScreenshotImage } from "../../types/type"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import Image from "next/image"
import Link from "next/link"
import CarouselSwipe from "./components/CarouselSwipe"
import Tag from "./components/Tag"
import Platforms from "./components/Platforms"
import Achievements from "./components/Achievements"
import Addition from "./components/Additions"
import GameSeries from "./components/GameSeries"
import Genres from "./components/Genres"
import Developers from "./components/Developers"
import AddFavorite from "./components/AddFavorite"
import Requirements from "./components/Requirements"
import BondButtons from "./components/BondButtons"
import AddPlatinum from "./components/AddPlatinum"
import UserRatings from "./components/UserRating"

interface PageGameProps {
    params: {
        id: number
        slug: string
    }    
}

export default async function PageGame ({params} : PageGameProps) {
    const { slug } = await params
    const game: Game = await getGamesBySlug(slug)
    const screenshots: ScreenshotImage = await getScreenshotByGame(game.id)  
    const achievements = await getAchievementsByGame(game.id)

    
    const achievementsList = achievements ?? []
    const movies = await getMoviesByGame(game.id)
    const additions = await getGamesAdditions(game.id)
    const gameSeries = await getGamesSeries(game.id)
    // console.log("MOVIES RAW:", JSON.stringify(movies, null, 2));
    // console.log(game);
    

    const releaseDate = new Date(game.released).toLocaleDateString('en-US')


    let title = game.name;
    const add_description = "Stop immediatily, and go see this game! Now! You'll not regret it. Free heroes, free stuff and enhanced and balanced gameplay." 
    if(game.name === 'League of Legends') {
        title = "Dota 2 Tutorial" 
    }

    return (
        <>
            <Header/>
            <div className="w-full max-w-[1280px] m-auto py-12">
                <div className="w-full max-h-[500px] relative md:max-h-[400px] rounded-xl">
                    <div className="inset-0 bg-gradient-to-t from-yellow-950/40 via-zinc-900/40 to-rose-600/30 absolute md:rounded-xl"></div>
                    <Image 
                        src={game.background_image_additional?.length > 0 ? game.background_image_additional : game.background_image}
                        alt={game.name}
                        width={1280}
                        height={500}
                        className="w-full h-[300px] object-cover object-bottom md:h-[400px] md:rounded-xl"
                    />
                </div>
                <div className="w-full flex flex-col justify-center items-start px-4 sm:flex-row">
                    <div className="w-full flex flex-col items-center justify-center sm:min-w-[240px] sm:max-w-[240px] sm:sticky">
                        <div className="w-full flex items-center justify-center max-w-[240px] m-auto relative z-10">
                            <div className="w-fit p-1 absolute z-50 -top-[45%] right-6 sm:right-0 bg-gradient-to-br from-zinc-900/80 to-yellow-500/80 rounded-lg shadow">
                                <span className="text-xs text-white font-semibold flex items-center justify-center gap-1">
                                    <Star size={12} fill="#fff"/> {game.rating}
                                </span>
                            </div>
                            <Image
                                src={game.background_image}
                                alt={game.name}
                                width={200}
                                height={400}
                                className="w-full max-w-[220px] h-[320px] rounded-2xl object-center object-cover shadow-2xl shadow-white/20 sm:ml-11 -mt-[45%] relative z-20"
                            />
                        </div>
                        <div className="w-full mt-4 flex flex-col items-center justify-center sm:ml-12">
                            <span className="w-full text-white mt-2 font-medium text-sm text-center">What is your bond with this game?</span>

                            <div className="w-full">
                                <BondButtons gameId={game.id} gameName={game.name} gameSlug={game.slug} gameImage={game.background_image} gameDate={game.released} />
                            </div>

                            <div className="w-full flex flex-col items-center justify-center">
                                <span className="w-full mt-2 text-center text-sm">Did you like this game?</span>
                                <UserRatings gameId={game.id} gameName={game.name} gameSlug={game.slug} gameImage={game.background_image} gameDate={game.released} />
                            </div>
                            
                        </div>
                        <div className="w-full sm:ml-12 mt-4 hidden sm:inline-flex">
                            <Tag tags={game.tags} />
                        </div>
                        <div></div>
                    </div>

                    <div className="w-full h-full p-3 mt-4 text-center sm:text-start sm:ml-5 overflow-x-hidden">
                        <h1 className="text-white text-4xl font-bold sm:text-5xl md:text-6xl">
                            {title}
                        </h1>

                        <Developers devs={game.developers} />

                        <p className="text-sm sm:text-base text-gray-400 mt-1 flex items-center justify-center sm:justify-start gap-1 mt-2"> 
                            <Calendar size={14} /> {game.tba === true ? "TBA" : releaseDate}
                        </p>
                        <p className="text-sm sm:text-base text-gray-400 mt-1 flex items-center justify-center sm:justify-start gap-1"> 
                            <Clock3 size={14} /> {game.playtime} hours
                        </p>

                        
                        <Genres genres={game.genres} />
                        

                        <Platforms platforms={game.platforms} />

                        {game.name === "League of Legends" && (
                            <div className="mt-4">
                                <Link href="/game/dota-2" className="text-base font-bold text-yellow-500 animate-pulse">
                                    {add_description}
                                </Link>
                            </div>
                        )}

                        <div className="text-white text-sm sm:text-base mt-4" 
                            dangerouslySetInnerHTML={{ __html: game.description }}>
                        </div>

                        <div className="w-full mt-4 inline-flex sm:hidden">
                            <Tag tags={game.tags} />
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            {game.ratings.map((notes) => (
                                <div key={notes.id} className="w-full flex flex-col items-center justify-center gap-2">
                                    <div className="w-full flex items-center justify-between">
                                        <span className="text-xs text-yellow-200">{notes.title}</span>
                                        <span className="text-xs text-gray-400 font-semibold">{notes.count}</span>
                                    </div>
                                    <div className="w-full h-[12px] rounded-lg bg-neutral-600 -mt-1">
                                        <div className="h-[12px] bg-yellow-500 rounded-lg flex items-center justify-end pr-0.5" style={{ maxWidth: `${notes.percent}%` }}>
                                            <span className="text-[8px] text-black font-semibold text-end">{notes.percent}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <CarouselSwipe object={{type: "screenshots", results: screenshots?.results || []}} />

                        <Requirements platforms={game.platforms}/>

                        <Achievements achievements={achievementsList} />
                         
                        <CarouselSwipe object={{type: "movies", results: movies?.results || []}} /> 

                        <Addition additions={additions}/>

                        <GameSeries gameSeries={gameSeries}/>

                    </div>
                </div>
            </div>

            <div className="w-fit fixed z-40 left-4 bottom-4 group">
                <AddFavorite gameId={game.id} gameName={game.name} gameSlug={game.slug} gameImage={game.background_image} gameDate={game.released}/>
            </div>
            
            <Footer/>
        </>
    )
}