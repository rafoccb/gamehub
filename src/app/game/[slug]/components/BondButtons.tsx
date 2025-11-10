"use client"
import { useState, useEffect } from 'react'
import { supabase } from "@/api/supabaseClient"
import { Flag, Gamepad2, Eye, Meh } from "lucide-react"
import GameButton from "./GameButton"


interface BondButtonsProps {
    gameId: number  
}

export default function BondButtons({ gameId } : BondButtonsProps) {
    const [bond, setBond] = useState<string | null>(null)

    useEffect(()=> {
        const fetchBond = async () => {
            const { data: {user} } = await supabase.auth.getUser()
            if(!user) return

            const {data, error } = await supabase
                .from("games_bond")
                .select("type")
                .eq("user_id", user.id)
                .eq("game_id", gameId)
                .maybeSingle()
            
            if(!error && data) setBond(data.type)
        }
        
        fetchBond()
    }, [gameId])


    const handleSaveBond = async (type: string) => {
        const { data: {user} } = await supabase.auth.getUser()
        if(!user) {
            alert("faça login primeiro")
            return
        }

        if(bond === type) {
            await supabase
                .from("games_bond")
                .delete()
                .eq("user_id", user.id)
                .eq("game_id", gameId)

            setBond(null)
            return
        }

        setBond(type)

        const { error } = await supabase
            .from("games_bond")
            .upsert(
                { user_id: user.id, game_id: gameId, type },
                { onConflict: "user_id,game_id" }
            )
            

        if(!error) {
            setBond(type)
        }
    }
    console.log(bond)

    const labels = [
       { label: "Beaten", icon: Flag},
       { label: "Next to play", icon: Eye },
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
        </div>
    )
}