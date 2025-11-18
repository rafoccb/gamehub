"use client"
import { supabase } from "@/api/supabaseClient"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import { Columns3, Eye, Flag, Gamepad2, Heart, LayoutGrid, LayoutList, Meh, Square } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import BondIcon from "./components/BondIcon"
import { UserGame } from "../hooks/useGame"

type ViewMode = "grid" | "big" | "compact" | "details"

type FavoriteGame = {
  game_id: number
  name: string
  slug: string
  background_image: string
  created_at: string
}

const VIEWMODE_STYLES = {
    grid: {
        container: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
        card: "flex flex-wrap items-center gap-4 p-3",
        image: "w-full h-48",
        text: "text-sm sm:text-base",

    },
    big: {
        container: "grid grid-cols-1 md:grid-cols-2 items-center gap-4 p-3",
        card: "flex flex-wrap items-center gap-4 p-3",
        image: "w-full h-[360px]",
        text: "text-sm sm:text-base",
    },
    compact: {
        container: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-3",
        card: "flex flex-wrap items-center gap-4 p-3",
        image: "w-full h-[270px]",
        text: "text-xs sm:text-sm",
    },
    details: {
        container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3",
        card: "flex items-center gap-4 p-3",
        image: "w-24 h-24",
        text: "flex flex-col text-start"
    }
}

export default function Hub(){
    const [viewMode, setViewMode] = useState<ViewMode>("grid")
    const [games, setGames] = useState<UserGame []>([])
    const [total, setTotal] = useState(0)
    const [visibleCount, setVisibleCount] = useState(18)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    useEffect(()=> {
        const fetchGames = async () => {
            setIsLoading(true)
            const { data: {user} } = await supabase.auth.getUser()
            setUser(user)

            if(!user) {
                setGames([])
                setTotal(0)
                setIsLoading(false)
                return
            }

            const {data, error } = await supabase
                .from("user_games")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })
            
            if(error || !data) {
                console.error("Error fetching games ", error)
                setGames([])
                setTotal(0)
                setIsLoading(false)
                return
            }

            setTotal(data.length)

            const sliced = data.slice(0, visibleCount)
            setGames(sliced)
            setIsLoading(false)
        }     
        fetchGames()
    }, [visibleCount])

    const modes = [
        {icon: LayoutGrid, mode: "grid"},
        {icon: Square, mode: "big"},
        {icon: Columns3, mode: "compact"},
        {icon: LayoutList, mode: "details"}
    ]

    return(
        <>
            <Header />
                <main className="w-full max-w-[1280px] m-auto py-12">
                    <div className="w-full max-w-[1280px] min-h-screen text-zinc-200 px-6 py-10">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
                                My Game Hub
                            </h1>

                            {!isLoading && user && games.length > 0 &&  (
                                <div className="flex gap-2">
                                    {modes.map(({ icon: Icon, mode }) => (
                                        <button
                                        key={mode}
                                        onClick={() => setViewMode(mode as ViewMode)}
                                        className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer
                                            ${
                                            viewMode === mode
                                                ? "bg-rose-900/70 border-rose-400 scale-105"
                                                : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                                            }`}
                                        >
                                        <Icon size={18} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {!isLoading && !user && (
                            <div className="w-full m-auto py-8 flex flex-col items-center justify-center gap-2">
                                <p>You must be logged in to see your game collection.</p>

                                <Link href="/teste" className="text-sm md:text-base bg-rose-600 p-2 text-white font-semibold rounded-sm hover:brightness-110 hover:shadow-sm hover:shadow-rose-200/20 mt-2">
                                    Login
                                </Link>
                            </div>
                        )}

                        {!isLoading && games.length === 0 && user && (
                            <div className="w-full m-auto py-8 flex flex-col items-center justify-center gap-2">
                                <p> You don`t have any game interaction yet. How about start adding some? </p>
                                <Link href="/search/" className="text-sm md:text-base bg-yellow-400 p-2 text-black font-semibold rounded-sm hover:brightness-110 hover:shadow-sm hover:shadow-yellow-200/20 mt-2"
                                    >Take me there
                                </Link>
                            </div>
                            )
                        }


                        {/* Lista com animações */}
                        <motion.div
                            layout
                            className={`grid gap-4 ${VIEWMODE_STYLES[viewMode].container}`}
                        >
                            <AnimatePresence>
                            {games.map((game) => (
                                <motion.div
                                    key={game.game_id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                    className={`rounded-xl border overflow-hidden bg-zinc-900/60 backdrop-blur-sm cursor-pointer
                                        border-zinc-700 hover:border-rose-400/60 transition-all duration-300 hover:bg-rose-900/20
                                        ${VIEWMODE_STYLES[viewMode].card}`}
                                >  
                                    <Link href={`/game/${game.slug}`} className={`w-full ${ 
                                            viewMode === "details"
                                            ? "flex items-center justify-start gap-4 p-3 w-full"
                                            : "p-0" 
                                    }`}>
                                        <div className="w-full relative">
                                            <Image
                                                src={game.background_image ?? ""}
                                                alt={game.name ?? "Game Cover"}
                                                width={600}
                                                height={600}
                                                className={`object-cover rounded-md transition-all duration-300
                                                ${VIEWMODE_STYLES[viewMode].image}`}
                                            />
                                            {viewMode === "details"
                                                ? ""
                                                :   
                                                <div className="absolute right-4 top-6 flex flex-col items-center justify-center gap-3">
                                                    <div className="">
                                                        <BondIcon type={game.bond} />
                                                        {game.favorite && (
                                                            <div className="flex items-center justify-center gap-1 py-1 px-2 bg-gradient-to-br from-red-700/70 to-red-900/70 text-white rounded-md shadow-[0_0_12px_rgba(255,0,0,0.4)] backdrop-blur-sm mt-1">
                                                                <Heart size={18} />
                                                            </div>
                                                        )}
                                                    </div>  
                                                </div>
                                                }
                                        </div>

                                        {viewMode === "details"
                                            ?   <div className="absolute right-4 top-6 flex flex-col items-center justify-center gap-3">
                                                    <div className="">
                                                        <BondIcon type={game.bond} />
                                                    </div>  
                                                </div>
                                            :  ""
                                        }
                                       

                                        <div className={`transition-all duration-300 ${
                                            viewMode === "grid" 
                                                ? "p-1" 
                                                : ""
                                            }`}
                                        >
                                            <h2 className={`font-medium text-center mt-1 ${VIEWMODE_STYLES[viewMode].text}`}
                                            >   
                                                {game?.name}
                                                { viewMode === "details" && (
                                                    <button className="mt-1 text-xs bg-rose-500/90 w-fit py-1 px-2 font-medium rounded-xl shadow-lg shadow-rose-300/20"> 
                                                        See More
                                                    </button> 
                                                )
                                                    
                                                }
                                            </h2>

                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                            </AnimatePresence>
                        </motion.div> 

                        <div className="w-full m-auto flex items-center justify-center">
                            {!isLoading && visibleCount < total && (
                                <button
                                    onClick={() => setVisibleCount(next => next + 12)}
                                    className="px-4 py-2 mt-4 bg-yellow-500 text-black font-semibold rounded-lg cursor-pointer hover:brightness-110 hover:shadow hover:shadow-yellow-600/20"
                                >
                                    Load More
                                </button>
                            )}
                        </div>

                        <div className="w-full m-auto flex items-center justify-center py-12">
                            {isLoading && 
                                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#eab308]"></div>
                            }
                        </div>
                    </div>
                </main>
            <Footer />
        </>
    )
}