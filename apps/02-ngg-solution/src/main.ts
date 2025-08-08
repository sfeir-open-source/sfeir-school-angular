import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './app/feature/home/home.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(HomeComponent, { providers: [provideZonelessChangeDetection()] }).catch(console.error);
