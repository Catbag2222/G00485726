// Component is needed to create the root component of the app
import { Component } from '@angular/core';

// IonApp and IonRouterOutlet are the main Ionic components that wrap the whole app
// IonRouterOutlet is where each page gets displayed when you navigate to it
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

// addIcons lets us register icons so we can use them anywhere in the app
import { addIcons } from 'ionicons';

// We import only the icons we actually use to keep the app small
// home = the house icon, heart = the heart/favourites icon
import { home, heart } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    // Register the icons so they can be used with <ion-icon> in any page
    // Without this, the icons would not show up on screen
    // In Ionic standalone apps, icons must be registered manually like this
    // Source: https://ionicons.com and Ionic standalone documentation
    addIcons({ home, heart });
  }
}