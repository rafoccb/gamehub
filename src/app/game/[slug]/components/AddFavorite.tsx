import { Heart } from "lucide-react";

export default function AddFavorite() {
    return (
        <div className="w-fit h-6 py-3 bg-red-600  flex items-center justify-center rounded-2xl">
            <button className="w-full flex items-center justify-center gap-1 px-1 py-0 md:px-2 md:py-2 cursor-pointer">
                <span className="hidden group-hover:block transition-all font-semibold italic text-xs">Add to favorites</span>
                <Heart strokeWidth={2} color="#FFFFFF" className="w-[16px] h-[16px]"/>
            </button>
        </div>
    )
}