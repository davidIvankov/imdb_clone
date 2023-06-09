import { EventEmitter, Injectable, ElementRef } from "@angular/core";
 @Injectable({providedIn: 'root'})
 export class ViewportService {
    alertingMenu= new EventEmitter<number>();
   private menuHeigth: number;
    setMenuHeight(element: ElementRef) {
        this.menuHeigth = element.nativeElement.offsetHeight;
        this.alertingMenu.emit(this.menuHeigth)
    }
}