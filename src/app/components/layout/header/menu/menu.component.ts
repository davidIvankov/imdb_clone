import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation-service.service';
import { ViewportService } from 'src/app/shared/services/viewport-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements AfterViewInit {
  @Input() isActive: boolean;
  @ViewChild('menu')
  myReference: ElementRef;

  constructor(
    private navigationService: NavigationService,
    private viewPortService: ViewportService
  ) {}

  ngAfterViewInit(): void {
    this.viewPortService.setMenuHeight(this.myReference);
  }

  onToggleMenu() {
    this.navigationService.toggleMenu();
  }
}
