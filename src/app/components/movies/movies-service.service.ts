import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie-list/movie.model';
import { MovieDetails } from './movie-details/movie-detailes.model';
import { DataTransforming } from '../../shared/services/data-transforming.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  url: string =
    'https://api.themoviedb.org/3//movie/top_rated?api_key=c3aceedbcd41c21bcb8db8c3d4adb97b';
  private moviesList: Movie[] = [];
  private movieDetails: MovieDetails;

  constructor(private http: HttpClient, private transform: DataTransforming) {}
  getMovies(page: number) {
    return this.http.get(`${this.url}&page=${page}`).pipe(
      map((res) => {
        const list: [] = res['results'];
        for (let i = 0; i < list.length; i++) {
          this.moviesList.push(this.transformValues(list, i));
        }
        return this.moviesList;
      })
    );
  }
  private transformValues(res: object, i: number): Movie {
    return new Movie(
      res[i]['title'],
      res[i]['vote_average'],
      this.transform.getYear(res[i]['release_date']),
      this.transform.getPosterUrl(res[i]['poster_path']),
      res[i]['id']
    );
  }
  getDetailedMovie(id: number) {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=c3aceedbcd41c21bcb8db8c3d4adb97b&append_to_response=videos,images,credits`
      )
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
