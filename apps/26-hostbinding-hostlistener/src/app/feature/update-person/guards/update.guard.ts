import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';

export function updateGuard(route: ActivatedRouteSnapshot): boolean | UrlTree {
  const idPerson = route.paramMap.get('id');
  const patternPeopleId = /[a-z0-9]{24}/;
  return patternPeopleId.test(idPerson) ? true : inject(Router).createUrlTree(['home']);
}
