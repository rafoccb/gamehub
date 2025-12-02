"use client"

import { supabase } from "@/api/supabaseClient"
import { useEffect, useState } from "react"

interface ReviewProps {
    gameId: number
}

export default function Review({ gameId }: ReviewProps) {
    const [userId, setUserId] = useState<string | null>(null)
    const [review, setReview] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const MY_USER_ID = process.env.NEXT_PUBLIC_OWNER_ID

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser()
            setUserId(data?.user?.id ?? null)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        if (!userId || userId !== MY_USER_ID) return
        fetchReview()
    }, [userId])

    const fetchReview = async () => {
        setLoading(true)

        const { data, error } = await supabase
            .from("user_games")
            .select("review")
            .eq("game_id", gameId)
            .eq("user_id", userId)
            .single()

        if (!error && data?.review) setReview(data.review)

        setLoading(false)
    }

    const saveReview = async () => {
        if (!userId) return
        setSaving(true)

        const { error } = await supabase
            .from("user_games")
            .update({ review })
            .eq("game_id", gameId)
            .eq("user_id", userId)

        setSaving(false)

        if (error) {
            console.error("Failed to save review", error)
            alert("Something went wrong saving your review.")
        }
    }

    if (!userId || userId !== MY_USER_ID) return null

    return (
        <div className="w-full mt-6 rounded-xl p-4 border border-zinc-700 shadow-lg bg-yellow-400/90">
            <h2 className="text-xl font-semibold mb-3 text-black tracking-wide">
                My Personal Review 🇧🇷
            </h2>

            {loading ? (
                <p className="text-zinc-400">Loading your words…</p>
            ) : (
                <div className="w-full flex flex-col items-start justify-start">
                    <textarea
                        className="w-full p-4 resize-none overflow-y-auto bg-zinc-800 border-zinc-700 text-zinc-200 focus-visible:ring-yellow-500 min-h-[260px]"
                        placeholder="O que achei disso... "
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <button
                        className="mt-3 bg-zinc-900 text-yellow-400 p-3 rounded-xl cursor-pointer"
                        onClick={saveReview}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Review"}
                    </button>
                </div>
            )}
        </div>
    )
}
