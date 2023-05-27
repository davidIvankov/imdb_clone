import { Component, HostListener, Output, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() greyClass: boolean = false;
  title = 'imdb_clone';
  scrollToTop: boolean = false
  

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
  grey(event: boolean){
    this.greyClass = event;
  }
  
}
