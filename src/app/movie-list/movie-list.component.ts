import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';
import { MoviesService } from '../shared/movies-service.service';
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

ngOnInit() {
this.movieService.getMovies(this.page).subscribe(res=>this.movies= res);
  
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
      this.movieService.getMovies(this.page)
                       .subscribe(res=>this.movies=res)
    } 
  }

}