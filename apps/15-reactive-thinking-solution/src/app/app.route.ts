import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { PersonDetails } from './feature/person-details/person-details';
import { StaffDirectory } from './feature/staff-directory/staff-directory';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'people', component: StaffDirectory },
  { path: 'people/:id', component: PersonDetails },
];
