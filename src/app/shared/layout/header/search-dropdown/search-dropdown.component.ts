import { 
  Component, 
  ElementRef, 
  EventEmitter, 
  HostListener, 
  Input, 
  OnDestroy, 
  Output, 
  QueryList,  
  ViewChildren
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '@shared/services/search.service';
import { ChartItem } from 'app/components/charts/chart-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.css']
})
export class SearchDropdownComponent implements OnDestroy {
  @Input() movies: ChartItem[]; 
  @Input() searchQuery: string;
  @Output() find = new EventEmitter<void>();
  @Output() focused = new EventEmitter<boolean>();
  @Output() isHovered = new EventEmitter<boolean>(false);
  @Output() shouldDestroyComponent = new EventEmitter<void>();
  subscriptions = new Subscription();
  @ViewChildren('searchList') searchList: QueryList<ElementRef>;
  selectedItem: ElementRef
  index: number = -1;

  isLoading: boolean = false;

  constructor(private searchService: SearchService,private router: Router,private route: ActivatedRoute) {
    
    this.subscriptions.add(this.searchService.isLoading.subscribe((bool)=> this.isLoading = bool))
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): any {
    switch(event.key) {
      case 'Enter':
        this.enterKeyHandling()
      break;
      case 'ArrowUp':
        this.arrowUpHandling()
      break;
      case 'ArrowDown':
        this.arrowDownHandling()
      break;
    }
  }

  private enterKeyHandling() {
        
        if (!this.selectedItem){ 
          this.find.emit()
          this.isHovered.emit(false)
        }
        else {
          
        this.router.navigate(
          ['/title/'+ this.movies[this.index].id], 
          {queryParams: {TvShow: this.movies[this.index].isTvShow}, relativeTo: this.route},
        )
        this.shouldDestroyComponent.emit()
        }
  }

  private arrowUpHandling() {
    this.isHovered.emit(true)
    if (this.selectedItem) this.selectedItem.nativeElement.classList.remove('hovered')
    this.index = this.index === 0 ? this.searchList.toArray().length - 1 : this.index - 1
    this.selectedItem = this.searchList.toArray()[this.index]
    this.selectedItem.nativeElement.classList.add('hovered')
  }

  private arrowDownHandling() {
    this.isHovered.emit(true)
    if (this.selectedItem) this.selectedItem.nativeElement.classList.remove('hovered')
    this.index = this.index === this.searchList.toArray().length - 1 ? 0 : this.index + 1
    this.selectedItem = this.searchList.toArray()[this.index]
    this.selectedItem.nativeElement.classList.add('hovered')
  }

  trackHoveredIndex(e: Event) {
    this.searchList.find(el=>el.nativeElement.href === e.target['href'])
    this.selectedItem = this.searchList.find(el=>el.nativeElement.href === e.target['href'])
    this.searchList.forEach((el, i)=>{
      el.nativeElement.classList.remove('hovered')
      if  (el.nativeElement.href === e.target['href']){
        this.index = i
      }
    })
  }

  onEnterMouse() {
    this.isHovered.emit(true)
  }

  onLeave(e: Event) {
    this.isHovered.emit(false)
  }

  onFocusIn(){
    this.focused.emit(true)
  }

  onFocusOut() {
    this.focused.emit(false)
    this.isHovered.emit(false)
  }

  onFind() {
   this.find.emit()
  }

  ngOnDestroy() {
   this.subscriptions.unsubscribe()
  }
}
