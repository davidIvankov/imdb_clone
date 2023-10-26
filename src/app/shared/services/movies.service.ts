import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChartItem } from '../../components/charts/chart-item.model';
import { DataTransforming } from './data-transforming.service';
import { Observable, Subject, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesService {

  constructor(private http: HttpClient, private transform: DataTransforming) {}
  public get(page: number, tvSeries: boolean) {
    const obs = tvSeries ? this.getTvShows(page) : this.getMovies(page)
    return obs  
      .pipe(
        map((res) => {
          const list: [] = res['results'];
          return list.map((item)=>{
           return this.transform.transformValues(item)
          })
        })
      );
  }

  public getDetailes(id: number, isTvShow: boolean) {
    const obs = isTvShow ? this.getTvShowDetailes(id) : this.getMovieDetailes(id);

    return obs
    .pipe(
      map((res) => {
        return this.transform.transformDetailedValues(res);
      }),
    );

  }

  private getTvShows(page: number = 1) {
    return this.http
      .get<ChartItem[]>('https://api.themoviedb.org/3/tv/top_rated', {
        params: new HttpParams().set('page', page)
      })
  }

  private getMovies(page: number = 1) {
    return this.http
      .get<ChartItem[]>('https://api.themoviedb.org/3//movie/top_rated', {
        params: new HttpParams().set('page', page),
      })
  }

  private getMovieDetailes(id: number) {
    return this.http
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: new HttpParams()
          .set('append_to_response', 'videos,images,credits'),
      })
  }

  private getTvShowDetailes(id: number) {
    return this.http
      .get(`https://api.themoviedb.org/3/tv/${id}`, {
        params: new HttpParams()
          .set('append_to_response', 'videos,images,credits'),
      })

  }
}
