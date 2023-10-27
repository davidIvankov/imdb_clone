import { Component, Input } from '@angular/core';
import { ChartItem } from '../../../components/charts/chart-item.model';

@Component({
  selector: 'app-charts-item',
  templateUrl: './charts-item.component.html',
  styleUrls: ['./charts-item.component.css'],
})
export class ChartsItemComponent {
  @Input() movie: ChartItem;
  @Input() index: number;

}
