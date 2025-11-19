"use client"
import { Meh, LucideIcon, Laugh, Smile, Frown, Angry } from "lucide-react"
import { RatingType, useGame } from '@/app/hooks/useGame'
import RatingButton from "./RatingButton"


interface UserRatingsProps {
    gameId: number
    gameName: string
    gameSlug: string
    gameImage: string
    gameDate: string
}

export default function UserRatings({ gameId, gameName, gameSlug, gameImage, gameDate } : UserRatingsProps) {
    const { rating, setRating } = useGame(gameId, {
        name: gameName,
        slug: gameSlug,
        background_image: gameImage,
        released: gameDate,
    })

    function handleSaveRating(type: RatingType | null) {
        if (rating === type) {
            setRating(null)
        } else {
            setRating(type)
        }
    }

    const labels: {label: RatingType; icon: LucideIcon; base: string; inactive: string; hover: string; border: string}[] = [
        { label: "Very Good", icon: Laugh, base: "bg-emerald-800", inactive: "bg-emerald-800/20", hover: "hover:bg-emerald-800", border: "border-emerald-800", },
        { label: "Good", icon: Smile, base: "bg-lime-600", inactive: "bg-lime-600/20", hover: "hover:bg-lime-600", border: "border-lime-800", },
        { label: "Regular", icon: Meh, base: "bg-yellow-700", inactive: "bg-yellow-600/20", hover: "hover:bg-yellow-700", border: "border-yellow-800", },
        { label: "Bad", icon: Frown, base: "bg-indigo-600", inactive: "bg-indigo-700/20", hover: "hover:bg-indigo-600", border: "border-indigo-800", },
        { label: "Very Bad", icon: Angry, base: "bg-red-900", inactive: "bg-red-900/20", hover: "hover:bg-red-900", border: "border-red-800", },
    ]

    return (
        <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-1">
            {labels.map(({label, icon, base, hover, border, inactive}) => (
                <RatingButton key={label}
                    base={base}
                    hover={hover}
                    border={border}
                    inactive={inactive}
                    label={label}
                    icon={icon}
                    active={rating === label}
                    onClick={() => handleSaveRating(label)}
                />
            ))}
        </div>
    )
}