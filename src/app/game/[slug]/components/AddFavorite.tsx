"use client"
import { supabase } from "@/api/supabaseClient";
import { useGame } from "@/app/hooks/useGame";
import { Heart, HeartCrack } from "lucide-react";
import { useEffect, useState } from "react";

interface AddFavoriteProps {
    gameId: number
    gameName: string
    gameSlug: string
    gameImage: string
    gameDate: string
}


export default function AddFavorite({ gameId, gameName, gameSlug, gameImage, gameDate }: AddFavoriteProps) {
    const { favorite, setFavorite } = useGame(gameId, {
            name: gameName,
            slug: gameSlug,
            background_image: gameImage,
            released: gameDate,
        })
    
        function handleFavorite() {
            setFavorite(favorite ? null : true)
        }



    return (
        <div className="w-fit h-6 py-3 bg-red-600  flex items-center justify-center rounded-2xl">
            <button onClick={handleFavorite} className="w-full flex items-center justify-center gap-1 px-1 py-0 md:px-2 md:py-2 cursor-pointer">
                <span className="hidden group-hover:block transition-all font-semibold italic text-xs">
                    {favorite ? "Remove Favorite" : "Add to favorites"}
                </span>
                    {favorite 
                        ? <HeartCrack strokeWidth={2} color="#FFFFFF" className="w-[16px] h-[16px]"/>
                        : <Heart strokeWidth={2} color="#FFFFFF" className="w-[16px] h-[16px]"/>
                    }
            </button>
        </div>
    )
}