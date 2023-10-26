import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ItemDetailes } from './item-detailes.model';
import { MoviesService } from '../../shared/services/movies.service';
import { HeightTrackingDirective } from '@shared/directives/height-tracking.directive';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css'],
})
export class TitlesComponent implements OnInit {
  height: number;
  movieDetails: ItemDetailes;
  private id: number;
  finished: boolean;
  isTvShow: boolean = false;
  @ViewChild(HeightTrackingDirective) trackedEl: HeightTrackingDirective;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private titleService: Title,
  ) {
    this.route.queryParams.subscribe((e: Params)=>{
      this.isTvShow = e['TvShow'] === 'true'
    })
  }
  
   
  ngOnInit(): void {
   this.route.params.subscribe(e=>{
    window.scroll({ top: 0 });
    this.id = e['id']
    this.movieService
      .getDetailes(this.id, this.isTvShow)
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
