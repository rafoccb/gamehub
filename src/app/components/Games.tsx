import { Star, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Genre = {
    id: number;
    name: string;
    slug: string;
}

type Game = {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    genres: Genre[];
    slug: string;
}

export default function Games({ games }: {games: Game[]}) {
    return(
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
            {games.map((game) => (
                <div className="w-full relative" key={game.id}>
                    <Link href={`/game/${game.slug}`}>
                        <div className="absolute top-2 right-2 w-fit p-2 bg-amber-400 rounded-xl">
                            <span className=" text-black flex items-center justify-center gap-1 font-semibold text-sm">
                                <Star size={16} fill="#000" />
                                {game.rating}
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
                            {game.name} <Info size={18}/> 
                        </h2>
                        <p className="w-full flex items-center justify-start flex-wrap gap-2 mt-2 mb-4 text-xs md:text-sm">
                            {game.genres.map((genre) => (
                                <span key={genre.id} className="bg-stone-700 px-3 py-1 text-white font-semibold rounded-lg">
                                    {genre.name}
                                </span>
                            ))}
                        </p>
                    </Link>
                </div>
            ))}
        </div>
    )
}