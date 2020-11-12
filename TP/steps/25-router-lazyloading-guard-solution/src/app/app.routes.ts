import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home';
import { AccessSecretGuard } from './access-secret-guard/access-secret.guard';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'secret',
    loadChildren: () => import('./secret/secret.module').then(mod => mod.SecretModule),
    canLoad: [AccessSecretGuard]
  }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
