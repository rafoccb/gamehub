import { getGames } from '@/services/games';
import Image from 'next/image';
import SearchForm from './SearchForm';
import SearchButtons from './SearchButtons';

export default async function SearchGames(){
    const games = await getGames({page_size: 12, tba: false});

    const randomBackgroundImage = Math.floor(Math.random() * games.length)
    const random = games[randomBackgroundImage]
    const backgroundImage = random?.background_image
    const nameImage = random?.name

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
                        className='w-full h-full absolute grayscale blur-xs rounded-2xl object-cover hover:brightness-70 scale-95'
                    />
                </div>
                <div className="w-full relative z-20 py-8">
                    <h1 className="text-white mt-8 text-4xl w-full text-center md:text-6xl">
                        Find your next game <br />to play: 
                    </h1>
                    <p className="text-gray-400 text-center mt-3">Select a random game with the buttons below: </p>
                    <div className="w-full flex flex-wrap items-center justify-center gap-3 mt-4">
                        <SearchButtons />
                    </div>
                        
                    <div className="w-full mt-8 p-4">
                        <hr className="w-full"/>
                        <h2 className="text-center mt-4 text-xl md:text-3xl"> Or </h2>
                        <p className="text-white text-center mt-3 font-semibold"> 
                            Search for a game. <br/> Find more about the next game you want to play. <br/> Keep track of your favorite games.
                        </p>
                    </div>

                    <SearchForm />   

                </div>
            </div>       
        </div>
    )
}