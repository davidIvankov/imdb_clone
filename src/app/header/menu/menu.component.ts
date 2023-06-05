import { Component, Input, ViewChild, ElementRef, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import { NavigationService } from 'src/app/shared/navigation.service';
import { ViewPortService } from 'src/app/shared/viewport.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements AfterViewInit{
  @Input() greyClass: boolean;
  @ViewChild('menu')
   myReference: ElementRef;

  constructor(private navigationService: NavigationService,private viewPortService: ViewPortService) {}

  ngAfterViewInit(): void {
    this.viewPortService.setMenuHeight(this.myReference);
  }

  onToggleMenu(){
    this.navigationService.toggleMenu();
  }

}
