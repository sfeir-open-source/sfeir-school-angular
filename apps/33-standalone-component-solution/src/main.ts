import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { CoreModule } from './app/core/core.module';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: async () => (await import('./app/feature/home/home.component')).HomeComponent },
  { path: 'people', loadComponent: async () => (await import('./app/feature/people/people.component')).PeopleComponent },
  {
    path: 'people/:id',
    loadChildren: async () => (await import('./app/feature/update-person/update-person.route')).UPDATE_ROUTES,
  },
];

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserAnimationsModule), importProvidersFrom(CoreModule), importProvidersFrom(RouterModule.forRoot(APP_ROUTES))],
}).catch(console.error);
