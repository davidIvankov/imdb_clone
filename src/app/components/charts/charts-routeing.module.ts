import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/chart/top', pathMatch: 'full'
  },
  { path: 'top',title: 'IMDbClone Top Rated Movies' , component: ChartsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
