"use client"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchForm() {

    // search
    const [query, setQuery] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!query.trim()) return

        // 
        const slug = query.toLowerCase().replace(/\s+/g, "-")
        router.push(`/search/games/${slug}`)
    }
    
    return(
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <form onSubmit={handleSubmit} className="w-full flex items-center justify-center gap-3">
                <input 
                    type="search" 
                    placeholder="Search for games"
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-10/12 text-sm p-3 italic bg-zinc-900 rounded-2xl text-white shadow-xs shadow-yellow-300 border border-transparent focus:border-yellow-400 focus:outline-none md:text-xl" 
                />
                <button type="submit" className='bg-yellow-500 text-zinc-800 p-4 md:p-5 w-fit text-center rounded-2xl cursor-pointer hover:bg-yellow-500/90'> <Search size={18} strokeWidth={3} /></button>
            </form>
        </div> 
    )
}