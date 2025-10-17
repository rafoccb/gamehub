import { Dispatch, SetStateAction } from "react";
import { GameMovies, GameMoviesResults, Screenshot, ScreenshotImage } from "../../../types/type";


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
    dots: DotsObject
}

export default function Dots ({indexObject, setIndexObject, dots}: DotsProps) {
    return(
        <div className="mt-4 flex justify-end w-full gap-2">
            {dots.results.map((img, index) => {
                return <button 
                    key={index} 
                    onClick={() => setIndexObject(index)} 
                    className={`h-3 w-3 rounded-full transition-colors ${index === indexObject ? "bg-yellow-500" : "bg-zinc-400"}`}>
                </button>
            })}
        </div>
    )
}