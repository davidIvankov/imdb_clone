import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe';
import { CommonModule } from '@angular/common';
import { HeightTrackingDirective } from './directives/height-tracking.directive';
import { FocusDetectorDirective } from './directives/focus-detector.directive';

@NgModule({
  declarations: [SafePipe, HeightTrackingDirective, FocusDetectorDirective],
  exports: [CommonModule, SafePipe, HeightTrackingDirective, FocusDetectorDirective],
})
export class SharedModule {}
