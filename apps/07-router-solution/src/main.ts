import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { HomeComponent } from './app/feature/home/home.component';
import { provideRouter, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(ROUTES), provideHttpClient(withFetch())],
}).catch(console.error);
