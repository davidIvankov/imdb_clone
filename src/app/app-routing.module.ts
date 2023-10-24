import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './components/charts/charts.component';
import { ErrorComponent } from '@shared/layout/error/error.component';


const routes: Routes = [
  { path: '', redirectTo: '/chart/top', pathMatch: 'full' },
  {
    path: 'title',
    loadChildren: () => 
    import('./components/titles/titles.module').then((m)=> m.TitlesModule)
  },
  {
    path: 'chart',
    loadChildren: () =>
      import('./components/charts/charts.module').then((m) => m.ChartsModule),
  },
  {
    path: 'find',
    title:'Find - IMDbClone',
    component: ChartsComponent
  },
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
