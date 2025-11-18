"use client"
import { useGame } from "@/app/hooks/useGame"
import { Trophy } from "lucide-react"

interface PlatinumProps {
    gameId: number
}


export default function AddPlatinum({gameId} : PlatinumProps) {
    const { platinum, setPlatinum } = useGame(gameId)


    function handlePlatinum() {
        setPlatinum(platinum ? null : true)
    }

    return(
        <div className="w-full flex flex-col items-center justify-center gap-3 p-2"> 
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <span className="text-center mt-3 text-sm">Do you have a platinum trophy for this game?</span>
                    {!platinum ?
                        // <div className="w-full flex flex-col items-center justify-center gap-2">
                            <button onClick={handlePlatinum} className="w-fit p-2 bg-yellow-600/50 rounded-lg cursor-pointer hover:brightness-125 hover:shadow-lg hover:shadow-yellow-600/20">
                                <span className="flex items-center justify-center gap-2 text-sm font-medium"><Trophy size={14} /> Yes</span>
                            </button>
                        // </div>
                        :
                        <button onClick={handlePlatinum} className="w-fit p-2 bg-red-600/50 rounded-lg cursor-pointer hover:brightness-125 hover:shadow-lg hover:shadow-red-600/20">
                            <span className="flex items-center justify-center gap-2 text-sm font-medium">
                                Oops. I actually don`t.
                            </span>
                        </button>
                    }               
                </div>
        </div>
    )
}