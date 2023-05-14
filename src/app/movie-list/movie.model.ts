export class Movie {
    public title: string;
    public vote: number; 
    public release_date: string;
    public poster: string;
    public id: number;
    constructor( title: string, vote: number, release_date: string, poster: string, id: number) {
        this.title = title;
        this.vote = vote;
        this.release_date =release_date;
        this.poster = poster;
        this.id = id
    }
}