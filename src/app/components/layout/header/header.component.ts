import { Component, Input } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() greyClass: boolean;

  constructor(private navigationService: NavigationService) {}

  onToggleMenu() {
    this.navigationService.toggleMenu();
  }
}
