
import { DataTransform } from "../shared/dataTransforming.service";


export class MovieDetails {
    transform = new DataTransform()
    constructor(
        public title: string,
        public vote: number,
        private date: string,
        private poster: string,
        private duration: number,
        private voteCount: number,
        private videoUrl: [],
        private contributors: object[],
        private cast: object[],
        public popularity: number,
        public genres: string[],
        public overview: string
    ) {
        
    }
    public releaseDate: string = this.transform.getYear(this.date)
    public  posterUrl: string= this.transform.getPosterUrl(this.poster);
    public durationHours: string= this.transform.getDuration(this.duration);
    public voteCountDisplay: string = this.transform.getVoteCount(this.voteCount);
    public trailer: string = this.transform.getTrailer(this.videoUrl);
    public director: string = this.transform.getDirector(this.contributors);
    public writers: string[] = this.transform.getWriters(this.contributors);
    public actors: string[] = this.transform.getActors(this.cast);
}