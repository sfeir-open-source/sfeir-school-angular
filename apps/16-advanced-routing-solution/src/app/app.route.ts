import { Routes } from '@angular/router';
import { Home } from './feature/home/home';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'people', loadChildren: async () => (await import('./feature/staff-directory/staff-directory-routes')).staffDirectoryRoutes },
];
