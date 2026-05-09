// We need Injectable so this service can be used by any page in the app
import { Injectable } from '@angular/core';

// HttpClient lets us make requests to the internet (API calls)
import { HttpClient } from '@angular/common/http';

// providedIn: 'root' means this service is available everywhere in the app
// without needing to add it to each page separately
@Injectable({ providedIn: 'root' })
export class MovieService {

  // My TMDB API key - this is needed to access themoviedb.org API
  // Source: https://www.themoviedb.org/settings/api
  private apiKey = 'db570a89a39787cc4cc354c29e30a7dd';

  // The base URL that all API calls start with
  private base = 'https://api.themoviedb.org/3';

  // HttpClient is injected here so we can use it to make API calls
  constructor(private http: HttpClient) {}

  // Gets today's trending movies from TMDB
  // API docs: https://developers.themoviedb.org/3/trending/get-trending
  getTrending() {
    return this.http.get<any>(`${this.base}/trending/movie/day?api_key=${this.apiKey}`);
  }

  // Searches for movies by name
  // query is the text the user typed in the search box
  // API docs: https://developers.themoviedb.org/3/search/search-movies
  searchMovies(query: string) {
    return this.http.get<any>(`${this.base}/search/movie?query=${query}&api_key=${this.apiKey}`);
  }

  // Gets the cast and crew for a specific movie
  // movieId is the unique ID number of the movie from TMDB
  // API docs: https://developers.themoviedb.org/3/movies/get-movie-credits
  getCredits(movieId: number) {
    return this.http.get<any>(`${this.base}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  // Gets full details about a person (actor or crew member)
  // personId is the unique ID number of the person from TMDB
  // API docs: https://developers.themoviedb.org/3/people/get-person-details
  getPerson(personId: number) {
    return this.http.get<any>(`${this.base}/person/${personId}?api_key=${this.apiKey}`);
  }

  // Gets all the movies a person has appeared in
  // personId is the unique ID number of the person from TMDB
  // API docs: https://developers.themoviedb.org/3/people/get-person-movie-credits
  getPersonMovies(personId: number) {
    return this.http.get<any>(`${this.base}/person/${personId}/movie_credits?api_key=${this.apiKey}`);
  }

  // Builds the full image URL from just the path returned by the API
  // The API only returns a partial path like "/abc123.jpg"
  // We need to add the base image URL in front of it
  // Source: https://developers.themoviedb.org/3/getting-started/images
  getImageUrl(path: string) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}