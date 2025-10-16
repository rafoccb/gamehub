"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Trophy } from "lucide-react"
import { GameAchievements } from "@/app/types/type"
import { span } from "framer-motion/client"

type AchievementsProps = {
    achievements: GameAchievements[]
}

export default function Achievements({achievements}: AchievementsProps) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="w-full space-y-2 mt-8 bg-stone-950 rounded-3xl">
            <div className="w-full flex flex-col items-center justify-center gap-2 mt-6" onClick={() => setIsOpen(!isOpen)}>
                <span className="text-center mt-6"><Trophy size={24} /></span>       
                {
                    achievements.length <= 0 ? (
                        <p className="text-center text-sm mt-2 mb-6 text-yellow-500 font-medium ">
                            Ops! This game doesn`t have achievements or isn`t available yet.
                        </p> 
                    ) : ( 
                        <div className="w-full mt-1 flex flex-col items-center justify-center gap-1 mb-6">
                            <span className="text-center text-sm mt-2">
                                Click to expand the list of achievements of this game. 
                            </span>
                            <span className="bg-rose-600 text-white text-center font-semibold text-xs mt-2 p-2 rounded-sm cursor-pointer">{isOpen ? "Fechar" : "Mostrar"}</span>
                        </div>
                    )
                }
            </div>

            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="w-full px-6 py-4 bg-stone-950 rounded-3xl "
                > 
                    <div className="w-full overflow-y-auto max-h-[60vh] shadow-inner pr-2 scroll-achievements">
                        {achievements.map((achievement) => (
                            <div className="w-full px-2 py-4 flex items-center justify-start md:justify-center gap-4 relative z-10 mt-4 shadow-amber-500 shadow-xs rounded-xl bg-zinc-900" 
                                key={achievement.id}
                            >
                                <div className="absolute z-20 top-1 right-4">
                                    <span className="p-1 w-fit font-semibold text-xs bg-amber-400 rounded-lg text-stone-800">{achievement.percent}% got this</span>
                                </div>
                                <Image 
                                    src={achievement.image}
                                    alt={achievement.name}
                                    width={72}
                                    height={72}
                                    className="w-full max-w-[72px] object-contain rounded-lg shadow-lg"
                                />
                                <div className="w-full">
                                    <h2 className="text-yellow-500 font-semibold text-base text-start">{achievement.name}</h2>
                                    <p className="text-gray-400 font-medium text-sm text-start">{achievement.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}