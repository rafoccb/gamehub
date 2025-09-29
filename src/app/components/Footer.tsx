import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-fill bg-zinc-950 mt-8 p-4 flex flex-col items-center justify-center">
            <div>
                <p>@rafoccb</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <Link href="https://github.com/rafoccb/" target='_blank'> <Github size={16}/> </Link>
                    <Link href="https://www.linkedin.com/in/rafoccb/" target='_blank'><Linkedin size={16}/> </Link>
                </div>
            </div>
        </footer>
    )
}