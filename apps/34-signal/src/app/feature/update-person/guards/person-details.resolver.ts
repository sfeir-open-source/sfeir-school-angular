import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { People } from '../../../shared/models/people.model';
import { inject } from '@angular/core';
import { PeopleService } from '../../../core/providers/people.service';

export function personDetailsResolver(route: ActivatedRouteSnapshot): Observable<People> {
  const idPerson = route.paramMap.get('id');
  return inject(PeopleService).getPersonDetails(idPerson);
}
