"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getRandomGame } from "./actions/getRandomGame";

const filters = [
    {id: "recent", label: "Recent",},
    {id: "retro", label: "Retro"},
    {id: "popular", label: "Popular "},
    {id: "top", label: "Well Rated"},
]

export default function SearchButtons() {
    const router = useRouter()
    const [popup, setPopup] = useState(false)
    const [loading, setLoading] = useState(false)

    const buttonStyles: Record<string, string> = {
        retro: "retro",
        popular: "popular",
        top: "top",
        recent: "recent",
    };

    
    async function handleRandomGame(filter: string) {
        setPopup(true)
        setLoading(true)
        const game = await getRandomGame(filter)

        if(!game) return;

        router.push(`/game/${game.slug}`)
    }


    return(
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
            {filters.map((btn) => (
                <button key={btn.id}
                    onClick={() => handleRandomGame(btn.id)}
                    className={`px-5 py-2 transition-transform duration-300 ${buttonStyles[btn.id]}`}
                >
                    {btn.id === "retro" ? <div className="button-text"></div> : ""}
                    <span>{btn.label}</span>
                </button>
            ))}

             {popup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
                    <div className="text-center text-yellow-500 animate-pulse">
                        <div className="text-2xl font-bold uppercase tracking-widest mb-3">
                            Invocando o Game...
                        </div>
                        {loading && (
                            <div className="flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#eab308]"></div>
                            </div>
                        )}
                        <div className="mt-4 text-sm text-zinc-400 italic">
                            “Os portais dimensionais estão se abrindo...”
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}