import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/index';
import { SecretComponent } from './secret';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'secret', component: SecretComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
