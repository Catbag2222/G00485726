// bootstrapApplication starts the whole Angular app
import { bootstrapApplication } from '@angular/platform-browser';

// These are needed for routing (navigation between pages)
// RouteReuseStrategy decides when to reuse pages instead of recreating them
// provideRouter sets up the router with our routes
// withPreloading and PreloadAllModules loads all pages in the background for speed
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';

// IonicRouteStrategy is Ionic's own version of RouteReuseStrategy
// provideIonicAngular sets up Ionic for the whole app
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// provideHttpClient lets the whole app make HTTP requests to APIs
// This is needed for our MovieService to call the TMDB API
import { provideHttpClient } from '@angular/common/http';

// Our routes array that defines all the pages in the app
import { routes } from './app/app.routes';

// The root component that wraps the whole app
import { AppComponent } from './app/app.component';

// This starts the app using AppComponent as the root
// providers is a list of services available to the whole app
bootstrapApplication(AppComponent, {
  providers: [
    // Use Ionic's route strategy instead of Angular's default one
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Set up Ionic for the whole app
    provideIonicAngular(),

    // Set up routing with all our page routes
    // PreloadAllModules loads all pages in the background so navigation is faster
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Set up HttpClient so we can make API calls in our MovieService
    provideHttpClient(),
  ],
});