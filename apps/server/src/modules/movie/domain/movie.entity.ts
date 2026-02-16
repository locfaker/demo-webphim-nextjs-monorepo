export class Movie {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly slug: string,
        public readonly description?: string,
        public readonly posterUrl?: string,
        public readonly backdropUrl?: string,
        public readonly releaseYear?: number,
        public readonly imdbRating?: number,
    ) { }
}
