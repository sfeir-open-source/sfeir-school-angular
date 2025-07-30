import { provideHttpClient, withFetch } from '@angular/common/http';
import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/feature/home/home.component';
import { PeopleComponent } from './app/feature/people/people.component';
import { UpdatePerson } from './app/feature/update-person/update-person';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'people/:id', component: UpdatePerson },
];

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection(), provideRouter(ROUTES, withComponentInputBinding()), provideHttpClient(withFetch())],
}).catch(console.error);
