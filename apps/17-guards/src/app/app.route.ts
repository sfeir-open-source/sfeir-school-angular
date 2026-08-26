import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Login } from './feature/login/login';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'people', loadChildren: async () => (await import('./feature/staff-directory/staff-directory-routes')).staffDirectoryRoutes },
];
