import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Movie } from "../movie-list/movie.model";
import { MovieDetails } from "../movie/movieDetailes.model";


@Injectable({providedIn: 'root'})

export class MoviesService {
    url: string = 'https://api.themoviedb.org/3//movie/top_rated?api_key=c3aceedbcd41c21bcb8db8c3d4adb97b';
    movieDetails= new EventEmitter<MovieDetails>()
    movieEmmiter= new EventEmitter<Movie[]>()
    private moviesList: Movie[]=[];

    constructor(private http: HttpClient) {}
    setMovies(page: number) {
        if (page = 1){
        this.http
       .get(this.url)
      .subscribe(data=> {
        const list: [] =  data['results']
        for(let i= 0; i < list.length; i++) {
          this.moviesList.push(new Movie(
                                      list[i]['title'],
                                      list[i]['vote_average'],
                                      list[i]['release_date'],
                                      list[i]['poster_path'],
                                      list[i]['id']
                                    ))
        }
      this.movieEmmiter.emit(this.moviesList)
      })
    } else {
        this.http
       .get(`${this.url}&page=${page}`)
      .subscribe(data=> {
        const list: [] =  data['results']
        for(let i= 0; i < list.length; i++) {
          this.moviesList.push(new Movie(
                                      list[i]['title'],
                                      list[i]['vote_average'],
                                      list[i]['release_date'],
                                      list[i]['poster_path'],
                                      list[i]['id']
                                    ))
        }
      this.movieEmmiter.emit(this.moviesList)
    })

    }
}

setDetailedMovie(id: number){
this.http
       .get(`https://api.themoviedb.org/3/movie/${id}?api_key=c3aceedbcd41c21bcb8db8c3d4adb97b&append_to_response=videos,images,credits`)
      .subscribe(data=> {
        this.movieDetails.emit(new MovieDetails(data['title'],
                                                data['vote_average'],
                                                data['release_date'],
                                                data['poster_path'],
                                                data['runtime'],
                                                data['vote_count'],
                                                data['videos']['results'],
                                                data['credits']['crew'],
                                                data['credits']['cast'],
                                                data['popularity'],
                                                data['genres'],
                                                data['overview']))
      })
}
  
}