import { DataTransform } from "../shared/dataTransforming.service";

export class Movie {
    private transform = new DataTransform()
    constructor(
        public title: string,
        public vote: number,
        public date: string,
        private poster: string,
        public id: number) {
    }
    public posterUrl = this.transform.getPosterUrl(this.poster) 
    public releaseDate: string= this.transform.getYear(this.date)
}