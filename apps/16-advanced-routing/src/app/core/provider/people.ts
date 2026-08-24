import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { type Person, UpsertPersonBody } from '@sfeir/types';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  getPerson(id: string): Observable<Person> {
    return this._http.get<Person>(`${People.baseUrl}/people/${id}`);
  }

  updatePerson(id: string, body: UpsertPersonBody): Observable<void> {
    return this._http.put<void>(`${People.baseUrl}/people/${id}`, body);
  }
}
