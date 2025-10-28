import { Gamepad2, Eye, MonitorCheck, MonitorPlay} from "lucide-react"
import Header from "./components/Header";
import BannerCard from "./components/BannerCard";
import SearchGames from "./components/SearchGames";
import Footer from "./components/Footer";
import { getGames } from "@/services/games";
import { getDataRange } from "@/utils/lib";
import Games from "./components/Games";
import Link from "next/link";

export default async function Home() {
  const gamesBanner = await getGames({page_size: 3, tba: true, dates: getDataRange(180)});
  const games = await getGames({page_size: 12, tba: false});

  return (
    <>
      <Header />

      <main className="w-full max-w-6xl m-auto p-2">
        <div className="w-full p-6 mt-8 bg-zinc-800 rounded-2xl grid grid-cols-1 md:grid-cols-2">
          <div className="w-full flex flex-col items-start justify-center">
            <p className="text-white flex gap-2 items-start md:items-center justify-start mt-5">
              <Gamepad2 />
              Keep track of the games you are playing or played
            </p>
            <p className="text-white flex gap-2 items-start md:items-center justify-start mt-5">
              <Eye />
              Show or keep record of the games you already beated
            </p>
            <p className="text-white flex gap-2 items-start md:items-center justify-start mt-5">
              <MonitorCheck />
              Know where you can find the games you love
            </p>
            <p className="text-white flex gap-2 items-start md:items-center justify-start mt-5">
              <MonitorPlay />
              Find your next game to play
            </p>

            <div className="w-full flex items-center justify-center md:justify-start">
              <Link href="/search" className="bg-yellow-400 text-zinc-800 font-semibold rounded-lg cursor-pointer w-full max-w-40 p-2 mt-6">
                Get Started
              </Link>
            </div>

          </div>
          <div>
            <BannerCard gamesBanner={gamesBanner} />
          </div>
        </div>
        
        <SearchGames />
      
        <Games games={games} />
        
      </main>

      <Footer />
    </>
  );
}
