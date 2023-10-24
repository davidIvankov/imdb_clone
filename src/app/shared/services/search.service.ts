import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable,} from "@angular/core";
import { DataTransforming } from "@shared/services/data-transforming.service";
import { Movie} from "app/components/charts/movie.model";
import { Subject, map } from "rxjs"
@Injectable({providedIn: 'root'})

export class SearchService {
  isLoading = new Subject<boolean>()
  constructor(private http: HttpClient, private transform: DataTransforming) {}

  public getDropdown(query: string, page: number = 1){
    this.isLoading.next(true)
    return this.getAll(query, page)
}

getAll(query: string, page: number) {
  return this.http.get('https://api.themoviedb.org/3/search/movie', {
      params: new HttpParams()
      .set('query', query)
      .set('page', page),
    })
    .pipe<Movie[]>(
      map((res) => {
        this.isLoading.next(false)
        const list: [] = res['results'];
        return list.map((item)=>{
          return this.transform.transformValues(item)
        })
      })
    );
  };

}


