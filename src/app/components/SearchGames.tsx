import { Search } from 'lucide-react';
import Games from './Games';
import { getGames } from '@/services/games';
import Image from 'next/image';

export default async function SearchGames(){
    const games = await getGames({page_size: 12, tba: false});

    const randomBackgroundImage = Math.floor(Math.random() * games.length)
    const random = games[randomBackgroundImage]
    const backgroundImage = random?.background_image
    const nameImage = random?.name

    // console.log(backgroundImage, nameImage)

    return (
        <div className="w-full mt-12 flex flex-col items-center justify-center gap-4">
            <div className="w-full relative">
                <div className='w-full rounded-2xl'>
                    <div className="inset-0 bg-gradient-to-b from-black/90 to-yellow-500/30 absolute z-20 rounded-2xl"></div>
                    <Image 
                        src={backgroundImage}
                        alt={nameImage}
                        width={1280}
                        height={600}
                        className='w-full h-full absolute grayscale blur-xs rounded-2xl object-cover'
                    />
                </div>
                <div className="w-full relative z-20 py-8">
                    <h1 className="text-white mt-8 text-4xl w-full text-center md:text-6xl">
                        Encontre o próximo game <br />para você jogar:
                    </h1>
                    <p className="text-gray-400 text-center mt-3">Selecione um meio de busca:</p>
                    <div className="w-full flex flex-wrap items-center justify-center gap-3 mt-4">
                        <button className="w-full max-w-40 bg-white p-3 text-black rounded-xl shadow-gray-400 shadow-lg font-semibold">
                            Recentes
                        </button>
                        <button className="w-full max-w-40 bg-white p-3 text-black rounded-xl shadow-gray-400 shadow-lg font-semibold">
                            Retro
                        </button>
                        <button className="w-full max-w-40 bg-white p-3 text-black rounded-xl shadow-gray-400 shadow-lg font-semibold">
                            Populares
                        </button>
                        <button className="w-full max-w-40 bg-white p-3 text-black rounded-xl shadow-gray-400 shadow-lg font-semibold">
                            Bem Avaliados
                        </button>
                    </div>
                        
                    <div className="w-full mt-8 p-4">
                        <hr className="w-full"/>
                        <h2 className="text-center mt-4 text-xl md:text-3xl"> Ou </h2>
                        <p className="text-gray-400 text-center mt-3"> Procure o que quiser, encontre informações sobre seu próximo jogo ou seu jogo favorito  </p>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <form action="" className="w-full flex items-center justify-center gap-3">
                            <input type="search" placeholder="Busque um game aqui" className="w-10/12 text-sm p-5 bg-zinc-900 rounded-2xl text-white shadow-xs shadow-yellow-300 border border-transparent focus:border-yellow-400 focus:outline-none md:text-xl" />
                            <button className='bg-yellow-500 text-zinc-800 p-5 w-fit text-center rounded-2xl cursor-pointer'> <Search /></button>
                        </form>
                    </div>    
                </div>
            </div>       

            <div className='w-full mt-8'>
                <Games games={games} />
            </div>
        </div>
    )
}