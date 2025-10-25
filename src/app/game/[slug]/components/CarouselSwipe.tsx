"use client"
import { ChevronLeft, ChevronRight, PlayIcon, PauseIcon } from "lucide-react"
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion"
import type { GameMovies, GameMoviesResults, Screenshot, ScreenshotImage } from "@/app/types/type"
import { useEffect, useRef, useState } from "react"
import Dots from "./Dots"
import SlideButton from "./SlideButton"

const DRAG_BUFFER = 50;
const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;

type CarouselScreenshots = {
    type: "screenshots",
    results: Screenshot[]
}

type CarouselMovies = {
    type: "movies",
    results: GameMovies[]
}

type CarouselObject = CarouselScreenshots | CarouselMovies

type CarouselSwipeProps = {
    object: CarouselObject
}

export default function CarouselSwipe({ object }: CarouselSwipeProps) {
    
    const [dragging, setDragging] = useState(false)
    const [imgIndex, setImgIndex] = useState(0)

    const dragX = useMotionValue(0)

    useMotionValueEvent(dragX, "change", (latest) => {
        if(typeof latest === "number" && dragging) {
            dragX.set(latest);
        } else {
            dragX.set(0)
        }
    })

    useEffect(() => {
        if(object.type !== "screenshots") return;

        const intervalRef = setInterval(() => {
            const x = dragX.get()   
            if (x === 0) {
                setImgIndex(previousValue => {
                    if (previousValue === object.results.length - 1) {
                        return 0;
                    }
                    return previousValue + 1
                })
            }
        }, AUTO_DELAY)
        return () => clearInterval(intervalRef)
    })

    const onDragStart = () => {
        setDragging(true)
    }

    const onDragEnd = () => {
        setDragging(false)
        const x = dragX.get()

        if(x <= -DRAG_BUFFER && imgIndex < object.results.length - 1) {
            setImgIndex(previousValue => previousValue + 1)
            if(isPlaying) handlePause(imgIndex)
        } else if (x >= DRAG_BUFFER  && imgIndex > 0) {
            setImgIndex(previousValue => previousValue - 1)
            if(isPlaying) handlePause(imgIndex)
        }
    }

    const nextSlide = () => {
        if(imgIndex < object.results.length - 1) {
            setImgIndex(previousValue => previousValue + 1)
            if(isPlaying) handlePause(imgIndex)
        }
    }

    const prevSlide = () => {
        if(imgIndex > 0) {
            setImgIndex(previousValue => previousValue - 1)
            if(isPlaying) handlePause(imgIndex)
        }
    }

    // play video
    const [isPlaying, setIsPlaying] = useState(false)
    const refs = useRef<(HTMLVideoElement | null)[]>([]);
    
    const videoRef = (index: number) => (videoIndex: HTMLVideoElement | null) => {
        refs.current[index] = videoIndex;
    };

    const handlePlay = (index: number) => {
        if(refs.current[index]){
            refs.current[index]?.play();
            setIsPlaying(true)
        }
    }

    const handlePause = (index: number) => {
        if(!isPlaying) return
        if(refs.current[index]){
            refs.current[index]?.pause()
            setIsPlaying(false)
        }
    }

    return ( 
        <div className="w-full relative min-h-auto overflow-hidden mt-8">
            <motion.div 
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                style={{
                    x: dragX,
                }}
                animate={{
                    translateX: `-${imgIndex * 100}%`,
                }}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                className="flex items-center cursor-grab active:cursor-grabbing"
            >   
                
                {object.type === "screenshots" && object.results.map((screenshot) => (
                    <motion.div key={screenshot.id} 
                        className="w-full aspect-video shrink-0 rounded-xl bg-neutral-800 bg-cover bg-center" 
                        style={{backgroundImage: `url(${screenshot.image})`}}
                        transition={{
                            type: "spring",
                            mass: 3,
                            stiffness: 400,
                            damping: 50,
                        }}
                        > 
                    </motion.div>
                ))}

                {object.type === "movies" && object.results.map((movie, index) => (
                    <motion.div key={movie.id} 
                        className="w-full aspect-video shrink-0 rounded-xl bg-cover bg-center relative z-10" 
                        transition={{
                            type: "spring",
                            mass: 3,
                            stiffness: 400,
                            damping: 50,
                        }}
                    > 
                        <video
                            ref={videoRef(index)}
                            src={movie.data.max}
                            controls={false}
                            autoPlay={false}
                            className="w-full h-full object-cover rounded-xl border border-solid border-amber-400 absolute z-10"
                        />  
                    
                        {!isPlaying && (
                            <>
                                <div className="inset-0 bg-black/20 absolute z-20"></div>
                                <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-14 relative z-50">
                                        <div className="w-13 h-13 bg-yellow-600/70 animate-ping rounded-full m-auto absolute z-30"></div>
                                        <button onClick={() => handlePlay(index)} className="w-13 h-13 p-3 rounded-full bg-yellow-500 shadow-yellow-400/20 flex items-center justify-center cursor-pointer relative z-50">                                
                                            <PlayIcon size={32}/>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {isPlaying && (
                            <div className="absolute inset-0 z-30 cursor-pointer" onClick={() => handlePause(index)}></div>
                        )}

                    </motion.div>
                ))}
            </motion.div>

            {object.results.length > 0 ?
                <div className="w-full flex items-center justify-between gap-1">
                    <div className="w-full max-w-32 flex items-center justify-start gap-3 mt-2">
                        <SlideButton onClick={prevSlide} icon={ChevronLeft}/>
                        <SlideButton onClick={nextSlide} icon={ChevronRight}/>
                    </div>
                    {object.type === "screenshots" 
                        ?
                        <Dots indexObject={imgIndex} setIndexObject={setImgIndex} dots={{ type: "screenshots", results: object.results || [] }}/>
                        :
                        <Dots indexObject={imgIndex} setIndexObject={setImgIndex} dots={{ type: "movies", results: object.results || [] }}/>
                    }
                </div>
                :
                "" 
            }
        </div>
    )
}