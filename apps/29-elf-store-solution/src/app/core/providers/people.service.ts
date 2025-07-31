import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { People, PeopleForm } from '../../shared/models/people.model';
import { AppStore } from '../store/app-store';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  private readonly httpClient = inject(HttpClient);
  private readonly appStore = inject(AppStore);

  getPeople(): Observable<Array<People>> {
    return this.httpClient.get<Array<People>>(`${environment.peopleEndpoint}/peoples`).pipe(tap(people => this.appStore.setPeople(people)));
  }

  getRandomPeople(): HttpResourceRef<People> {
    return httpResource(() => `${environment.peopleEndpoint}/peoples/random`);
  }

  deletePeople(personId: string): Observable<Array<People>> {
    return this.httpClient
      .delete<Array<People>>(`${environment.peopleEndpoint}/peoples/${personId}`)
      .pipe(tap(people => this.appStore.setPeople(people)));
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
