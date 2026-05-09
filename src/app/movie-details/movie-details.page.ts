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

  // The movie object passed from the home page when a poster was clicked
  movie: any;

  // Array to hold all the cast members for this movie
  cast: any[] = [];

  // Array to hold all the crew members for this movie
  crew: any[] = [];

  // Tracks whether this movie is already in the favourites list or not
  isFavourite: boolean = false;

  constructor(private movieService: MovieService, private router: Router) {
    // getCurrentNavigation gets the data passed from the previous page
    // The home page passed the movie object when the user clicked a poster
    const nav = this.router.getCurrentNavigation();
    this.movie = nav?.extras?.state?.['movie'];
  }

  // Runs automatically when the page loads
  ngOnInit() {
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
  // localStorage saves data in the browser that persists after the app closes
  checkFavourite() {
    const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    // some() checks if any item in the array matches this movie's id
    this.isFavourite = favs.some((f: any) => f.id === this.movie.id);
  }

  // Adds or removes this movie from the favourites list
  // Also saves the updated list to localStorage so it persists
  toggleFavourite() {
    // Get the current favourites list from localStorage
    let favs = JSON.parse(localStorage.getItem('favourites') || '[]');

    if (this.isFavourite) {
      // If already a favourite, remove it using filter()
      // filter() keeps everything EXCEPT the movie with this id
      favs = favs.filter((f: any) => f.id !== this.movie.id);
    } else {
      // If not a favourite, add it to the list
      favs.push(this.movie);
    }

    // Save the updated list back to localStorage
    localStorage.setItem('favourites', JSON.stringify(favs));

    // Flip the isFavourite flag to update the button text
    this.isFavourite = !this.isFavourite;
  }

  // When a cast or crew member is clicked, go to the details page
  // Pass the person object so the details page can use it
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