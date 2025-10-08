import { LucideIcon } from "lucide-react";

type SlideButtonProps = {
    onClick: () => void;
    icon: LucideIcon
}

export default function SlideButton({onClick, icon: Icon}: SlideButtonProps) {
    return (
        <button onClick={onClick} className="w-9 h-9 md:w-12 md:h-12 bg-transparent border border-solid border-yellow-500 p-1 flex items-center justify-center cursor-pointer rounded-lg hover:bg-yellow-500/10">
            <Icon size={24} color="#ffdf20" strokeWidth={3}/>
        </button>
    )
}