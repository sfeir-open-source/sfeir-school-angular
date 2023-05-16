import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PeopleService } from '../../../core/providers/people.service';
import { People } from '../../../shared/models/people.model';

@Injectable()
export class PersonDetailsResolver {
  constructor(private readonly peopleService: PeopleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<People> {
    const idPerson = route.paramMap.get('id');
    return this.peopleService.getPersonDetails(idPerson);
  }
}
