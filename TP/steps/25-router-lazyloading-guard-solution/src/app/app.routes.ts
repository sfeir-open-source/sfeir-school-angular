import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/index';
import { AccessSecretGuard } from './access-secret-guard/access-secret.guard';
import { UserResolverService } from './resolver/user-resolver.service';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, resolve: { users: UserResolverService } },
  {
    path: 'secret',
    loadChildren: () => import('./secret/secret.module').then(mod => mod.SecretModule),
    canLoad: [AccessSecretGuard]
  }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true, relativeLinkResolution: 'legacy' });
