import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MenuStateService } from './shared/services/menu-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  shouldActiveMenu: boolean;
  shouldScrollToTop: boolean = false;
  height: any = 'auto';
  subscriptions: Subscription = new Subscription();

  constructor(private menuStateService: MenuStateService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.menuStateService.menuActiveChange.subscribe(
        (activeMenu: boolean) => {
          this.shouldActiveMenu = activeMenu;
        }
      )
    );
    this.shouldActiveMenu = this.menuStateService.menuActive;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.shouldScrollToTop =
      visualViewport.height < window.scrollY ? true : false;
  }
  onGoBack() {
    window.scroll({ top: 0 });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
