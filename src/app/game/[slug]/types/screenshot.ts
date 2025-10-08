export type Screenshot = {
    id: number;
    image: string;
    width: number;
    height: number;
}

export type ScreenshotImage = {
    results: Screenshot[];
}