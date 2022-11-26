import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { People } from '../../shared/models/people.model';

@Injectable({ providedIn: 'root' })
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
}
