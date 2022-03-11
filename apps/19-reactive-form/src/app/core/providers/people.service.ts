import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { People, PeopleForm } from '../../shared/models/people.model';
import { CoreModule } from '../core.module';

@Injectable({ providedIn: CoreModule })
export class PeopleService {
  constructor(private readonly httpClient: HttpClient) {}

  getPeople(): Observable<Array<People>> {
    return this.httpClient.get<Array<People>>(`${environment.peopleEndpoint}/peoples`);
  }

  getRandomPeople(): Observable<People> {
    return this.httpClient.get<People>(`${environment.peopleEndpoint}/peoples/random`);
  }

  deletePeople(personId: string): Observable<Array<People>> {
    return this.httpClient.delete<Array<People>>(`${environment.peopleEndpoint}/peoples/${personId}`);
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
