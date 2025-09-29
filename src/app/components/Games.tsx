import { Star } from "lucide-react";
import Image from "next/image";

type Game = {
    id: number;
    name: string;
    background_image: string;
    rating: number;
}

export default function Games({ games }: {games: Game[]}) {
    return(
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
            {games.map((game) => (
                <div className="w-full relative" key={game.id}>
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
                    <h2 className="mt-2 font-semibold">{game.name}</h2>
                </div>
            ))}
        </div>
    )
}