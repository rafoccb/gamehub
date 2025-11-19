"use client"
import { Gamepad2, Search, Heart, User2, LogOut} from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from 'react'
import {supabase} from '@/api/supabaseClient'
import type {User} from "@supabase/supabase-js"

export default function Header() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const getUser = async () => {
            const { data} = await supabase.auth.getUser()
            if(data?.user) setUser(data.user)
        }

        getUser()

        const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
            if(session?.user) setUser(session.user)
            else setUser(null)
        })

        return() => {
            listener.subscription.unsubscribe()
        }
    }, [])
  
    return (
        <header className="w-full flex-wrap flex items-center justify-between gap-1">      
            <div className="w-full max-w-2xl m-auto p-4 flex items-center justify-center">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo Game Oracle" width={64} height={64} className="object-contain" />
                </Link>
            </div>
            <div className="w-full max-w-2xl m-auto">
                <ul className="list-none flex items-center justify-center gap-4">
                    <li className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline"><Link href="/search"><Search /></Link></li>
                    <li className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline"><Link href="/hub"><Gamepad2 /></Link></li>
                    {/* <li className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline"><Link href="/"><Heart /></Link></li> */}
                   
                        {user && (
                            <div className="flex items-center gap-2">
                                <li className="text-black font-semibold text-sm md:text-base bg-yellow-500 rounded-full py-1 px-3 cursor-pointer flex items-center justify-center gap-2">
                                    <Link href="/login"><User2 strokeWidth={2} color="#000000"/></Link>
                                    <span>
                                        {user.user_metadata?.username || user.email}
                                    </span>
                                </li>
                                
                               
                                <button
                                    onClick={async () => {
                                        await supabase.auth.signOut()
                                        setUser(null)
                                    }}
                                    className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline cursor-pointer"
                                >
                                    <LogOut />
                                </button>
                                </div>
                            )
                            //  : (
                            //     <li className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline">
                            //         <Link href="/login"><User2 /></Link>
                            //     </li>
                            // )
                        }
                </ul>
            </div>
        </header>
    )
}