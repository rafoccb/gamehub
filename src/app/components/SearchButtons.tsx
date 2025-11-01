import { Sparkles, Star, Rocket, Gamepad2 } from "lucide-react";

const filters = [
    {id: "recent", label: "Recent"},
    {id: "retro", label: "Retro"},
    {id: "popular", label: "Popular "},
    {id: "top", label: "Well Rated"},
]

export default function SearchButtons() {

    // const handleClick = (filter: string) => {
    //     onSelect(filter)
    // }

    const buttonStyles: Record<string, string> = {
        retro: "retro",
        popular: "popular",
        top: "top",
        recent: "recent",
    };

    return(
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
            {filters.map((btn) => (
                <button key={btn.id}
                    className={`px-5 py-2 transition-transform duration-300 ${buttonStyles[btn.id]}`}
                >
                    {btn.id === "retro" ? <div className="button-text"></div> : ""}
                    <span>{btn.label}</span>
                </button>
            ))}
        </div>
    )
}