"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion"
import type { ScreenshotImage } from "../../../types/type"
import { useEffect, useState } from "react"
import Dots from "./Dots"
import SlideButton from "./SlideButton"

const DRAG_BUFFER = 50;
const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;


export default function CarouselSwipe({ screenshots }: {screenshots: ScreenshotImage}) {
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
        const intervalRef = setInterval(() => {
            const x = dragX.get()   
            if (x === 0) {
                setImgIndex(previousValue => {
                    if (previousValue === screenshots.results.length - 1) {
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

        if(x <= -DRAG_BUFFER && imgIndex < screenshots.results.length - 1) {
            setImgIndex(previousValue => previousValue + 1)
        } else if (x >= DRAG_BUFFER  && imgIndex > 0) {
            setImgIndex(previousValue => previousValue - 1)
        }
    }

    const nextSlide = () => {
        if(imgIndex < screenshots.results.length - 1) {
            setImgIndex(previousValue => previousValue + 1)
        }
    }

    const prevSlide = () => {
        if(imgIndex > 0) {
            setImgIndex(previousValue => previousValue - 1)
        }
    }

    return (
        <div className="relative min-h-auto overflow-hidden mt-8">
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
                {screenshots.results.map((screenshot) => (
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
            </motion.div>

            <div className="w-full flex items-center justify-between gap-1">
                <div className="w-full max-w-32 flex items-center justify-start gap-3 mt-2">
                    <SlideButton onClick={prevSlide} icon={ChevronLeft}/>
                    <SlideButton onClick={nextSlide} icon={ChevronRight}/>
                </div>
                <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} screenshots={screenshots}/>
            </div>
        </div>
    )
}