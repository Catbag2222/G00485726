// Component is needed to create a page in Angular
// We don't need OnInit here because we use ionViewWillEnter instead
import { Component } from '@angular/core';

// Router lets us navigate between pages
import { Router } from '@angular/router';

// Our own service that handles all the API calls to TMDB
import { MovieService } from '../services/movie';

// IonicModule gives us all the Ionic components like ion-button, ion-header etc
import { IonicModule } from '@ionic/angular';

// CommonModule gives us *ngFor and *ngIf in the HTML
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FavouritesPage {

  // List of favourite movies loaded from localStorage
  // Starts as an empty array and gets filled when the page opens
  favourites: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  // ionViewWillEnter runs every time this page is opened or navigated back to
  // We use this instead of ngOnInit because ngOnInit only runs once
  // This way the list always refreshes when you come back to this page
  ionViewWillEnter() {
    this.loadFavourites();
  }

  // Loads the favourites list from localStorage
  // localStorage is built into the browser and saves data permanently
  // even after the app is closed
  // If there are no favourites saved yet, it defaults to an empty array []
  loadFavourites() {
    this.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
  }

  // When the Details button is clicked, go to the movie details page
  // Pass the movie object so the movie details page can display it
  goToMovie(movie: any) {
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  // Navigate back to the home page
  goHome() { this.router.navigate(['/home']); }

  // Builds the full image URL by passing the path to the service
  getImage(path: string) {
    return this.movieService.getImageUrl(path);
  }
}