import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Developers from "@/app/game/[slug]/components/Developers";
import Genres from "@/app/game/[slug]/components/Genres";
import Tag from "@/app/game/[slug]/components/Tag";
import { getTypeForSearchPage } from "@/services/games";
import { formatSlugName } from "@/utils/lib";
import { Calendar, ChevronRight, Clock3 } from "lucide-react"
import Image from "next/image";
import Link from "next/link";

type PageSearchProps = {
    params: {
        type: string;
        slug: string;
    }
}

export default async function PageSearch({params}: PageSearchProps) {
    const {type, slug} = await params;
    console.log("tipo: ", type, "\n name: ", slug)

    const gameInfo = await getTypeForSearchPage(type, slug);
    // console.log(JSON.stringify(gameInfo, null, 2))

    return(
        <>
            <Header />

            <main className="w-full max-w-[1280px] m-auto py-12">
                <div className="w-full">
                    <h2 className="text-center flex items-center justify-center gap-1">
                        Search <ChevronRight size={14}/> 
                        <span className="capitalize font-semibold">{type}</span> <ChevronRight size={14}/> 
                        <span className="font-semibold text-yellow-500">{formatSlugName(slug)}</span>
                    </h2>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 content-center gap-6 mt-8">
                    
                    {gameInfo.results.map((game) => (
                        <div className="w-full flex flex-col items-start justify-start" key={game.id}>
                            <Link href={`/game/${game.slug}`}>
                                <div className="w-full">
                                    <Image 
                                        src={game.background_image}
                                        alt={game.name}
                                        width={360}
                                        height={200}
                                        className="w-full rounded-xl shadow-lg h-[200px] object-cover hover:brightness-70 hover:scale-105"
                                    />
                                    <div className="w-full flex items-start justify-between mt-3">
                                        <h1 className="font-bold text-lg sm:text-xl">{game.name}</h1>
                                        <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-start gap-1 mt-1"> 
                                            <Calendar size={14} /> {game.tba === true ? "TBA" : new Date(game.released).toLocaleDateString('en-US')}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* <div className="w-full flex items-center justify-center sm:justify-start gap-1 mt-2">
                                <span className="text-xs sm:text-sm text-gray-400">By:</span>
                                {game.developers.map((dev) => (
                                    <Link href={`/search/developers/${dev.slug}`} key={dev.id} >
                                        <div className="w-fit flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                            <span className="text-xs sm:text-sm text-gray-400 underline hover:text-white cursor-pointer">{dev.name}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div> */}
                            {/* <Developers devs={game.developers} /> */}
                            <Genres genres={game.genres} />


                            {/* <div className="text-white text-sm sm:text-base mt-4"
                                dangerouslySetInnerHTML={{ __html: game.description}}>
                                </div> */}
            
    

                            <button className="mt-2 font-semibold cursor-pointer border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition rounded-lg px-3 py-2 text-xs sm:text-sm">
                                See more
                            </button>
                        </div> 
                        
                    ))}
                </div>
            </main>

            <Footer/>
        </>
    )
}