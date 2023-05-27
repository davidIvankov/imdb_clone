import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() greyClass: boolean;
  @Output() toggleMenu = new EventEmitter<boolean>();


  onToggleMenu(){
    console.log(this.greyClass)
    if (this.greyClass){
      this.toggleMenu.emit(false)
    } else {
      this.toggleMenu.emit(true)
    }
    this.greyClass = !this.greyClass

  }

}
