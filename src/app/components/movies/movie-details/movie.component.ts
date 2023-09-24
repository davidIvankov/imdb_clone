import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MovieDetails } from './movie-detailes.model';
import { MoviesService } from '../movies-service.service';
import { DataTransforming } from '../../../shared/services/data-transforming.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, AfterViewInit {
  id: number;
  height: number;
  movieDetails: MovieDetails;
  releaseDate: string;
  posterUrl: string;
  durationHours: string;
  voteCountDisplay: string;
  trailer: string;
  director: string;
  writers: string[];
  actors: string[];
  private changes: MutationObserver;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private movieService: MoviesService,
    private transform: DataTransforming
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.movieService.getDetailedMovie(this.id).subscribe((data) => {
      this.movieDetails = data;
    });
  }
  ngAfterViewInit(): void {
    this.changes = new MutationObserver(() => {
      if (this.myReference) {
        this.height = this.myReference.nativeElement.offsetHeight;
      }
    });
    this.changes.observe(document.querySelector('.element'), {
      attributes: true,
      childList: true,
      characterData: true,
    });
  }

  @ViewChild('myReference')
  myReference: ElementRef;
}
