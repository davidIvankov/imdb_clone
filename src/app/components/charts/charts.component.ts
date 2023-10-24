import { Component, OnInit, ViewChild, ElementRef, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MoviesService } from "@shared/services/movies.service";
import { SearchService } from "@shared/services/search.service";
import { Observable, take } from "rxjs";
import { Movie } from "./movie.model";

@Component({
  selector: 'app-charts-list',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})

export class ChartsComponent implements OnInit {
  movies: Movie[] = [];
  page = 1;
  @ViewChild('left') myReference: ElementRef;
  height: number;
  searchQuery: string;
  isFindRoute: boolean = false; 

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private searchService: SearchService
    ) {
    this.route.queryParams.subscribe(p => {
      this.searchQuery = p['q'];
      this.page = 1
      this.getMovies();
    });
  }

  ngOnInit() {
    this.getMovies();
    
  }

  private getMovies() {
    let listObs: Observable<Movie[]>;
    listObs = this.searchQuery 
    ? this.searchService.getAll(this.searchQuery, this.page)
    : this.movieService.getMovies(this.page)
        
    listObs
      .pipe(take(1))
      .subscribe((res) =>{ 
        if (this.page === 1) this.movies = res;
        else this.movies.push(...res);
    });
  }

  onHeightChange(e: number) {
    this.height = this.myReference.nativeElement.offsetHeight
  }
  
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.page++;
      this.getMovies();
    }
  }
}
