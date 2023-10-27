import { NgModule } from '@angular/core';
import { ChartsRoutingModule } from './charts-routeing.module';
import { SharedModule } from '@shared/shared.module';
import { ChartsComponent } from './charts.component';
import { LayoutModule } from '@shared/layout/layout.module';

@NgModule({
  declarations: [ChartsComponent],
  imports: [SharedModule, ChartsRoutingModule, LayoutModule],
  exports: [ChartsComponent, ChartsRoutingModule],
})

export class ChartsModule {}
