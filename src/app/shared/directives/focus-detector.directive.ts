import { Directive, HostListener, HostBinding,  } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appFocusDetectorDirective]',
  exportAs: 'detectFocus'
})
export class FocusDetectorDirective {
  focus = new Subject<boolean>()

  @HostBinding('class.is-focus')
  get isFocus() {
    return this.focus
  }
  constructor() { }

  @HostListener('focus')
  onFocus() {
    this.focus.next(true)
  }

  @HostListener('blur')
  onBlur() {
    this.focus.next(false);
  }

}

