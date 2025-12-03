import { Eye, Flag, Gamepad2, LucideIcon, ThumbsDown } from "lucide-react"

const bondIcons: Record<string, LucideIcon> = {
    Beaten: Flag,
    Wishlist: Eye,
    Playing: Gamepad2,
    Dropped: ThumbsDown,
} 

export default function BondIcon({ type }: {type?: string | null | undefined}) {
    if(!type) return null
    const Icon = bondIcons[type]

    return(
        <div className="flex items-center justify-center gap-1 py-1 px-2 bg-gradient-to-br from-violet-700/70 to-violet-900/70 text-white rounded-md shadow-[0_0_12px_rgba(123,0,247,0.4)] backdrop-blur-sm mt-1"
            title={type.charAt(0).toUpperCase() + type.slice(1)}
        >
            <Icon size={18} />
        </div>
        
    )
}