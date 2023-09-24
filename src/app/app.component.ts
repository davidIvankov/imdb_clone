import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationService } from './shared/services/navigation-service.service';
import { ViewportService } from './shared/services/viewport-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  shouldActiveMenu: boolean;
  title = 'imdb_clone';
  shouldScrollToTop: boolean = false;
  height: any = 'auto';

  constructor(
    private navigationService: NavigationService,
    private viewportService: ViewportService
  ) {}

  ngOnInit(): void {
    this.navigationService.menuActiveChange.subscribe((activeMenu: boolean) => {
      this.shouldActiveMenu = activeMenu;
    });
    this.viewportService.alertingMenu.subscribe((height: number) => {
      this.height = height;
    });
    this.shouldActiveMenu = this.navigationService.menuActive;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (visualViewport.height < window.scrollY) {
      this.shouldScrollToTop = true;
    } else {
      this.shouldScrollToTop = false;
    }
  }
  onGoBack() {
    window.scroll({ top: 0 });
  }
}
