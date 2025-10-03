import { getGamesBySlug } from "@/services/games"

interface PageGameProps {
    params: {slug: string}
}

export default async function PageGame ({params} : PageGameProps) {
    const { slug } = await params
    const game = await getGamesBySlug(slug)
    return (
        <div className="">
            <p>{game.name}</p>
        </div>
    )
}