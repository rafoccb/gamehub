"use client"
import { useGame } from "@/app/hooks/useGame";
import { Heart, HeartOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"

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
        <div className="w-fit px-2 py-1 bg-red-600 flex items-center justify-center rounded-2xl">
            <button
                onClick={handleFavorite}
                className="w-full flex items-center justify-center gap-1 px-1 py-0 md:px-2 md:py-2 cursor-pointer group"
            >
                {/* <span className="hidden group-hover:block transition-all font-semibold italic text-xs">
                    {favorite ? "Remove Favorite" : "Add to favorites"}
                </span> */}

                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        title={favorite ? "Remove Favorite" : "Add to Favorites"}
                        key={favorite ? "fav" : "not-fav"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }}
                    >
                        {favorite 
                            ? <HeartOff strokeWidth={2} color="#FFFFFF" size={24} />
                            : <Heart strokeWidth={2} color="#FFFFFF" size={24} />
                        }
                    </motion.span>
                </AnimatePresence>
            </button>
        </div>
    )
}