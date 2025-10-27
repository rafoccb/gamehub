import Link from "next/link"
import { Genre } from "../../../types/type"

type GenreProps = {
    genres: Genre[]
}

export default function Genres({genres}: GenreProps) {   
    return (
        <div className="w-full flex items-center justify-center sm:justify-start flex-wrap gap-2 mt-4 mb-4">
            {genres.map((genre) => (
                <Link href={`/search/genres/${genre.slug}`} key={genre.id} >
                    <span className="bg-rose-600 px-3 py-1 text-white font-semibold rounded-lg text-xs md:text-sm hover:scale-105 cursor-pointer transition-all">
                        {genre.name}
                    </span>
                </Link>
            ))}
        </div>
    )    
}