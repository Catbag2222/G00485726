import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'movie-details', loadComponent: () => import('./movie-details/movie-details.page').then(m => m.MovieDetailsPage) },
  { path: 'details', loadComponent: () => import('./details/details.page').then(m => m.DetailsPage) },
  { path: 'favourites', loadComponent: () => import('./favourites/favourites.page').then(m => m.FavouritesPage) },
];