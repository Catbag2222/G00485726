import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MovieService {

  private apiKey = 'db570a89a39787cc4cc354c29e30a7dd';
  private base = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getTrending() {
    return this.http.get<any>(`${this.base}/trending/movie/day?api_key=${this.apiKey}`);
  }

  searchMovies(query: string) {
    return this.http.get<any>(`${this.base}/search/movie?query=${query}&api_key=${this.apiKey}`);
  }

  getCredits(movieId: number) {
    return this.http.get<any>(`${this.base}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  getPerson(personId: number) {
    return this.http.get<any>(`${this.base}/person/${personId}?api_key=${this.apiKey}`);
  }

  getPersonMovies(personId: number) {
    return this.http.get<any>(`${this.base}/person/${personId}/movie_credits?api_key=${this.apiKey}`);
  }

  getImageUrl(path: string) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}