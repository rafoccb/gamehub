import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full">
            <div className="w-full max-w-2xl m-auto p-4">
                <ul className="list-none flex items-center justify-center gap-4 mt-8">
                    <li className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline"><Link href="/">Home</Link></li>
                    <li className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline"><Link href="/search">Search</Link></li>
                    <li className="text-yellow-50 text-sm md:text-base hover:text-yellow-500 hover:underline"><Link href="/favorites">Favorites</Link></li>
                </ul>
            </div>
            <div className="w-full max-w-2xl m-auto p-4 flex items-center justify-center">
                <Image src="/logo.png" alt="Logo Game Oracle" width={64} height={64} className="object-contain"></Image>
            </div>
        </header>
    )
}