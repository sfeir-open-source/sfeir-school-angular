import { inject } from '@angular/core';
import { Router, type CanMatchFn, type ResolveFn } from '@angular/router';
import type { Observable } from 'rxjs';
import type { People } from '../../shared/models/people.model';
import { PeopleService } from '../providers/people.service';

const regexId = /[a-z0-9]{24}/;

export const updatePersonGuard: CanMatchFn = (route, segments) => {
  const id = segments[1].path;
  return regexId.test(id) ? true : inject(Router).createUrlTree(['/home']);
};

export const personDetailsResolver: ResolveFn<Observable<People>> = route => {
  const id = route.paramMap.get('id');
  return inject(PeopleService).getPersonDetails(id);
};
