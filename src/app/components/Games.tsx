import { Star, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Game } from "../types/type";
import Genres from "../game/[slug]/components/Genres";

export default function Games({ games }: {games: Game[]}) {
    return(
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
            {games.map((game) => (
                <div className="w-full relative" key={game.id}>
                    <Link href={`/game/${game.slug}`}>
                       <div className="w-fit p-1 absolute z-50 top-2 right-2 bg-gradient-to-br from-zinc-900/80 to-yellow-500/80 rounded-lg shadow">
                            <span className="text-xs text-white font-semibold flex items-center justify-center gap-1">
                                <Star size={12} fill="#fff"/> {game.rating} / 5
                            </span>
                        </div>
                        <Image 
                            src={game.background_image}
                            alt={game.name}
                            width={320}
                            height={220}
                            className="w-full max-w-sm object-cover h-[220px] rounded-xl"
                        />
                   

                        <h2 className="mt-2 font-semibold text-lg md:text-xl flex items-center justify-between gap-2"> 
                            {game.name} 
                            <Info size={18}/> 
                        </h2>
                    </Link>
                    
                    <Genres genres={game.genres}/>
                    
                </div>
            ))}
        </div>
    )
}