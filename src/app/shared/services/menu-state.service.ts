import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  menuActiveChange = new Subject<boolean>();
  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
    this.menuActiveChange.next(this.menuActive);
  }
}
