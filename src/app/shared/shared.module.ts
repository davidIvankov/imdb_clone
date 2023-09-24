import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SafePipe],
  exports: [CommonModule, SafePipe],
})
export class SharedModule {}
