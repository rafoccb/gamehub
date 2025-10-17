import { Gamepad2, Search, Heart} from "lucide-react"
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full flex items-center justify-between gap-1">      
            <div className="w-full max-w-2xl m-auto p-4 flex items-center justify-center">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo Game Oracle" width={64} height={64} className="object-contain" />
                </Link>
            </div>
            <div className="w-full max-w-2xl m-auto">
                <ul className="list-none flex items-center justify-center gap-4">
                    <li className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline"><Link href="/"><Gamepad2 /></Link></li>
                    <li className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline"><Link href="/search"><Search /></Link></li>
                    <li className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline"><Link href="/favorites"><Heart /></Link></li>
                </ul>
            </div>
        </header>
    )
}