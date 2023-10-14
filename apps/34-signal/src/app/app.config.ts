import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { appReducer } from './core/store/reducer';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: async () => (await import('./feature/home/home.component')).HomeComponent },
  { path: 'people', loadComponent: async () => (await import('./feature/people/people.component')).PeopleComponent },
  {
    path: 'people/:id',
    loadChildren: async () => await import('./feature/update-person/update-person.route'),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthorizationInterceptor])),
    provideStore({ store: appReducer }),
    provideStoreDevtools({ maxAge: 25 }),
    importProvidersFrom(MatDialogModule),
  ],
};
