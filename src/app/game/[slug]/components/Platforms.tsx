import { JSX } from "react";
import { FaApple, FaLinux, FaPlaystation, FaWindows } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import { SiAndroid, SiIos, SiNintendo, SiPlaystationvita, SiPlaystationportable } from "react-icons/si";
import { IoLogoXbox} from "react-icons/io5"

const platformIcons: Record<string, JSX.Element> = {
    "pc": <FaWindows size={24} className="text-blue-500" />,
    "linux": <FaLinux size={24} className="text-blue-500" />,
    "macintosh": <FaApple size={24} className="text-gray-600" />, 
    "playstation": <FaPlaystation size={24} className="text-indigo-500" />,
    "playstation2": <FaPlaystation size={24} className="text-indigo-500" />,
    "playstation3": <FaPlaystation size={24} className="text-indigo-500" />,
    "playstation4": <FaPlaystation size={24} className="text-indigo-500" />,
    "playstation5": <FaPlaystation size={24} className="text-indigo-500" />,
    "ps-vita": <SiPlaystationvita size={24} className="text-indigo-500" />,
    "psp": <SiPlaystationportable size={24} className="text-indigo-500" />,
    "xbox": <IoLogoXbox size={24} className="text-green-500" />,
    "xbox-one": <IoLogoXbox size={24} className="text-green-500" />,
    "xbox-series-x": <IoLogoXbox size={24} className="text-green-500" />,
    "xbox-old": <IoLogoXbox size={24} className="text-green-500" />,
    "xbox360": <IoLogoXbox size={24} className="text-green-500" />,
    "nintendo-switch": <SiNintendo size={24} className="text-red-500" />,
    "nintendo-3ds": <SiNintendo size={24} className="text-red-500" />,
    "nintendo-ds": <SiNintendo size={24} className="text-red-500" />,
    "nintendo-dsi": <SiNintendo size={24} className="text-red-500" />,
    "ios": <SiIos size={24} className="text-gray-500" />,
    "android": <SiAndroid size={24} className="text-green-500" />,

}

type PlatformProps = {
    platforms : {
        platform : {
            id: number;
            slug: string;
            name: string;
        }
    }[]
}

export default function Platforms({platforms}: PlatformProps) {
    const getPlatformIcon = (slug: string) => {
        return platformIcons[slug] || <GiCrossedSwords className="text-gray-500" />
    }
    return (
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 ">
            <p>Available at: </p>
            {platforms.map((item) => (
                <div key={item.platform.id}>
                    <span className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-400 hover:scale-105 cursor-pointer hover:text-white hover:underline">
                        {getPlatformIcon(item.platform.slug)} {item.platform.name}
                    </span>
                </div>              
            ))}
        </div>
    )
}