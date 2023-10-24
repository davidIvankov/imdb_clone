import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../../components/charts/movie.model';
import { DataTransforming } from './data-transforming.service';
import { Subject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  error = new Subject<boolean>()

  constructor(private http: HttpClient, private transform: DataTransforming) {}
  getMovies(page: number) {
    return this.http
      .get<Movie[]>('https://api.themoviedb.org/3//movie/top_rated', {
        params: new HttpParams().set('page', page),
      })
      .pipe(
        map((res) => {
          const list: [] = res['results'];
          return list.map((item)=>{
           return this.transform.transformValues(item)
          })
        })
      );
  }

  getDetailedMovie(id: number) {
    return this.http
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: new HttpParams()
          .set('append_to_response', 'videos,images,credits'),
      })
      .pipe(
        map((res) => {
          return this.transform.transformDetailedValues(res);
        }),
      );
  }

}
