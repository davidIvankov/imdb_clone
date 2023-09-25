import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from './movie.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() movies: Movie[] = [];
  page = 1;
  @ViewChild('left') myReference: ElementRef;
  height: number;
  private changes: MutationObserver;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.getMovies();
  }

  private getMovies() {
    this.movieService
      .getMovies(this.page)
      .pipe(take(1))
      .subscribe((res) => (this.movies = res));
  }

  ngAfterViewInit(): void {
    const tracked = document.querySelector('.tracked');
    this.changes = new MutationObserver(() => {
      if (this.myReference) {
        this.height = this.myReference.nativeElement.offsetHeight;
      }
    });
    this.changes.observe(tracked, {
      attributes: true,
      childList: true,
      characterData: true,
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.page++;
      this.getMovies();
    }
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
