import { getGamesBySlug, getScreenshotByGame } from "@/services/games"
import { Flag, Gamepad2, Eye, Heart} from "lucide-react"
import type { ScreenshotImage } from "./types/screenshot"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import Image from "next/image"
import Link from "next/link"
import GameButton from "./components/GameButton"
import CarouselSwipe from "./components/CarouselSwipe"

interface PageGameProps {
    params: {
        id: number
        slug: string
    }
}

type Tags = {
    id: number;
    name: string;
    slug: string;
}

type Game = {
    id: number;
    name: string;
    background_image: string;
    background_image_additional: string;
    tags: Tags[];
    description_raw: string;
}



export default async function PageGame ({params} : PageGameProps) {
    const { slug } = await params
    const game: Game = await getGamesBySlug(slug)
    const screenshots: ScreenshotImage = await getScreenshotByGame(game.id)


    console.log(game)
    // console.log(screenshots)

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
                    <div className="inset-0 bg-black/50 absolute rounded-xl"></div>
                    <Image 
                        src={game.background_image_additional}
                        alt={game.name}
                        width={1280}
                        height={500}
                        className="w-full h-[300px] object-cover object-bottom md:h-[400px] rounded-xl"
                    />
                </div>
                <div className="w-full flex flex-col justify-center items-start px-4 sm:flex-row">
                    <div className="w-full flex flex-col items-center justify-center sm:max-w-[240px] ">
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
                        <div className="w-full p-3 flex flex-wrap items-center justify-center gap-2 sm:ml-12">
                            {game.tags.map((tag) => (
                                <span key={tag.id} className="text-xs bg-yellow-300 p-1 rounded-lg text-black font-semibold">
                                    {tag.name }
                                </span>
                            ))}
                        </div>
                        <div></div>
                    </div>

                    <div className="w-full h-full p-3 mt-4 text-center sm:text-start sm:ml-3">
                        <h1 className="text-white text-2xl font-bold sm:text-3xl md:text-4xl">
                            {title}
                        </h1>
                        
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

                        <CarouselSwipe screenshots={screenshots} />

                        

                       
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