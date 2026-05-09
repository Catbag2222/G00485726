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
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetailsPage implements OnInit {

  // The basic person object passed from the movie details page
  // This contains id, name, profile_path etc from the credits API
  person: any;

  // The full details about the person fetched from the person API
  // This contains biography, birthday, also_known_as etc
  personDetails: any;

  // List of movies this person has appeared in
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {
    // getCurrentNavigation gets the data passed from the previous page
    // The movie details page passed the person object when they were clicked
    const nav = this.router.getCurrentNavigation();
    this.person = nav?.extras?.state?.['person'];
  }

  // Runs automatically when the page loads
  // We make two separate API calls here - one for person details, one for their movies
  ngOnInit() {
    // Call the TMDB API to get full details about this person
    // Uses the person's id to find the right person
    this.movieService.getPerson(this.person.id).subscribe(data => {
      this.personDetails = data;
    });

    // Call the TMDB API to get all movies this person has appeared in
    // data.cast gives us the list of movies they acted in
    this.movieService.getPersonMovies(this.person.id).subscribe(data => {
      this.movies = data.cast;
    });
  }

  // When a movie in the list is clicked, go to the movie details page
  // Pass the movie object so the movie details page can use it
  goToMovie(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
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