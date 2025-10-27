import Link from "next/link"
import { GameDevelopers } from "../../../types/type"

type DevsProps = {
    devs: GameDevelopers[]
}

export default function Developers({devs}: DevsProps) {  
    return (
        <div className="w-full flex items-center justify-center sm:justify-start gap-1 mt-2">
            <span className="text-xs sm:text-sm text-gray-400">By:</span>
            {devs.map((dev) => (
                <Link href={`/search/developers/${dev.slug}`} key={dev.id} >
                    <div className="w-fit flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="text-xs sm:text-sm text-gray-400 underline hover:text-white cursor-pointer">{dev.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    )    
}