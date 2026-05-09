import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MovieDetailsPage implements OnInit {

  // The movie object passed from the home page
  movie: any;

  // Arrays to hold cast and crew members
  cast: any[] = [];
  crew: any[] = [];

  // Tracks if this movie is in favourites or not
  isFavourite: boolean = false;

  constructor(private movieService: MovieService, private router: Router) {
    // Get the movie data that was passed from the home page
    const nav = this.router.getCurrentNavigation();
    this.movie = nav?.extras?.state?.['movie'];
  }

  ngOnInit() {
    this.loadCredits();
    this.checkFavourite();
  }

  // Get the cast and crew for this movie from the API
  loadCredits() {
    this.movieService.getCredits(this.movie.id).subscribe(data => {
      this.cast = data.cast;
      this.crew = data.crew;
    });
  }

  // Check if this movie is already in our favourites list
  checkFavourite() {
    const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    this.isFavourite = favs.some((f: any) => f.id === this.movie.id);
  }

  // Add or remove this movie from favourites
  toggleFavourite() {
    let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    if (this.isFavourite) {
      favs = favs.filter((f: any) => f.id !== this.movie.id);
    } else {
      favs.push(this.movie);
    }
    localStorage.setItem('favourites', JSON.stringify(favs));
    this.isFavourite = !this.isFavourite;
  }

  goToPerson(person: any) {
    this.router.navigate(['/details'], { state: { person } });
  }

  goHome() { this.router.navigate(['/home']); }
  goToFavourites() { this.router.navigate(['/favourites']); }

  getImage(path: string) {
    return this.movieService.getImageUrl(path);
  }
}