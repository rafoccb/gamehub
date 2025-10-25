import { GameAdditions } from "@/app/types/type"
import Image from "next/image"
import Link from "next/link"

type AdditionProps = {
    additions: GameAdditions
}

export default function Addition({additions}: AdditionProps) {

    return (
        <div className="w-full mt-8">
            <div className="w-full py-2 px-6 rounded-2xl bg-gradient-to-r from-yellow-500/70 from-10% via-rose-900/40 via-30% to-zinc-900 to-40% shadow-xl shadow-zinc-900">
                <h1 className="text-base md:text-lg font-bold text-white text-start">Game DLCs, Special Editions or Companion Apps: </h1>
            </div>
              <div className="w-full bg-neutral-950 mt-4 rounded-2xl p-4 overflow-x-auto scroll-achievements">
                <div className="flex items-start justify-start gap-4">
                    {additions.count <= 0 && (
                        <p className="text-gray-400 text-sm italic">
                            This game doesn`t have any additions.
                        </p>
                    )}
                    
                    {additions.count > 0 && additions.results.map((addition) => (
                        <div className="w-xs flex-shrink-0 flex flex-col items-start justify-start gap-2 relative z-10 mt-4" key={addition.id}>
                            <Link href={`/game/${addition.slug}`}>
                                <div className="absolute top-2 right-2 z-20 w-fit p-2 bg-rose-500 rounded-xl">
                                    <span className="text-white flex items-center justify-center gap-1 font-semibold text-sm">
                                        {addition.rating} / 5
                                    </span>
                                </div>
                                <Image 
                                    src={addition.background_image}
                                    alt={addition.name}
                                    width={320}
                                    height={180}
                                    className="w-xs object-cover h-[180px] rounded-xl shadow-lg"
                                />
                                <h1 className="text-white text-lg md:text-xl font-semibold">{addition.name}</h1>
                                <p className="text-gray-400 text-xs md:text-sm text-start mt-1">
                                    {new Date(addition.released).toLocaleDateString('en-US')}
                                </p>
                                <button className="bg-rose-600 p-2 text-center text-white text-xs rounded-xl font-bold mt-2"> See more</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}