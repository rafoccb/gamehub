import { Platforms } from "@/app/types/type"

type PlatformRequirements = {
    platforms: Platforms[]
}

export default function Requirements({platforms}: PlatformRequirements) {
    const pcReq = platforms?.filter((p: Platforms) => p.platform.slug === "pc");
    if(!pcReq || pcReq.length === 0) return null
    return(
         <div className="text-white mt-4">
            {pcReq.map((pReq) => (
                <div key={pReq.platform.id}>
                    <h4 className="text-yellow-400 text-sm sm:text-base font-semibold">Requirements: </h4>
                    <div className="w-full grid grid-cols-2 gap-1">
                        {pReq.requirements?.minimum && (
                            <p className="text-sm mt-1 whitespace-pre-line border border-solid border-yellow-500 rounded-xl text-center p-3">
                                {pReq.requirements.minimum?.replace(/\\n/g, "\n")}
                            </p>
                        )}
                        {pReq.requirements?.recommended && (
                            <p className="text-sm mt-1 whitespace-pre-line border border-solid border-yellow-500 rounded-xl text-center p-3 bg-yellow-500/10">
                                {pReq.requirements.recommended?.replace(/\\n/g, "\n")}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}