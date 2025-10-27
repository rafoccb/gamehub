import { GameSeriesType } from "@/app/types/type"
import Image from "next/image"
import Link from "next/link"

type GameSeriesProps = {
    gameSeries: GameSeriesType
}

export default function GameSeries({gameSeries}: GameSeriesProps) {
    return(
        <div className="w-full mt-8">
            <div className="w-full py-2 px-6 rounded-2xl bg-gradient-to-r from-yellow-500/70 from-10% via-rose-900/40 via-30% to-zinc-900 to-40% shadow-xl shadow-zinc-900">
                <h1 className="text-base md:text-lg font-bold text-white text-start">Games of the same series: </h1>
            </div>
            <div className="w-full bg-neutral-950 mt-4 rounded-2xl p-4 overflow-x-auto scroll-achievements">
                <div className="flex items-start justify-start gap-4">
                    {gameSeries.count <= 0 && (
                        <p className="text-gray-400 text-sm italic">
                            This game doesn`t have other game part of the same series.
                        </p>
                    )}
                    {gameSeries.count > 0 && gameSeries.results.map((serie) => (
                        <div className="w-xs flex-shrink-0 flex flex-col items-start justify-start gap-2 relative z-10 mt-4" key={serie.id}>
                            <Link href={`/game/${serie.slug}`}>
                                <div className="absolute top-2 right-2 z-20 w-fit p-2 bg-rose-500 rounded-xl">
                                    <span className="text-white flex items-center justify-center gap-1 font-semibold text-xs">
                                        {serie.rating} / 5
                                    </span>
                                </div>
                                <Image 
                                    src={serie.background_image}
                                    alt={serie.name}
                                    width={320}
                                    height={180}
                                    className="w-xs object-cover h-[180px] rounded-xl shadow-lg hover:brightness-70 hover:scale-105"
                                />
                            </Link>
                            <div className="w-full flex items-start justify-between gap-2">
                                <h1 className="text-white text-lg md:text-xl font-semibold mt-2">{serie.name}</h1>
                                <span className="text-gray-400 text-xs md:text-sm text-start mt-3">
                                    {new Date(serie.released).toLocaleDateString('en-US')}
                                </span>
                            </div>
                            
                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                <div className="w-full flex flex-wrap items-start justify-start gap-2 mt-2 mb-2">
                                    {serie.genres.map((genre) => (
                                        <div className="w-fit px-3 bg-zinc-700 rounded-xl cursor-pointer hover:bg-yellow-500" key={genre.id}> 
                                            <Link href={`/genres/${genre.slug}`} className="font-semibold text-white text-xs"> {genre.name}</Link>
                                        </div> 
                                    ))}
                                </div>
                                <Link href={`/game/${serie.slug}`}>
                                    <span className="bg-rose-600 p-2 text-center text-white text-xs rounded-xl font-bold"> See more</span>
                                </Link>
                            </div>
                                   
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}