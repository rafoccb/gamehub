import { Meh, LucideIcon, Laugh, Smile, Frown, Angry } from "lucide-react"

const ratingIcon: Record<
  string,
  { icon: LucideIcon;  gradientFrom: string; gradientTo: string; shadowColor: string }
> = {
  "Very Good": { 
    icon: Laugh, 
    gradientFrom: "from-emerald-700/70", 
    gradientTo: "to-emerald-900/70", 
    shadowColor: "rgba(16,185,129,0.4)" 
  },
  "Good": { 
    icon: Smile, 
    gradientFrom: "from-lime-700/70", 
    gradientTo: "to-lime-900/70", 
    shadowColor: "rgba(132,204,22,0.4)" 
  },
  "Regular": { 
    icon: Meh, 
    gradientFrom: "from-yellow-600/70", 
    gradientTo: "to-yellow-800/70", 
    shadowColor: "rgba(202,138,4,0.4)" 
  },
  "Bad": { 
    icon: Frown, 
    gradientFrom: "from-indigo-700/70", 
    gradientTo: "to-indigo-900/70", 
    shadowColor: "rgba(79,70,229,0.4)" 
  },
  "Very Bad": { 
    icon: Angry, 
    gradientFrom: "from-red-700/70", 
    gradientTo: "to-red-900/70", 
    shadowColor: "rgba(220,38,38,0.4)" 
  },
}

export default function RatingIcon({ type }: { type?: string | null | undefined }) {
    if (!type) return null
    const data = ratingIcon[type]
    if (!data) return null

    const { icon: Icon, gradientFrom, gradientTo, shadowColor } = data

    return (
        <div className={`
            flex items-center justify-center gap-1 py-1 px-2 rounded-md backdrop-blur-sm mt-1
            bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white`}
            style={{ boxShadow: `0 0 12px ${shadowColor}` }}
            title={type.charAt(0).toUpperCase() + type.slice(1)}
        >
            <Icon size={18} />
        </div>
    )
}