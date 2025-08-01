import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { People, PeopleForm } from '../../shared/models/people.model';
import { setPeople } from '../store/action';
import type { AppState } from '../store/state';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  private readonly httpClient = inject(HttpClient);
  private readonly store = inject(Store<AppState>);

  getPeople(): Observable<Array<People>> {
    return this.httpClient
      .get<Array<People>>(`${environment.peopleEndpoint}/peoples`)
      .pipe(tap(people => this.store.dispatch(setPeople({ people }))));
  }

  getRandomPeople(): HttpResourceRef<People> {
    return httpResource(() => `${environment.peopleEndpoint}/peoples/random`);
  }

  deletePeople(personId: string): Observable<Array<People>> {
    return this.httpClient
      .delete<Array<People>>(`${environment.peopleEndpoint}/peoples/${personId}`)
      .pipe(tap(people => this.store.dispatch(setPeople({ people }))));
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
