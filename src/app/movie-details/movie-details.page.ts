// Component and OnInit are needed to create a page in Angular
import { Component, OnInit } from '@angular/core';

// Router lets us navigate between pages and read data passed from other pages
import { Router } from '@angular/router';

// Our own service that handles all the API calls to TMDB
import { MovieService } from '../services/movie';

// IonicModule gives us all the Ionic components like ion-button, ion-header etc
import { IonicModule } from '@ionic/angular';

// CommonModule gives us *ngFor and *ngIf in the HTML
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MovieDetailsPage implements OnInit {

  // The movie object - loaded from router state or localStorage
  movie: any;

  // Array to hold all the cast members for this movie
  cast: any[] = [];

  // Array to hold all the crew members for this movie
  crew: any[] = [];

  // Tracks whether this movie is already in the favourites list or not
  isFavourite: boolean = false;

  constructor(private movieService: MovieService, private router: Router) {
    // First try to get the movie from router state (when coming from home page)
    const nav = this.router.getCurrentNavigation();
    this.movie = nav?.extras?.state?.['movie'];

    // If no router state, get it from localStorage
    // This happens when coming from the details page or favourites page
    if (!this.movie) {
      this.movie = JSON.parse(localStorage.getItem('selectedMovie') || '{}');
    }
  }

  // Runs automatically when the page first loads
  ngOnInit() {
    this.loadCredits();
    this.checkFavourite();
  }

  // ionViewWillEnter runs every time the page is navigated to
  // This fixes the issue where old cast/crew data was showing from a previous movie
  ionViewWillEnter() {
    // Get the latest selected movie from localStorage each time the page opens
    const stored = localStorage.getItem('selectedMovie');
    if (stored) {
      this.movie = JSON.parse(stored);
    }

    // Clear the old cast and crew before loading new ones
    this.cast = [];
    this.crew = [];
    this.loadCredits();
    this.checkFavourite();
  }

  // Calls the TMDB API to get cast and crew for this movie
  // Uses the movie id to find the right movie
  loadCredits() {
    this.movieService.getCredits(this.movie.id).subscribe(data => {
      this.cast = data.cast;
      this.crew = data.crew;
    });
  }

  // Checks localStorage to see if this movie is already a favourite
  checkFavourite() {
    const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    // some() checks if any item in the array matches this movie's id
    this.isFavourite = favs.some((f: any) => f.id === this.movie.id);
  }

  // Adds or removes this movie from the favourites list
  toggleFavourite() {
    let favs = JSON.parse(localStorage.getItem('favourites') || '[]');

    if (this.isFavourite) {
      // filter() keeps everything EXCEPT the movie with this id
      favs = favs.filter((f: any) => f.id !== this.movie.id);
    } else {
      favs.push(this.movie);
    }

    // Save the updated list back to localStorage
    localStorage.setItem('favourites', JSON.stringify(favs));
    this.isFavourite = !this.isFavourite;
  }

  // When a cast or crew member is clicked, go to the details page
  goToPerson(person: any) {
    this.router.navigate(['/details'], { state: { person } });
  }

  // Navigate back to the home page
  goHome() { this.router.navigate(['/home']); }

  // Navigate to the favourites page
  goToFavourites() { this.router.navigate(['/favourites']); }

  // Builds the full image URL by passing the path to the service
  getImage(path: string) {
    return this.movieService.getImageUrl(path);
  }
}