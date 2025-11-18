"use client"
import { useState, useEffect } from 'react'
import { supabase } from "@/api/supabaseClient"
import { Flag, Gamepad2, Eye, Meh, LucideIcon } from "lucide-react"
import GameButton from "./GameButton"
import { BondType, useGame } from '@/app/hooks/useGame'
import AddPlatinum from './AddPlatinum'


interface BondButtonsProps {
    gameId: number
    gameName: string
    gameSlug: string
    gameImage: string
    gameDate: string
}

export default function BondButtons({ gameId, gameName, gameSlug, gameImage, gameDate } : BondButtonsProps) {
    // const [bond, setBond] = useState<string | null>(null)

    // // console.log(supabase)

    // useEffect(()=> {
    //     const fetchBond = async () => {
    //         const { data: {user} } = await supabase.auth.getUser()
    //         console.log(user)
    //         if(!user) return

    //         const {data, error } = await supabase
    //             .from("user_games")
    //             .select("*")
    //             .eq("user_id", user.id)
    //             .eq("game_id", gameId)
    //             .maybeSingle()
            
    //         if(!error && data) setBond(data.bond)
    //     }
        
    //     fetchBond()
    // }, [gameId])


    // const handleSaveBond = async (type: string) => {
    //     const { data: {user} } = await supabase.auth.getUser()
    //     if(!user) {
    //         alert("faça login primeiro")
    //         return
    //     }

    //     if(bond === type) {
    //         await supabase
    //             .from("user_games")
    //             .update({  bond: null })
    //             .eq("user_id", user.id)
    //             .eq("game_id", gameId)

    //         setBond(null)
    //         return
    //     }

    //     setBond(type)

    //     const { error } = await supabase
    //         .from("user_games")
    //         .upsert(
    //             { 
    //                 user_id: user.id, 
    //                 game_id: gameId, 
    //                 slug: gameSlug, 
    //                 name: gameName, 
    //                 background_image: gameImage,
    //                 released: gameDate, 
    //                 bond: type,
    //             },
    //             { onConflict: "user_id, game_id" }
               
    //         )
            

    //     if(!error) {
    //         setBond(type)
    //     }
    // }
    
    // console.log(bond)

    const { bond, setBond } = useGame(gameId, {
        name: gameName,
        slug: gameSlug,
        background_image: gameImage,
        released: gameDate,
    })

    function handleSaveBond(type: BondType | null) {
        if (bond === type) {
            setBond(null)
        } else {
            setBond(type)
        }
    }

    const labels: {label: BondType; icon: LucideIcon}[] = [
       { label: "Beaten", icon: Flag},
       { label: "Wishlist", icon: Eye },
       { label: "Playing", icon: Gamepad2 },
       { label: "Dropped", icon: Meh },
    ]

    return (
        <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-1">
            {labels.map(({label, icon}) => (
                <GameButton key={label}
                    label={label}
                    icon={icon}
                    active={bond === label}
                    onClick={() => handleSaveBond(label)}
                />
            ))}

            {bond ? 
                <AddPlatinum gameId={gameId} />
                : null
            }
        </div>
    )
}