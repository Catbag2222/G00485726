import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  // This array will hold all the movies to display
  movies: any[] = [];

  // This holds whatever the user types in the search box
  searchText: string = '';

  // This is the heading shown above the movie list
  heading: string = "Today's Trending Movies";

  // Router lets us navigate to other pages
  // MovieService lets us call the API
  constructor(private movieService: MovieService, private router: Router) {}

  // ngOnInit runs automatically when the page loads
  ngOnInit() {
    this.loadTrending();
  }

  // Call the API to get trending movies and save them
  loadTrending() {
    this.movieService.getTrending().subscribe(data => {
      this.movies = data.results;
      this.heading = "Today's Trending Movies";
    });
  }

  // Called when the Search button is clicked
  search() {
    // If search box is empty, just show trending
    if (this.searchText.trim() === '') {
      this.loadTrending();
    } else {
      // Otherwise search for movies matching what they typed
      this.movieService.searchMovies(this.searchText).subscribe(data => {
        this.movies = data.results;
        this.heading = this.searchText + ' Movies';
      });
    }
  }

  // When a movie is clicked, go to movie-details page and pass the movie data
  goToMovie(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  // Go to the favourites page
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  // Build the full image URL using the service
  getImage(path: string) {
    return this.movieService.getImageUrl(path);
  }
}