import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appHeightTrackingDirective]',
})
export class HeightTrackingDirective implements OnDestroy {
  private changes: MutationObserver;
  @Output() heightChange = new EventEmitter();
  constructor(private elementRef: ElementRef) {
    this.changes = new MutationObserver(() => {
      if (this.elementRef) {
        this.heightChange.emit(this.elementRef.nativeElement.offsetHeight);
      }
    });
    this.changes.observe(this.elementRef.nativeElement, {
      attributes: true,
      childList: true,
      characterData: true,
    });
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
