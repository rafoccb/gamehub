"use client"

import { supabase } from "@/api/supabaseClient"
import { useEffect, useRef, useState } from "react"

export interface UserGame {
    id?: string
    user_id: string
    game_id: number
    name?: string | null
    slug?: string | null
    background_image?: string | null
    released?: string | null
    favorite?: boolean | null
    bond?: "Beaten" | "Wishlist" | "Playing" | "Dropped" | null
    rating?: "Very Good" | "Good" | "Regular" | "Bad" | "Very Bad" | null
    platinum?: boolean | null
    created_at?: string
    updated_at?: string
}

export type BondType = UserGame["bond"];
export type RatingType = UserGame["rating"];

export function useGame(
    gameId: number,
    // Pick - selecinar algumas propriedades da tipagem
    gameInfo?: Pick<UserGame, "name" | "slug" | "background_image" | "released">
){
    const [gameUser, setGameUser] = useState<UserGame | null>(null)
    const [loading, setLoading] = useState(true)

    // Guardamos a metadata inicial aqui
    const metaRef = useRef(gameInfo)

    useEffect(() => {
        async function loadUserGame() {
            const { data: {user} } = await supabase.auth.getUser()
            if(!user) {
                setLoading(false)
                return null
            }

            const { data } = await supabase
                .from("user_games")
                .select("*")
                .eq("user_id", user.id)
                .eq("game_id", gameId)
                .maybeSingle()

            
            setGameUser(data ?? null)
            setLoading(false)
        }
        loadUserGame()
    }, [gameId])


    // T pode ser qualquer coisa de UserGame e o valor será de acordo com a tipagem
    async function updateUserGame<T extends keyof UserGame>(
        type: T, 
        value: UserGame[T],
        gameMetadata?: {
            name: string,
            slug: string,
            background_image: string,
            released: string
        }
    ) {
        const { data: {user} } = await supabase.auth.getUser()
        if(!user) return

        const metadata = gameMetadata ?? metaRef.current


        if(!gameUser) {
            if(!metadata) {
                console.error("Missing game metadata for initial insert")
                return
            }
            // Partial transforma tudo opcional
            const payload: Partial<UserGame> = {
                user_id: user.id,
                game_id: gameId,

                ...(gameInfo ?? {}),

                [type]: value
            }

            const { data, error } = await supabase
                .from("user_games")
                .insert(payload)
                .select()
                .single()

            if(!error) setGameUser(data)
            return
        }

        // if exists
        const { data, error } = await supabase
            .from("user_games")
            .update({ [type]: value })
            .eq("user_id", gameUser.user_id)
            .eq("game_id", gameId)
            .select()
            .single()

        if(!error) setGameUser(data)
    }

    function setBond(bond: UserGame["bond"]) {
        // atualizar estado para o React
        setGameUser(current => current ? {...current, bond } : current)
        updateUserGame("bond", bond)
    }

    
    function setFavorite(favorite: boolean | null) {
        setGameUser(current => current ? {...current, favorite } : current)
        updateUserGame("favorite", favorite)
    }

    
    function setRating(rating: UserGame["rating"]) {
        setGameUser(current => current ? {...current, rating } : current)
        updateUserGame("rating", rating)
    }

    
    function setPlatinum(platinum: boolean | null) {
        setGameUser(current => current ? {...current, platinum } : current)
        updateUserGame("platinum", platinum)
    }

    function toggleBond(type: BondType) {
        if (gameUser?.bond === type) {
            updateUserGame("bond", null)
        } else {
            updateUserGame("bond", type)
        }
    }

    return {
        gameUser,
        loading,
        bond: gameUser?.bond ?? null,
        favorite: gameUser?.favorite ?? null,
        rating: gameUser?.rating ?? null,
        platinum: gameUser?.platinum ?? null,
        toggleBond,
        setBond,
        setFavorite,
        setRating,
        setPlatinum
    }
}