import { getAchievementsByGame, getGamesBySlug, getScreenshotByGame } from "@/services/games"
import { Flag, Gamepad2, Eye, Heart} from "lucide-react"
import type { Game, ScreenshotImage } from "../../types/type"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import Image from "next/image"
import Link from "next/link"
import GameButton from "./components/GameButton"
import CarouselSwipe from "./components/CarouselSwipe"
import Tag from "./components/Tag"
import RatingsChart from "./components/RatingsChart"
import Platforms from "./components/Platforms"
import Achievements from "./components/Achievements"

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
    const achievementsList = achievements ?? [];

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
                    <div className="w-full flex flex-col items-center justify-center sm:max-w-[240px] sm:sticky">
                        <Image
                            src={game.background_image}
                            alt={game.name}
                            width={200}
                            height={400}
                            className="w-full max-w-[220px] h-[320px] rounded-2xl object-center object-cover shadow-2xl shadow-white/30 ml-0 sm:ml-12 -mt-[25%] sm:-mt-[45%] relative z-20"
                        />
                        <div className="w-full mt-4 flex flex-col items-center justify-center sm:ml-12">
                            <span className="w-full text-white mt-2 font-medium text-sm text-center">What is your bond with this game?</span>

                            <div className="w-full flex flex-wrap items-center justify-center gap-3 mt-1">
                                <GameButton label="Beaten" icon={Flag} />
                                <GameButton label="Playing" icon={Gamepad2} />
                                <GameButton label="Next to play" icon={Eye} />                          
                            </div>
                        </div>
                        <div className="w-full sm:ml-12 mt-4 hidden sm:inline-flex">
                            <Tag tags={game.tags} />
                        </div>
                        <div></div>
                    </div>

                    <div className="w-full h-full p-3 mt-4 text-center sm:text-start sm:ml-3">
                        <h1 className="text-white text-4xl font-bold sm:text-5xl md:text-6xl">
                            {title}
                        </h1>

                        <div className="w-full flex items-start justify-center sm:justify-start gap-3 mt-2">
                            <span className="text-sm sm:text-base text-gray-400">By:</span>
                            {game.developers.map((devs) => (
                                <div className="w-fit flex flex-wrap items-center justify-center sm:justify-start gap-2" key={devs.id}> 
                                    <span className="text-sm sm:text-base text-gray-400 underline hover:text-white cursor-pointer">{devs.name}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-sm sm:text-base text-gray-400 mt-1"> 
                            Release Date: {game.tba === true ? "TBA" : releaseDate}
                        </p>
                        <p className="text-sm sm:text-base text-gray-400 mt-1"> 
                            Playtime: {game.playtime} hours
                        </p>

                        <div className="w-full flex items-center justify-center sm:justify-start flex-wrap gap-2 mt-4 mb-4">
                            {game.genres.map((genre) => (
                                <span key={genre.id} className="bg-rose-600 px-3 py-1 text-white font-semibold rounded-lg text-xs md:text-sm hover:scale-105 cursor-pointer transition-all">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <Platforms platforms={game.platforms} />

                        {game.name === "League of Legends" && (
                            <div className="mt-4">
                                <Link href="/game/dota-2" className="text-base font-bold text-yellow-500 animate-pulse">
                                    {add_description}
                                </Link>
                            </div>
                        )}

                        <p className="text-white text-sm sm:text-base mt-4">
                            {game.description_raw}
                        </p>

                        <div className="w-full mt-4 inline-flex sm:hidden">
                            <Tag tags={game.tags} />
                        </div>

                        <CarouselSwipe screenshots={screenshots} />

                        {/* <RatingsChart ratings={game.ratings}/>       */}

                        <Achievements achievements={achievementsList} />
                    </div>
                </div>
            </div>



            <div className="w-fit h-8 p-2 bg-red-600 fixed z-40 left-4 bottom-4 flex items-center justify-center rounded-2xl group">
                <button className="w-full flex items-center justify-center gap-1 px-1 cursor-pointer">
                    <span className="hidden group-hover:block transition-all ">Add to favorites</span>
                    <Heart size={14} strokeWidth={3} color="#FFFFFF"/>
                </button>
            </div>
            <Footer/>
        </>
    )
}