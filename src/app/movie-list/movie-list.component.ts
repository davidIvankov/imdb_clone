import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';
import { MoviesService } from '../shared/movies.service';
import { Movie } from './movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit,AfterViewInit {

  @Output() movies: Movie[]=[];
  page= 1;
   private changes: MutationObserver;
  @ViewChild('left')
  myReference: ElementRef;
  height: number;
 
  constructor(private movieService: MoviesService) {}

ngOnInit(): void {
  this.movieService.setMovies(this.page);
  this.movieService.movieEmmiter
                   .subscribe(
                    (movies: Movie[])=>{
                      this.movies = movies;
                    }
                   )
}

ngAfterViewInit(): void {
  this.changes = new MutationObserver(()=>{
      if (this.myReference){
      this.height = this.myReference.nativeElement.offsetHeight
      }
    })
    this.changes.observe(document.querySelector('.tracked'),{
      attributes: true,
      childList: true,
      characterData: true
    })
}

@HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
      this.page++;
      this.movieService.setMovies(this.page)
    } 
  }

}