import { inject, Service } from '@angular/core';
import { type Person, UpsertPersonBody } from '@sfeir/types';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Service()
export class People {
  static readonly baseUrl = `${environment.api}`;

  private readonly _http = inject(HttpClient);

  getPeople(): Observable<Person[]> {
    return this._http.get<Person[]>(`${People.baseUrl}/people`);
  }

  getRandomPerson(): HttpResourceRef<Person | undefined> {
    return httpResource<Person>(() => `${People.baseUrl}/people/random`);
  }

  removePerson(id: string): Observable<Person[]> {
    return this._http.delete<Person[]>(`${People.baseUrl}/people/${id}`);
  }

  addPerson(body: UpsertPersonBody): Observable<void> {
    return this._http.post<void>(`${People.baseUrl}/people`, body);
  }
}
