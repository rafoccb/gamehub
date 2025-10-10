import Image from "next/image";
import { Banner } from "../types/type";

export default function BannerCard({gamesBanner}: {gamesBanner : Banner[]}){
  return (
    <div className="font-sans mt-[64px] md:mt-0">
          <div className="w-full p-4 flex items-center justify-center">
              {gamesBanner.map((game, index) => (
                  <div key={game.id} className="w-full max-w-sm flex flex-col items-center justify-center"> 
                      <Image 
                        src={game.background_image} 
                        alt={game.name} 
                        width={192}
                        height={250}
                        className={`w-full max-w-48 h-[200px] md:h-[250px] mt-8 md:mt-0 object-cover rounded-3xl shadow-zinc-950 shadow-lg ${index === 1 ? 'scale-150' : ''}`}
                        />
                  </div>
              ))}
          </div>
      </div>
    )
}