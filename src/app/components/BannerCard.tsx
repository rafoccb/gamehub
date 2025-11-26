"use client"
import { Banner } from "../types/type";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AUTO_DELAY = 5000;

export default function BannerCard({ gamesBanner }: { gamesBanner: Banner[] }) {
    const [displayList, setDisplayList] = useState(gamesBanner);

	function rotationQueue() {
		setDisplayList(prev => {
			if (!prev || prev.length === 0) return prev;
			return [...prev.slice(1), prev[0]] // ROTACIONA AS POSIÇÕES
		});
	}

    useEffect(() => {
        const interval = setInterval(() => rotationQueue(), AUTO_DELAY);
        return () => clearInterval(interval);
    }, []);
	
	const visibleGames = displayList.slice(0, 3)

    return (
        <div className="font-sans mt-[64px] md:mt-0">
            <div className="w-full p-4 flex items-center justify-center gap-6">
                
                {visibleGames.map((game, index) => (
                    <motion.div
						key={game.id}
						className={`
							w-[192px] h-[250px] rounded-3xl bg-cover bg-center 
                            shadow-lg transition-transform
						`}
						style={{ backgroundImage: `url(${game.background_image})` }}
						animate={{
							width: index === 1 ? 220 : 192,
							opacity: index === 1 ? 1 : 0.45,
							scale: index === 1 ? 1.5 : 1,
							zIndex: index === 1 ? 10 : 1,
						}}
						transition={{
							type: "spring",
                            stiffness: 220,
                            damping: 26,
						}}
					/>

                ))}

            </div>
        </div>
    );
}
