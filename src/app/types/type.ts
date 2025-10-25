export type Game = {
    id: number;
    name: string;
    slug: string;
    description: string;
    background_image: string;
    background_image_additional: string;
    tba: boolean;
    playtime: number;
    released: string;
    rating: number;
    rating_top: number;
    metacritic: number;
    ratings: GameRatings[];
    tags: GameTag[];
    genres: Genre[];
    developers: Developers[];
    platforms: Platforms[];
    esrb_rating: {
        id: number;
        name: string;
        slug: string;
    }[]
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

export type GameRatings = {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export type GameAchievements = {
    id: number;
    name: string;
    description: string;
    image: string;
    percent: string;
}

export type GameMovies = {
    id: number;
    name: string;
    preview: string;
    data: {
        480: string;
        max: string
    }
}

export type GameMoviesResults = {
    count: number;
    results: GameMovies[]
}

export type GameAdditions = {
    count: number;
    results: {
        id: number;
        name: string;
        slug: string;
        released: string;
        tba: boolean;
        background_image: string;
        rating: number;
        rating_top: number;
    }[]
}

export type GameSeriesType = {
    count: number;
    results: {
        id: number;
        slug: number;
        name: string;
        background_image: string;
        released: string;
        rating: number;
        rating_top: number;
        genres: {
            id: number;
            slug: string;
            name: string;
        }[]
    }[]
}