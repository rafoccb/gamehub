import { LucideIcon } from "lucide-react"

interface GameButtonProps {
    label: string
    icon: LucideIcon
    onClick?: () => void
}

export default function GameButton({label, icon: Icon, onClick} : GameButtonProps) {
    return (
         <button 
            onClick={onClick}
            className="px-4 py-2 text-xs sm:text-sm bg-zinc-600/20 border border-yellow-400/40 rounded-xl hover:bg-indigo-900/40 transition-all cursor-pointer hover:scale-105 flex items-center justify-center gap-1">
            <Icon size={12} /> {label}
        </button>
    )
}