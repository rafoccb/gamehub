import { GameTag } from "../../../types/type"

type TagProps = {
    tags: GameTag[]
}

export default function Tag({tags}: TagProps) {   
    const isLatin = (text:string) => /^[A-Za-z0-9\s.,'-]+$/.test(text)
    const filteredTags = tags.filter(tag => isLatin(tag.name))
    
    return (
        <div className="w-full p-3 flex flex-wrap items-center justify-center gap-2">
            {filteredTags.map((tag) => (
                <span key={tag.id} className="text-xs bg-yellow-300 p-1 rounded-lg text-black font-semibold">
                    {tag.name}
                </span>
            ))}
        </div>
    )    
}