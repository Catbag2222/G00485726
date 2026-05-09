import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetailsPage implements OnInit {

  // The person object passed from the movie details page
  person: any;

  // Full details about the person from the API
  personDetails: any;

  // List of movies this person has appeared in
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {
    // Get the person data that was passed from the movie details page
    const nav = this.router.getCurrentNavigation();
    this.person = nav?.extras?.state?.['person'];
  }

  ngOnInit() {
    // Get the person's full details from the API
    this.movieService.getPerson(this.person.id).subscribe(data => {
      this.personDetails = data;
    });

    // Get the list of movies this person has been in
    this.movieService.getPersonMovies(this.person.id).subscribe(data => {
      this.movies = data.cast;
    });
  }

  // When a movie is clicked go to movie details page
  goToMovie(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  goHome() { this.router.navigate(['/home']); }
  goToFavourites() { this.router.navigate(['/favourites']); }

  getImage(path: string) {
    return this.movieService.getImageUrl(path);
  }
}