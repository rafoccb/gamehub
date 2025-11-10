import { LucideIcon } from "lucide-react"

interface GameButtonProps {
    label: string
    icon: LucideIcon
    active?: boolean
    onClick: () => void
}

export default function GameButton({ label, icon: Icon, active, onClick }: GameButtonProps){
    return(
        <button
            onClick={onClick}
            className={`px-4 py-2 flex items-center justify-center gap-1 text-xs sm:text-sm 
                transition-all cursor-pointer hover:bg-rose-900/40 hover:scale-105 
                ${active
                    ? "bg-rose-900/80 scale-105 border-rose-400/80 rounded-xl shadow-lg"
                    : "bg-zinc-600/20 border border-rose-400/40 rounded-xl hover:bg-rose-900/40 hover:scale-105 font-medium"}`}
        >
            <Icon size={16} />
            {label}
            
        </button>
    )
}