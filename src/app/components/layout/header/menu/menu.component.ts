import { Component, Input } from '@angular/core';
import { MenuStateService } from 'src/app/shared/services/menu-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @Input() isActive: boolean;

  constructor(private menuStateService: MenuStateService) {}

  onToggleMenu() {
    this.menuStateService.toggleMenu();
  }
}
