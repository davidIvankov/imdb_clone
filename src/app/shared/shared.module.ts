import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe';
import { CommonModule } from '@angular/common';
import { HeightTrackingDirective } from './height-tracking.directive';

@NgModule({
  declarations: [SafePipe, HeightTrackingDirective],
  exports: [CommonModule, SafePipe, HeightTrackingDirective],
})
export class SharedModule {}
