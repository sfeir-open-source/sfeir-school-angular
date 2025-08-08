import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';

const regexId = /[a-z0-9]{24}/;

export const updatePersonGuard: CanMatchFn = (route, segments) => {
  const id = segments[1].path;
  return regexId.test(id) ? true : inject(Router).createUrlTree(['/home']);
};
