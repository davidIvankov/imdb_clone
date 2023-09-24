import { NgModule } from '@angular/core';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieListItemComponent } from './movie-list/movie-list-item/movie-list-item.component';
import { MovieComponent } from './movie-details/movie.component';
import { MoviesRoutingModule } from './movies-routeing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MovieListComponent, MovieListItemComponent, MovieComponent],
  imports: [SharedModule],
  exports: [
    MovieListComponent,
    MovieListItemComponent,
    MovieComponent,
    MoviesRoutingModule,
  ],
})
export class MoviesModule {}
