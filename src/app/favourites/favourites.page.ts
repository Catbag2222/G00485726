import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FavouritesPage {

  // List of favourite movies loaded from localStorage
  favourites: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  // ionViewWillEnter runs every time this page is opened
  // We use this instead of ngOnInit so it refreshes every time
  ionViewWillEnter() {
    this.loadFavourites();
  }

  // Load the favourites list from localStorage
  loadFavourites() {
    this.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
  }

  // Go to the movie details page for this movie
  goToMovie(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  goHome() { this.router.navigate(['/home']); }

  getImage(path: string) {
    return this.movieService.getImageUrl(path);
  }
}