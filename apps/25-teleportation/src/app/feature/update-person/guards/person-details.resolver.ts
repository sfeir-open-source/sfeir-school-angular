import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PeopleService } from '../../../core/providers/people.service';
import { People } from '../../../shared/models/people.model';

export function personDetailsResolver(route: ActivatedRouteSnapshot): Observable<People> {
  const idPerson = route.paramMap.get('id');
  return inject(PeopleService).getPersonDetails(idPerson);
}
