import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { getTypeForSearchPage } from "@/services/games";

type PageSearchProps = {
    params: {
        type: string;
        name: string;
    }
}

export default async function PageSearch({params}: PageSearchProps) {
    const {type, name} = await params;

    const gamesInfo = await getTypeForSearchPage(type, name);
    console.log(JSON.stringify(gamesInfo, null, 2))

    return(
        <>
            <Header />

            <div className="w-full flex items-center justify-center gap-2">
                <p className="text-white p-5">
                    {gamesInfo.name} - asdsad
                </p>
            </div>

            <Footer/>
        </>
    )
}