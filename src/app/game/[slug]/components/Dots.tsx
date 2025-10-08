import { Dispatch, SetStateAction } from "react";
import { ScreenshotImage } from "../types/screenshot";

type DotsProps= {
    imgIndex: number;
    setImgIndex: Dispatch<SetStateAction<number>>;
    screenshots: ScreenshotImage
}

export default function Dots ({imgIndex, setImgIndex, screenshots}: DotsProps) {
    return(
        <div className="mt-4 flex justify-end w-full gap-2">
            {screenshots.results.map((img, index) => {
                return <button 
                    key={index} 
                    onClick={() => setImgIndex(index)} 
                    className={`h-3 w-3 rounded-full transition-colors ${index === imgIndex ? "bg-yellow-500" : "bg-zinc-400"}`}>
                    </button>
            })}
        </div>
    )
}