import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import SearchForm from "@/app/components/SearchForm";
import AddFavorite from "@/app/game/[slug]/components/AddFavorite";
import Genres from "@/app/game/[slug]/components/Genres";
import Platforms from "@/app/game/[slug]/components/Platforms";
import { getTypeForSearchPage } from "@/services/games";
import { formatSlugName } from "@/utils/lib";
import { Calendar, ChevronRight, Star } from "lucide-react"
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

    const typeForSearch = type === "games" ? "search" : type

    const gameInfo = await getTypeForSearchPage(typeForSearch, slug);
    // console.log(JSON.stringify(gameInfo, null, 2))

    return(
        <>
            <Header />

            <main className="w-full max-w-[1280px] m-auto py-12">
                <div className="w-full">
                    <SearchForm />
                    <h2 className="text-center flex items-center justify-center gap-1 mt-8">
                        Search <ChevronRight size={14}/> 
                        <span className="capitalize font-semibold">{type}</span> <ChevronRight size={14}/> 
                        <span className="font-semibold text-yellow-500">{formatSlugName(slug)}</span>
                    </h2>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 content-center gap-6 mt-8 p-6">
                    
                    {gameInfo.results.map((game) => (
                        <div className="w-full flex flex-col items-start justify-start" key={game.id}>
                            <Link href={`/game/${game.slug}`} className="w-full">
                                <div className="w-full">
                                    <div className="w-full relative">
                                        <div className="w-fit group absolute z-50 top-2 left-2">
                                            <AddFavorite />
                                        </div>
                                        <div className="w-fit p-1 absolute z-50 top-2 right-2 bg-gradient-to-br from-zinc-900/80 to-yellow-500/80 rounded-lg shadow">
                                            <span className="text-xs text-white font-semibold flex items-center justify-center gap-1">
                                                <Star size={12} fill="#fff"/> {game.rating}
                                            </span>
                                        </div>
                                        <Image 
                                            src={game.background_image}
                                            alt={game.name}
                                            width={360}
                                            height={200}
                                            className="w-full rounded-xl shadow-lg h-[200px] object-cover hover:brightness-70 hover:scale-105"
                                        />
                                    </div>
                                    <div className="w-full flex items-start justify-between mt-3">
                                        <h1 className="font-bold text-lg sm:text-xl">{game.name}</h1>
                                        <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-start gap-1 mt-1"> 
                                            <Calendar size={14} /> {game.tba === true ? "TBA" : new Date(game.released).toLocaleDateString('en-US')}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <div className="w-full flex items-center justify-start flex-wrap gap-2 mt-2 mb-4">
                                {game.genres.map((genre) => (
                                    <Link href={`/search/genres/${genre.slug}`} key={genre.id} className="bg-rose-600 rounded-lg px-2 py-1 hover:scale-105 cursor-pointer transition-all hover:bg-rose-600/90">
                                        <span className=" text-white font-semibold text-xs">
                                            {genre.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            <Platforms platforms={game.platforms} />
            
    

                            <Link href={`/game/${game.slug}`} className="mt-2 font-semibold cursor-pointer border border-yellow-500 text-yellow-400 hover:bg-yellow-500/20 hover:text-white transition rounded-lg px-3 py-2 text-xs sm:text-sm">
                                See more
                            </Link>
                        </div> 
                        
                    ))}
                </div>
            </main>

            <Footer/>
        </>
    )
}