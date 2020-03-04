import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PeopleService } from '../people-service';

@Injectable({ providedIn: 'root' })
export class UserDetailsResolver implements Resolve<object> {
  constructor(private readonly peopleService: PeopleService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<object> {
    const userId: string = route.paramMap.get('id');
    return this.peopleService.fetchOne(userId);
  }
}
