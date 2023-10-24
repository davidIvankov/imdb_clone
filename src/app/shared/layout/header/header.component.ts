import { 
  AfterViewInit, 
  Component, 
  ElementRef, 
  Input, 
  OnDestroy, 
  Output, 
  ViewChild 
} from '@angular/core';
import { MenuStateService } from '../../../shared/services/menu-state.service';
import { SearchService } from '@shared/services/search.service';
import { Movie } from 'app/components/charts/movie.model';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { FocusDetectorDirective } from '@shared/directives/focus-detector.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy, AfterViewInit {
  @Input() greyClass: boolean;
  @Output() movies: Movie[];
  shouldDisplayDropdown: boolean;
  focusInDropdown: boolean = false;
  hoverOnDropdown: boolean = false;
  @ViewChild('ip') ip: FocusDetectorDirective;
  @ViewChild('search') searchInput: ElementRef;
  searchQuery: string;
  subscriptions = new Subscription()
  
  constructor(
    private menuStateService: MenuStateService, 
    private searchService: SearchService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
   this.ip.isFocus.subscribe((e)=>{
      if (e) {
        this.shouldDisplayDropdown = this.searchInput.nativeElement.value ? true : false
        this.hoverOnDropdown = false
      } else {
        setTimeout(()=>this.shouldDisplayDropdown = this.focusInDropdown ? true : false, 1)
        
      }
   })
  }

  onDropdownFocus(e: boolean) {
    this.focusInDropdown = e
  }

  onDestroyDropdown() {
    this.shouldDisplayDropdown = false
    this.searchInput.nativeElement.value = ''
  }

  onKeyUp(e) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === 'ArrowUp') return
    this.shouldDisplayDropdown = this.searchInput.nativeElement.value ? true : false
    this.searchQuery = this.searchInput.nativeElement.value
    this.subscriptions.add(this.searchService.getDropdown(this.searchQuery)
    .subscribe((res) => this.movies = res))
  }

  onSearch() {
    if (this.hoverOnDropdown) return
    this.onClickSearch()
  }

  onClickSearch() {
    this.shouldDisplayDropdown = false;
    this.searchQuery = this.searchInput.nativeElement.value;
    window.scroll({ top: 0 });
    this.router.navigate(['find'], {queryParams: {q: this.searchQuery}})
    
  }

  onIsHovered(e: boolean) {
    console.log(e)
    this.hoverOnDropdown = e;
  }

  onToggleMenu() {
    this.menuStateService.toggleMenu();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
