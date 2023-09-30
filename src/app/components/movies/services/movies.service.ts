import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../movie-list/movie.model';
import { MovieDetails } from '../movie-details/movie-detailes.model';
import { DataTransforming } from '../../../shared/services/data-transforming.service';
import { map } from 'rxjs/operators';
import { environment } from '@env';



@Injectable({ providedIn: 'root' })
export class MoviesService {

  constructor(private http: HttpClient, private transform: DataTransforming) {}
  getMovies(page: number) {
    return this.http
      .get<Movie[]>('https://api.themoviedb.org/3//movie/top_rated', {
        params: new HttpParams().set('api_key', environment.apiKey).set('page', page),
      })
      .pipe(
        map((res) => {
          const list: [] = res['results'];
          return list.map((item)=>{
           return this.transformValues(item)
          })
        })
      );
  }

  private transformValues(res: object): Movie {
    return new Movie(
      res['title'],
      res['vote_average'],
      this.transform.getYear(res['release_date']),
      this.transform.getPosterUrl(res['poster_path']),
      res['id']
    );
  }

  getDetailedMovie(id: number) {
    return this.http
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: new HttpParams()
          .set('api_key', environment.apiKey)
          .set('append_to_response', 'videos,images,credits'),
      })
      .pipe(
        map((res) => {
          return this.transformDetailedValues(res);
        })
      );
  }

  private transformDetailedValues(res: object): MovieDetails {
    return new MovieDetails(
      res['title'],
      res['vote_average'],
      this.transform.getYear(res['release_date']),
      this.transform.getPosterUrl(res['poster_path']),
      this.transform.getDuration(res['runtime']),
      this.transform.getVoteCount(res['vote_count']),
      this.transform.getTrailer(res['videos']['results']),
      this.transform.getWriters(res['credits']['crew']),
      res['popularity'],
      res['genres'],
      res['overview'],
      this.transform.getActors(res['credits']['cast']),
      this.transform.getDirector(res['credits']['crew'])
    );
  }
}
