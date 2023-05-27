import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() greyClass: boolean;
  @Output() toggleMenu = new EventEmitter<boolean>();
  onToggleMenu(){
    if (this.greyClass){
    this.toggleMenu.emit(false)  
    } else {
      this.toggleMenu.emit(true)
    }
    this.greyClass = !this.greyClass
  }

}
