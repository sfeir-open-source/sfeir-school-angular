import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home';
import { PeopleComponent } from './people';
import { UpdateComponent } from './update';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'edit/:id', component: UpdateComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
