import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MovieDetails } from './movie-detailes.model';
import { MoviesService } from '../../shared/services/movies.service';
import { take } from 'rxjs';
import { HeightTrackingDirective } from '@shared/directives/height-tracking.directive';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css'],
})
export class TitlesComponent implements OnInit {
  height: number;
  movieDetails: MovieDetails;
  private id: number;
  finished: boolean;
  @ViewChild(HeightTrackingDirective) trackedEl: HeightTrackingDirective;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private titleService: Title
  ) {}
  ngOnInit(): void {
   this.route.params.subscribe(e=>{
    this.id = e['id']
    this.movieService
      .getDetailedMovie(this.id)
      .pipe(take(1))
      .subscribe((data) => {
        this.movieDetails = data;
        this.finished = true
        
        this.titleService.setTitle(this.movieDetails.title);
      },(error)=> this.finished = true);
   })

  }
  onHeightChange(e: number) {
    this.height = e;
  }
}
