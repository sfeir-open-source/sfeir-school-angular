import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { WINDOW } from '../provider/window';

const isAuthenticated: (
  callback: (authorization: string | null, router: Router) => ReturnType<CanActivateFn | CanMatchFn | CanActivateChildFn>,
) => CanActivateFn | CanMatchFn | CanActivateChildFn = callback => {
  return () => {
    const sessionStorage = inject(WINDOW).sessionStorage;
    const router = inject(Router);
    const authorization = sessionStorage.getItem('Authorization');
    return callback(authorization, router);
  };
};

export const notAuthenticatedGuard = isAuthenticated((authorization, router) => {
  if (!authorization) {
    return true;
  }
  return router.createUrlTree(['/people']);
});

export const authenticatedGuard = isAuthenticated((authorization, router) => {
  if (authorization) {
    return true;
  }
  return router.createUrlTree(['/login']);
});
