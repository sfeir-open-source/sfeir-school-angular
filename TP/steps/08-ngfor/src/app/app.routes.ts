import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/index';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true, relativeLinkResolution: 'legacy' });
