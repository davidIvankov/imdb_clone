import { Component, OnInit, ViewChild, ElementRef, HostListener} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MoviesService } from "@shared/services/movies.service";
import { SearchService } from "@shared/services/search.service";
import { Observable, take } from "rxjs";
import { ChartItem } from "./chart-item.model";


@Component({
  selector: 'app-charts-list',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})

export class ChartsComponent implements OnInit {
  movies: ChartItem[] = [];
  isTvShows: boolean;
  page = 1;
  @ViewChild('left') myReference: ElementRef;
  finished: boolean;
  height: number;
  searchQuery: string;
  isFindRoute: boolean = false; 

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    ) {}
    ngOnInit(): void {
      this.finished = false
      this.route.url.subscribe((a)=> this.isTvShows =  a[0].path === 'toptv' ? true : false )
      this.route.queryParamMap.subscribe((p) => {
        console.log(p.get('q'))
        this.searchQuery = p.get('q')
        this.page = 1
        if (this.searchQuery) this.getContent()
      });
      this.getContent()
    }

  private getContent() {
    let listObs: Observable<ChartItem[]>;
    listObs = this.searchQuery 
    ? this.searchService.getAll(this.searchQuery, this.page)
    : this.movieService.get(this.page, this.isTvShows)
        
    listObs
      .pipe(take(1))
      .subscribe((res) =>{ 
        this.finished = true
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
      this.getContent();
    }
  }
}
