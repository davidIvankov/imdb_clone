import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
   
  url: string = 'https://api.themoviedb.org/3//movie/top_rated?api_key=c3aceedbcd41c21bcb8db8c3d4adb97b';
  page= 1;
  @Output() moviesList: Movie[] = [];
  constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.fatchPosts(this.url)
}

private fatchPosts(url: string){

  this.http
       .get(url)
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
      console.log(this.moviesList)
      })
}
@HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
      this.page++;
      this.fatchPosts(`https://api.themoviedb.org/3//movie/top_rated?api_key=c3aceedbcd41c21bcb8db8c3d4adb97b&page=${this.page}`)
    } 
  }

}