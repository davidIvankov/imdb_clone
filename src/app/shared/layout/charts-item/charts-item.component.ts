import { Component, Input } from '@angular/core';
import { Movie } from '../../../components/charts/movie.model';

@Component({
  selector: 'app-charts-item',
  templateUrl: './charts-item.component.html',
  styleUrls: ['./charts-item.component.css'],
})
export class ChartsItemComponent {
  @Input() movie: Movie;
  @Input() index: number;
}
