import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationService } from './shared/navigation.service';
import { ViewPortService } from './shared/viewport.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 activeMenu: boolean;
  title = 'imdb_clone';
  scrollToTop: boolean = false;
  height: any= 'auto';

  constructor(private navigationService: NavigationService, private viewportService: ViewPortService) {}

  ngOnInit(): void {
    this.navigationService.menuActiveChange
                          .subscribe(
                            (activeMenu: boolean)=>{
                              this.activeMenu = activeMenu;
                            }
                          )
    this.viewportService.alertingMenu
                        .subscribe(
                          (height: number)=>{
                            this.height = height
                          }
                        )
    this.activeMenu = this.navigationService.menuActive;

    
  }
  

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (visualViewport.height < window.scrollY) {
      this.scrollToTop = true
    } else {
      this.scrollToTop = false
    }
  } 
  onGoBack(){
    window.scroll({ top:0 })
           
  }
  
}
