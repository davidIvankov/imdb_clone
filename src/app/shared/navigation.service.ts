import { EventEmitter, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class NavigationService {
    menuActiveChange = new EventEmitter<boolean>()
    menuActive: boolean= false;
    constructor() {}

    toggleMenu(){
        this.menuActive = !this.menuActive
        this.menuActiveChange.emit(this.menuActive)
    }

}