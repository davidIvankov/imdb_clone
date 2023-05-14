import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.css']
})
export class MovieListItemComponent implements OnInit {
  @Input() movie: Movie;
  @Input() index: number;
  imgPath: string;
  imgAlt: string;
  detailsMoviePath: string;
  ngOnInit(): void {
    this.imgPath= `https://image.tmdb.org/t/p/w500${this.movie.poster}`
    this.imgAlt= `${this.movie.title} poster`
    this.detailsMoviePath =`movie/${this.movie.id}`
  }
  


}
