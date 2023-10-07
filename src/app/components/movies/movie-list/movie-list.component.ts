import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from './movie.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  page = 1;
  @ViewChild('left') myReference: ElementRef;
  height: number;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.getMovies();
  }

  private getMovies() {
    this.movieService
      .getMovies(this.page)
      .pipe(take(1))
      .subscribe((res) => (this.movies.push(...res)));
  }

  onHeightChange(e: number) {
    this.height = e;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.page++;
      this.getMovies();
    }
  }
}
