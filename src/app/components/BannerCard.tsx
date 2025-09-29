"use client"

import Image from "next/image";
import { getGamesForBanner } from "@/services/banner";
import { useEffect, useState } from "react";

export default function BannerCard() {
  type GameType = {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
  }

  const [games, setGames] = useState<GameType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const results = await getGamesForBanner()
        setGames(results);
      } catch (error) {
        console.error("Erro ao buscar jogos:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGames()
  }, [])

  if(isLoading) return <p className="text-center"> <span className="animate-spin"></span> Carregando jogos </p>
    return (
        <div className="font-sans mt-[64px] md:mt-0">
            <div className="w-full p-4 flex items-center justify-center">
                {games.map((game, index) => (
                    <div key={game.id} className="w-full max-w-sm flex flex-col items-center justify-center"> 
                        <Image 
                          src={game.background_image} 
                          alt="Games" 
                          width={192}
                          height={250}
                          className={`w-full max-w-48 h-[200px] md:h-[250px] mt-8 md:mt-0 object-cover rounded-3xl shadow-zinc-950 shadow-lg ${index === 1 ? 'scale-150' : ''}`}
                          />
                    </div>
                ))}
            </div>
        </div>
    )
}