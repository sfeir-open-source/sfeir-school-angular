import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { AuthorizationInterceptor } from './app/core/interceptors/authorization.interceptor';
import { appReducer } from './app/core/store/reducer';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: async () => await import('./app/feature/home/home.component') },
  { path: 'people', loadComponent: async () => await import('./app/feature/people/people.component') },
  {
    path: 'people/:id',
    loadChildren: async () => await import('./app/feature/update-person/update-person.route'),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthorizationInterceptor])),
    provideStore({ store: appReducer }),
    provideStoreDevtools({ maxAge: 25 }),
  ],
}).catch(console.error);
