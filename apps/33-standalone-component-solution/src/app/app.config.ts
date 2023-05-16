import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { appReducer } from './core/store/reducer';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: async () => await import('./feature/home/home.component') },
  { path: 'people', loadComponent: async () => await import('./feature/people/people.component') },
  {
    path: 'people/:id',
    loadChildren: async () => await import('./feature/update-person/update-person.route'),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthorizationInterceptor])),
    provideStore({ store: appReducer }),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
