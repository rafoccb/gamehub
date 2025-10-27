import { Dispatch, SetStateAction } from "react";
import { GameMovies, Screenshot } from "../../../types/type";


type ScreenshotDots = {
    type: "screenshots",
    results: Screenshot[]
}

type MoviesDots = {
    type: "movies",
    results: GameMovies[]
}

type DotsObject = ScreenshotDots | MoviesDots


type DotsProps= {
    indexObject: number;
    setIndexObject: Dispatch<SetStateAction<number>>;
    dots: DotsObject;
    onChange?: () => void;
}

export default function Dots ({indexObject, setIndexObject, dots, onChange}: DotsProps) {
    return(
        <div className="mt-4 flex justify-end w-full gap-2">
            {dots.results.map((img, index) => {
                return <button 
                    key={index} 
                    onClick={() => setIndexObject(index)} 
                    className={`h-3 w-3 cursor-pointer rounded-full transition-colors ${index === indexObject ? "bg-yellow-500" : "bg-zinc-400"}`}>
                </button>
            })}
        </div>
    )
}