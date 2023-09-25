import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MovieDetails } from './movie-detailes.model';
import { MoviesService } from '../movies.service';
import { take } from 'rxjs';
import { HeightTrackingDirective } from 'src/app/shared/height-tracking.directive';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  height: number;
  movieDetails: MovieDetails;
  private id: number;
  @ViewChild(HeightTrackingDirective) trackedEl: HeightTrackingDirective;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.movieService
      .getDetailedMovie(this.id)
      .pipe(take(1))
      .subscribe((data) => {
        this.movieDetails = data;
        this.titleService.setTitle(this.movieDetails.title);
      });
  }
  onHeightChange(e: number) {
    this.height = e;
  }
}
