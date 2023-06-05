import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { MovieDetails } from './movieDetailes.model';
import { MoviesService } from '../shared/movies.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit{
  id: number;
  height: number;
  movieDetails: MovieDetails;
  private changes: MutationObserver;

  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title, private movieService: MoviesService){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.movieService.setDetailedMovie(this.id)
    this.movieService.movieDetails
                     .subscribe(
                      (movie: MovieDetails)=> this.movieDetails = movie
                     )
  }
  ngAfterViewInit(): void {
    this.changes = new MutationObserver(()=>{
      if (this.myReference){
      this.height = this.myReference.nativeElement.offsetHeight
      }
    })
    this.changes.observe(document.querySelector('.element'),{
      attributes: true,
      childList: true,
      characterData: true
    })
  }

   @ViewChild('myReference')
   myReference: ElementRef;

}
