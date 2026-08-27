import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Person } from '@sfeir/types';
import { People } from '../../../core/provider/people';

export const PersonDetailsResolver: ResolveFn<Person> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id') as string;
  return inject(People).getPerson(id);
};
