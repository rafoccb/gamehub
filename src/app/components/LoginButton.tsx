"use client"
import { Play, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Login from "./Login";

export default function LoginButton() {
    const [showLogin, setShowLogin] = useState(false)

    const handleshowLogin = () => {
        setShowLogin(true)
    }

    const handleCloseLogin = () => {
        setShowLogin(false)
    }

    return (
        <div className="w-full flex items-center justify-center md:justify-start relative">
            <button onClick={handleshowLogin} className="bg-yellow-400 text-zinc-800 font-semibold rounded-lg cursor-pointer w-full max-w-40 p-2 mt-6 flex items-center justify-center gap-1 hover:shadow-xl hover:shadow-yellow-500/30">
                <Play size={16} color="black" strokeWidth={3}/> Get Started
            </button>

            {showLogin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-yellow-400 mr-[20%] lg:mr-[50%] p-6 rounded-xl shadow-2xl w-full max-w-md relative animate-scaleIn">
                    
                    {/* BOTÃO DE FECHAR */}
                    <button
                        onClick={handleCloseLogin}
                        className="absolute top-12 right-6 text-zinc-950 p-1 border-2 border-solid border-zinc-950 rounded-lg cursor-pointer"
                    >
                        <X size={24}/>
                    </button>
                        <Login />
                    </div>
                </div>
            )}
        </div>
    )
}