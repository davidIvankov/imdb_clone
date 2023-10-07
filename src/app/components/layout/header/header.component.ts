import { Component, Input } from '@angular/core';
import { MenuStateService } from '../../../shared/services/menu-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() greyClass: boolean;

  constructor(private menuStateService: MenuStateService) {}

  onToggleMenu() {
    this.menuStateService.toggleMenu();
  }
}
