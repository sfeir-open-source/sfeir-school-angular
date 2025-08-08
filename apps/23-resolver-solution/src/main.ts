import { provideHttpClient, withFetch } from '@angular/common/http';
import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { personDetailsResolver, updatePersonGuard } from './app/core/guards/main-routing-guard';
import { HomeComponent } from './app/feature/home/home.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'people',
    loadComponent: async () => (await import('./app/feature/people/people.component')).PeopleComponent,
  },
  {
    path: 'people/:id',
    loadComponent: async () => (await import('./app/feature/update-person/update-person')).UpdatePerson,
    canMatch: [updatePersonGuard],
    resolve: { person: personDetailsResolver },
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection(), provideRouter(ROUTES, withComponentInputBinding()), provideHttpClient(withFetch())],
}).catch(console.error);
