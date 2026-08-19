import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { StaffDirectory } from './feature/staff-directory/staff-directory';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'people', component: StaffDirectory },
];
