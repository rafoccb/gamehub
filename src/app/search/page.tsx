import Footer from "../components/Footer"
import Header from "../components/Header"
import SearchForm from "../components/SearchForm"

export default async function Search() {
    return(
        <>
            <Header />

            <main className="w-full max-w-6xl h-[75vh] m-auto p-8 flex flex-col items-center justify-center">
                <h1 className="text-center mb-4 text-2xl md:text-5xl text-white font-bold">
                    Find a game you love 🤍
                </h1>
                <SearchForm />
            </main>

            <Footer/>
        </>
    )
}