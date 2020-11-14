import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home';
import { PeopleComponent } from './people';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
