import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { People, PeopleForm } from '../../shared/models/people.model';
import { SetPeople } from '../store/app.store';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  constructor(private readonly httpClient: HttpClient, private readonly store: Store) {}

  getPeople(): Observable<Array<People>> {
    return this.httpClient
      .get<Array<People>>(`${environment.peopleEndpoint}/peoples`)
      .pipe(switchMap(people => this.store.dispatch(new SetPeople(people)).pipe(map(() => people))));
  }

  getRandomPeople(): Observable<People> {
    return this.httpClient.get<People>(`${environment.peopleEndpoint}/peoples/random`);
  }

  deletePeople(personId: string): Observable<unknown> {
    return this.httpClient
      .delete<Array<People>>(`${environment.peopleEndpoint}/peoples/${personId}`)
      .pipe(switchMap(people => this.store.dispatch(new SetPeople(people))));
  }

  addNewPerson(person: PeopleForm): Observable<void> {
    return this.httpClient.post<void>(`${environment.peopleEndpoint}/peoples`, person);
  }

  getPersonDetails(personId: string): Observable<People> {
    return this.httpClient.get<People>(`${environment.peopleEndpoint}/peoples/${personId}`);
  }

  updatePerson(person: PeopleForm): Observable<void> {
    return this.httpClient.put<void>(`${environment.peopleEndpoint}/peoples/${person.id}`, person);
  }
}
