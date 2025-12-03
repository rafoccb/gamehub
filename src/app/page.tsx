import { Gamepad2, Eye, MonitorCheck, MonitorPlay, Play} from "lucide-react"
import Header from "./components/Header";
import BannerCard from "./components/BannerCard";
import SearchGames from "./components/SearchGames";
import Footer from "./components/Footer";
import { getGames } from "@/services/games";
import { getDataRange } from "@/utils/lib";
import Games from "./components/Games";
import LoginButton from "./components/LoginButton";

export default async function Home() {
  const gamesBanner = await getGames({page_size: 12, tba: true, dates: getDataRange(180)});
  const games = await getGames({page_size: 12, tba: false, dates: getDataRange(60)});

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

            <LoginButton justify="start" />

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
