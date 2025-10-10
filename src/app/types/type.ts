export type Game = {
    id: number;
    name: string;
    slug: string;
    background_image: string;
    background_image_additional: string;
    tba: boolean;
    released: string;
    rating: number;
    rating_top: number;
    ratings: Ratings[];
    tags: GameTag[];
    genres: Genre[];
    developers: Developers[];
    platforms: Platforms[];
    description_raw: string;
}

export type Banner = {
    id: number;
    name: string;
    background_image: string;
}

export type Genre = {
    id: number;
    name: string;
    slug: string;
}


export type GameTag = {
    id: number;
    name: string;
    slug: string;
}

export type Screenshot = {
    id: number;
    image: string;
    width: number;
    height: number;
}

export type ScreenshotImage = {
    results: Screenshot[];
}

export type Developers = {
    id: number;
    name: string;
    slug: string;
    image_background: string;
}

export type Platforms = {
    platform: Platform  ; 
}

export type  Platform = {
    id: number;
    name: string;
    slug: string;
    image_background: string;
}

export type Ratings = {
    id: number;
    title: string;
    count: number;
    percent: number;
}