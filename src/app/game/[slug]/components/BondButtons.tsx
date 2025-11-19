"use client"
import { Flag, Gamepad2, Eye, Meh, LucideIcon } from "lucide-react"
import GameButton from "./GameButton"
import { BondType, useGame } from '@/app/hooks/useGame'
import AddPlatinum from './AddPlatinum'


interface BondButtonsProps {
    gameId: number
    gameName: string
    gameSlug: string
    gameImage: string
    gameDate: string
}

export default function BondButtons({ gameId, gameName, gameSlug, gameImage, gameDate } : BondButtonsProps) {
    const { bond, setBond } = useGame(gameId, {
        name: gameName,
        slug: gameSlug,
        background_image: gameImage,
        released: gameDate,
    })

    function handleSaveBond(type: BondType | null) {
        if (bond === type) {
            setBond(null)
        } else {
            setBond(type)
        }
    }

    const labels: {label: BondType; icon: LucideIcon}[] = [
       { label: "Beaten", icon: Flag},
       { label: "Wishlist", icon: Eye },
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

            {bond ? 
                <AddPlatinum gameId={gameId} />
                : null
            }
        </div>
    )
}