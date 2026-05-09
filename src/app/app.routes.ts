// Routes is needed to define the navigation paths in the app
import { Routes } from '@angular/router';

// This array defines all the pages in the app and their URLs
// Each route maps a URL path to a page component
export const routes: Routes = [

  // When the app first opens with no path, redirect to the home page
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // localhost:8100/home loads the HomePage component
  // loadComponent loads the page lazily - only when needed, saves memory
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },

  // localhost:8100/movie-details loads the MovieDetailsPage component
  // This page is opened when a movie poster is clicked on the home page
  { path: 'movie-details', loadComponent: () => import('./movie-details/movie-details.page').then(m => m.MovieDetailsPage) },

  // localhost:8100/details loads the DetailsPage component
  // This page is opened when a cast or crew member is clicked
  { path: 'details', loadComponent: () => import('./details/details.page').then(m => m.DetailsPage) },

  // localhost:8100/favourites loads the FavouritesPage component
  // This page is opened when the heart icon is clicked
  { path: 'favourites', loadComponent: () => import('./favourites/favourites.page').then(m => m.FavouritesPage) },

];