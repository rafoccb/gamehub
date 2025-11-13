"use client"
import { supabase } from "@/api/supabaseClient";
import { Heart, HeartCrack } from "lucide-react";
import { useEffect, useState } from "react";

interface AddFavoriteProps {
    gameId: number
    gameName: string
    gameSlug: string
    gameImage: string
}


export default function AddFavorite({ gameId, gameName, gameSlug, gameImage }: AddFavoriteProps) {
    const [favorite, setFavorite] = useState<number | null>(null)

    useEffect(() => {
        const fetchFavorite = async () => {
            const { data: {user} } = await supabase.auth.getUser()
            if(!user) return

            const { data, error } = await supabase
                .from("favorites")
                .select("game_id")
                .eq("user_id", user.id)
                .eq("game_id", gameId)
                .maybeSingle()

            if(!error && data) { 
                setFavorite(data.game_id)
            } else {
                setFavorite(null)
            }
        }

        fetchFavorite()
    },[gameId])

    const handleFavorite = async () => {
        const { data: {user} } = await supabase.auth.getUser()
        if(!user) {
            alert("faça login primeiro")
            return
        }

        if(favorite) {
            const { error } = await supabase
                .from("favorites")
                .delete()
                .eq("user_id", user.id)
                .eq("game_id", gameId)

            if(!error) setFavorite(null)
        } else {
            const { error } = await supabase
                .from("favorites")
                .insert({user_id: user.id, game_id: gameId, name: gameName, slug: gameSlug, background_image: gameImage})

            if(!error) setFavorite(gameId)
        }
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