import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class UpdateGuard  {
  static patternPeopleId = /[a-z0-9]{24}/;

  constructor(private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
    const idPerson = route.paramMap.get('id');
    return UpdateGuard.patternPeopleId.test(idPerson) ? true : this.router.navigate(['home']);
  }
}
