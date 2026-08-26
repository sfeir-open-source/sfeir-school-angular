import { Routes } from '@angular/router';
import { authenticatedGuard, notAuthenticatedGuard } from './core/guards/authenticated';
import { Home } from './feature/home/home';
import { Login } from './feature/login/login';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [notAuthenticatedGuard] },
  { path: 'home', component: Home, canActivate: [authenticatedGuard] },
  {
    path: 'people',
    loadChildren: async () => (await import('./feature/staff-directory/staff-directory-routes')).staffDirectoryRoutes,
    canActivate: [authenticatedGuard],
    canMatch: [authenticatedGuard],
  },
];
