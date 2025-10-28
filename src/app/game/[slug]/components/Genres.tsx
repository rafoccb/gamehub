import Link from "next/link"
import { Genre } from "../../../types/type"

type GenreProps = {
    genres: Genre[]
}

export default function Genres({genres}: GenreProps) {   
    return (
        <div className="w-full flex items-center justify-center sm:justify-start flex-wrap gap-2 mt-2 mb-4">
            {genres.map((genre) => (
                <Link href={`/search/genres/${genre.slug}`} key={genre.id} className="bg-rose-600 rounded-lg px-2 py-1 hover:scale-105 cursor-pointer transition-all hover:bg-rose-600/90">
                    <span className=" text-white font-semibold text-xs">
                        {genre.name}
                    </span>
                </Link>
            ))}
        </div>
    )    
}