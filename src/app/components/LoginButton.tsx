"use client"
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import Login from "./Login";

type JustifyProps = {
    justify?: "start" | "center";
};

export default function LoginButton({justify}: JustifyProps) {
    const [showLogin, setShowLogin] = useState(false)

    const handleshowLogin = () => {
        setShowLogin(true)
    }

    const handleCloseLogin = () => {
        setShowLogin(false)
    }

    return (
        <div className={`w-full flex items-center justify-${justify}`}>
            <button onClick={handleshowLogin} className="bg-yellow-400 text-zinc-800 font-semibold rounded-lg cursor-pointer w-full max-w-40 p-2 mt-6 flex items-center justify-center gap-1 hover:shadow-xl hover:shadow-yellow-500/30">
                <Play size={16} color="black" strokeWidth={3}/> Get Started
            </button>

             <AnimatePresence>
                {showLogin && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            key="modal"
                            initial={{ scale: 0.4, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.7, opacity: 0, x: -500 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="bg-yellow-400 mr-[20%] lg:mr-[50%] p-6 rounded-xl shadow-2xl w-full max-w-md relative"
                        >
                            <button
                                onClick={handleCloseLogin}
                                className="absolute top-12 right-6 text-zinc-950 p-1 border-2 border-zinc-950 rounded-lg cursor-pointer hover:bg-zinc-950 hover:text-yellow-400 transition-colors"
                            >
                                <X size={24}/>
                            </button>

                            <Login onSuccess={handleCloseLogin} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}