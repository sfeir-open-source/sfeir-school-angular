import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home';
import { PeopleComponent } from './people';
import { UpdateComponent } from './update';
import { UserDetailsResolver } from './shared/resolver/user-details.resolver';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'edit/:id', component: UpdateComponent, resolve: { user: UserDetailsResolver } }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
