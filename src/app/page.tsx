import { Gamepad2, Eye, MonitorCheck, MonitorPlay} from "lucide-react"
import Header from "./components/Header";
import BannerCard from "./components/BannerCard";
import SearchGames from "./components/SearchGames";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="w-full max-w-6xl m-auto p-2">
        <div className="w-full p-6 mt-8 bg-zinc-800 rounded-2xl grid grid-cols-1 md:grid-cols-2">
          <div className="w-full flex flex-col items-start justify-center">
            <p className="text-white flex gap-2 items-start md:items-center justify-start mt-5">
              <Gamepad2 />
              Acompanhe sobre os jogos que você está jogando
            </p>
            <p className="text-white flex gap-2 items-start md:items-center justify-start mt-5">
              <Eye />
              Mostre para todos os jogos que você já finalizou
            </p>
            <p className="text-white flex gap-2 items-start md:items-center justify-start mt-5">
              <MonitorCheck />
              Descubra as plataformas disponíveis para um jogo
            </p>
            <p className="text-white flex gap-2 items-start md:items-center justify-start mt-5">
              <MonitorPlay />
              Descubra o próximo jogo para jogar
            </p>

            <div className="w-full flex items-center justify-center md:justify-start">
              <button className="bg-yellow-400 text-zinc-800 font-semibold rounded-lg cursor-pointer w-full max-w-40 p-2 mt-6">
              Começar
              </button>
            </div>

          </div>
          <div>
            <BannerCard />
          </div>
        </div>
        <SearchGames />
      </main>

      <Footer />
    </>
  );
}
