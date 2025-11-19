import clsx from "clsx"
import { LucideIcon } from "lucide-react"

interface RatingButtonProps {
    label: string | null | undefined
    icon: LucideIcon
    active?: boolean
    base: string
    hover: string
    border: string
    inactive: string
    onClick: () => void
}

export default function RatingButton({ label, icon: Icon, active, base, inactive, hover, border, onClick }: RatingButtonProps) {
   return (
        <button
            onClick={onClick}
            className={clsx(
                "px-4 py-2 flex items-center justify-center gap-1 text-xs sm:text-sm transition-all cursor-pointer rounded-xl",
                active
                    ? clsx(base, "scale-110 shadow-lg")
                    : clsx(inactive, hover, border, "font-medium")
            )}
        >
            <Icon size={16} />
        </button>
    )
}