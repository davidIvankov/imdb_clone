export class MovieDetails {
  constructor(
    public title: string,
    public vote: number,
    public date: string,
    public poster: string,
    public duration: string,
    public voteCount: string,
    public videoUrl: string,
    public writers: string[],
    public popularity: number,
    public genres: string[],
    public overview: string,
    public actors: string[],
    public director: string
  ) {}
}
