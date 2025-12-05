"use client"
import { supabase } from "@/api/supabaseClient"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import { Columns3, Heart, LayoutGrid, LayoutList, PencilLine, Square, Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import BondIcon from "./components/BondIcon"
import RatingIcon from "./components/RatingIcon"
import { Bond, Rating, useGameFilters } from "../hooks/useFilteredGames"
import LoginButton from "../components/LoginButton"

type ViewMode = "grid" | "big" | "compact" | "details"
type SelectedType = "bond" | "rating" | "platinum" | "favorite"
type Sort = "name_asc" | "name_desc" |
        "released_asc" | "released_desc" |
        "created_at_asc" | "created_at_desc"


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
        card: "flex flex-wrap items-start justify-center gap-4 p-3",
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
    // hook
    const { gameList, loading, filter, setFilter, total, visibleCount, setVisibleCount, user, userTotalGames } = useGameFilters()
    const SELECT_TYPES: SelectedType[] = ["bond", "rating", "platinum", "favorite"]
    const sortOptions: Sort[] = [
        "name_asc", "name_desc",
        "released_asc", "released_desc",
        "created_at_asc", "created_at_desc"
        ]

    useEffect(() => {
        const saved = localStorage.getItem("viewMode")
        if (saved) {
            setViewMode(saved as ViewMode)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("viewMode", viewMode)
    }, [viewMode])

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
                                My Game Hub ({userTotalGames} games) <br/>
                                <span className="text-xs text-gray-500 text-start font-light">Showing 24 games or less</span>
                            </h1>

                            {!loading && user && gameList.length > 0 &&  (
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

                        {!loading && user && gameList.length > 0 &&  (
                            <div className="w-full flex flex-col lg:flex-row justify-between items-center mt-8 mb-8 gap-4">
                                {/* filters */}
                                <input
                                    type="search"
                                    placeholder="Type to search a game in your hub..."
                                    value={filter.search ?? ""}
                                    onChange={(e) => setFilter(prev => ({...prev, search: e.target.value || null}))}
                                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-grey-400 transition-all text-white bg-zinc-950 shadow-sm w-[320px]"
                                    />

                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <select
                                        value={filter.selectedType ?? ""}
                                        onChange={(e) => {
                                            const selected = e.target.value as SelectedType | "";
                                            setFilter(prev => ({
                                                ...prev,
                                                selectedType: selected || null,
                                                platinum: selected === "platinum" ? true : prev.platinum,
                                                favorite: selected === "favorite" ? true : prev.favorite,
                                            }));
                                        }}
                                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-white bg-zinc-950 shadow-sm w-40">
                                        
                                        <option value="">Filter By: (All)</option>
                                        <option value="bond">Bond</option>
                                        <option value="rating">Rating</option>
                                        <option value="platinum">Platinum</option>
                                        <option value="favorite">Favorite</option>
                                    </select>

                                    {/*if necessary  */}
                                    {filter.selectedType === "bond" && (
                                        <select
                                            onChange={(e) => {
                                                const value = e.target.value as Bond | "";
                                                setFilter(prev => ({
                                                ...prev,
                                                bond: value === "" ? null : value
                                                }));
                                            }}
                                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-white bg-zinc-950 shadow-sm w-40">
                                            <option value="">Any</option>
                                            <option value="Beaten">Beaten</option>
                                            <option value="Wishlist">Wishlist</option>
                                            <option value="Playing">Playing</option>
                                            <option value="Dropped">Dropped</option>
                                        </select>
                                    )}

                                    {filter.selectedType === "rating" && (
                                        <select
                                            onChange={(e) => {
                                                const value = e.target.value as Rating | "";
                                                setFilter(prev => ({
                                                ...prev,
                                                rating: value === "" ? null : value
                                                }));
                                            }}
                                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-white bg-zinc-950 shadow-sm w-40">

                                            <option value="">Any</option>
                                            <option value="Very Good">Very Good</option>
                                            <option value="Good">Good</option>
                                            <option value="Regular">Regular</option>
                                            <option value="Bad">Bad</option>
                                            <option value="Very Bad">Very Bad</option>
                                        </select>
                                    )}

                                    <select
                                        value={filter.sortBy ?? ""}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setFilter(prev => ({
                                            ...prev,
                                            sortBy: sortOptions.includes(value as Sort)
                                                ? value as Sort
                                                : null
                                            }))
                                        }}
                                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-white bg-zinc-950 shadow-sm w-48"
                                    >
                                        <option value="">Order</option>
                                        <option value="name_asc">Name A–Z</option>
                                        <option value="name_desc">Name Z–A</option>
                                        <option value="released_desc">Released newest</option>
                                        <option value="released_asc">Released oldest</option>
                                        <option value="created_at_desc">Added newest</option>
                                        <option value="created_at_asc">Added oldest</option>
                                    </select>
                                </div>                                       
                            {/* end filters */}
                            </div>
                        )}

                        {!loading && !user && (
                            <div className="w-full m-auto py-8 flex flex-col items-center justify-center gap-2">
                                <p>You must be logged in to see your game collection.</p>
                                <LoginButton justify="center" />
                            </div>
                        )}
                       

                        {!loading && gameList.length === 0 && user && !filter.search && (
                            <div className="w-full m-auto py-8 flex flex-col items-center justify-center gap-2">
                                <p> You don`t have any game interaction yet. How about start adding some? </p>
                                <Link href="/search/" className="text-sm md:text-base bg-yellow-400 p-2 text-black font-semibold rounded-sm hover:brightness-110 hover:shadow-sm hover:shadow-yellow-200/20 mt-2"
                                    >Take me there
                                </Link>
                            </div>
                            )
                        }

                        {!loading && gameList.length === 0 && user && filter.search && (
                            <div className="w-full m-auto py-8 flex flex-col items-center justify-center gap-2">
                                <p>No results found for <span className="text-yellow-600 font-semibold"> {filter.search} </span> . Try another search.</p>
                            </div>
                            )}
                        
                        <motion.div
                            layout
                            className={`grid gap-4 ${VIEWMODE_STYLES[viewMode].container}`}
                        >
                            <AnimatePresence>
                            {gameList.map((game) => (
                                <motion.div
                                    key={game.game_id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.55, y: -100 }}
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
                                        <div className="relative">
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
                                                <div className="absolute right-2 top-4 flex flex-col items-center justify-center gap-1">
                                                    <div className="">
                                                        <BondIcon type={game.bond} />
                                                        {game.favorite && (
                                                            <div className="flex items-center justify-center gap-1 py-1 px-2 bg-gradient-to-br from-red-700/70 to-red-900/70 text-white rounded-md shadow-[0_0_12px_rgba(255,0,0,0.4)] backdrop-blur-sm mt-1">
                                                                <Heart size={18} />
                                                            </div>
                                                        )}
                                                        {game.platinum && (
                                                            <div className="flex items-center justify-center gap-1 py-1 px-2 bg-gradient-to-br from-yellow-500/80 to-yellow-700/70 text-white rounded-md shadow-[0_0_12px_rgba(242, 242, 26,0.4)] backdrop-blur-sm mt-1">
                                                                <Trophy size={18} />
                                                            </div>
                                                        )}
                                                        <RatingIcon type={game.rating} />
                                                        {game.review && (
                                                            <div className="flex items-center justify-center gap-1 py-1 px-2 bg-gradient-to-br from-stone-500/80 to-stone-700/70 text-white rounded-md shadow-[0_0_12px_rgba(99, 99, 99, 0.4)] backdrop-blur-sm mt-1">
                                                                <PencilLine size={18} />
                                                            </div>
                                                        )}
                                                    </div>  
                                                </div>
                                                }
                                        </div>

                                       

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

                                            {viewMode === "details" && (
                                            <div className="flex items-center justify-start gap-1 mt-2">
                                                <div className="">
                                                    <BondIcon type={game.bond} />
                                                </div>
                                                {game.favorite && (
                                                    <div className="flex items-center justify-center gap-1 py-1 px-2 bg-gradient-to-br from-red-700/70 to-red-900/70 text-white rounded-md shadow-[0_0_12px_rgba(255,0,0,0.4)] backdrop-blur-sm mt-1">
                                                        <Heart size={18} />
                                                    </div>
                                                )}
                                                 {game.platinum && (
                                                    <div className="flex items-center justify-center gap-1 py-1 px-2 bg-gradient-to-br from-yellow-500/80 to-yellow-700/70 text-white rounded-md shadow-[0_0_12px_rgba(242, 242, 26,0.4)] backdrop-blur-sm mt-1">
                                                        <Trophy size={18} />
                                                    </div>
                                                )}
                                                <RatingIcon type={game.rating} />
                                                {game.review && (
                                                    <div className="flex items-center justify-center gap-1 py-1 px-2 bg-gradient-to-br from-stone-500/80 to-stone-700/70 text-white rounded-md shadow-[0_0_12px_rgba(99, 99, 99, 0.4)] backdrop-blur-sm mt-1">
                                                        <PencilLine size={18} />
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                            </AnimatePresence>
                        </motion.div> 

                        <div className="w-full m-auto flex items-center justify-center">
                            {!loading && visibleCount < total && (
                                <button
                                    onClick={() => setVisibleCount(next => next + 12)}
                                    className="px-4 py-2 mt-4 bg-yellow-500 text-black font-semibold rounded-lg cursor-pointer hover:brightness-110 hover:shadow hover:shadow-yellow-600/20"
                                >
                                    Load More
                                </button>
                            )}
                        </div>

                        <div className="w-full m-auto flex items-center justify-center py-12">
                            {loading && 
                                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#eab308]"></div>
                            }
                        </div>
                    </div>
                </main>
            <Footer />
        </>
    )
}