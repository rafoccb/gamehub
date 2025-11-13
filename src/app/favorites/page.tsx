"use client"
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { supabase } from "@/api/supabaseClient";
import { LayoutGrid, List, PanelRight, Rows3 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image";
import { getGameDetailsById } from "@/services/games";
import { Game } from "../types/type";
import { getFavoriteGames } from "../components/actions/getFavoriteGames";

type ViewMode = "grid" | "list" | "compact" | "big"

export default function Favorites(){
    const [viewMode, setViewMode] = useState<ViewMode>("grid")
    // const [favorites, setFavorites] = useState<number[]>([])
      
    const [favorites, setFavorites] = useState<Game[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadFavorites = async () => {
      const games = await getFavoriteGames(page);
      setFavorites(games);
    };

    loadFavorites();
  }, [page])

    



    const modes = [
        {icon: LayoutGrid, mode: "grid"},
        {icon: List, mode: "list"},
        {icon: Rows3, mode: "compact"},
        {icon: PanelRight, mode: "big"}
    ]

    return(
        <>
            <Header />
                <main className="">
                    <div className="w-full min-h-screen bg-zinc-950 text-zinc-200 px-6 py-10">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
                                My Favorite Games
                            </h1>

                            <div className="flex gap-2">
                                {modes.map(({ icon: Icon, mode }) => (
                                    <button
                                    key={mode}
                                    onClick={() => setViewMode(mode as ViewMode)}
                                    className={`p-2 rounded-lg border transition-all duration-300 
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
                        </div>

                        <div>
                        {favorites.map((game) => (
                            <div key={game.id}>{game.name}</div>
                        ))}
                        </div>


                        {/* Lista com animações */}
                        {/* <motion.div
                            layout
                            className={`grid gap-4 ${
                            viewMode === "grid"
                                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                                : "grid-cols-1"
                            }`}
                        >
                            <AnimatePresence>
                            {favorites.map((fav) => (
                                <motion.div
                                key={fav.game_id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                className={`rounded-xl border overflow-hidden bg-zinc-900/60 backdrop-blur-sm
                                    border-zinc-700 hover:border-rose-400/60 transition-all duration-300
                                    ${
                                    viewMode === "list"
                                        ? "flex items-center gap-4 p-3"
                                        : viewMode === "compact"
                                        ? "flex items-center gap-3 p-2"
                                        : "p-0"
                                    }`}
                                >
                                <Image
                                    src={fav.games?.background_image}
                                    alt={fav.games?.name}
                                    className={`object-cover rounded-md transition-all duration-300
                                    ${
                                        viewMode === "grid"
                                        ? "w-full h-48"
                                        : viewMode === "list"
                                        ? "w-28 h-28"
                                        : "w-20 h-20"
                                    }`}
                                />
                                <div
                                    className={`transition-all duration-300 ${
                                    viewMode === "grid" ? "p-3" : ""
                                    }`}
                                >
                                    <h2
                                    className={`font-medium ${
                                        viewMode === "compact" ? "text-xs" : "text-sm sm:text-base"
                                    }`}
                                    >
                                    {fav.games?.name}
                                    </h2>
                                </div>
                                </motion.div>
                            ))}
                            </AnimatePresence>
                        </motion.div> */}
                    </div>
                </main>
            <Footer />
        </>
    )
}