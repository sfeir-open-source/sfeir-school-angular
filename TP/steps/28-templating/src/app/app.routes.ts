import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/index';
import { PeopleComponent } from './people/index';
import { UpdateComponent } from './update/index';
import { UserDetailsResolver } from './shared/resolver/user-details.resolver';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'edit/:id', component: UpdateComponent, resolve: { user: UserDetailsResolver } }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
