import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { People } from '../../people.model';

@Injectable()
export class PeopleService {
  private backendURL: any;

  constructor(private readonly http: HttpClient) {
    this.backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(
      k => (this.backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
  }

  fetch(): Observable<People[]> {
    return this.http.get<People[]>(this.backendURL.allPeople);
  }

  fetchRandom(): Observable<People> {
    return this.http.get<People>(this.backendURL.randomPeople);
  }

  fetchOne(id: string): Observable<People> {
    return this.http.get<People>(this.backendURL.onePeople.replace(':id', id));
  }

  delete(id: string): Observable<People[]> {
    return this.http.delete<People[]>(this.backendURL.onePeople.replace(':id', id));
  }

  create(person): Observable<People> {
    return this.http.post<People>(this.backendURL.allPeople, person);
  }

  update(person: People): Observable<People> {
    return this.http.put<People>(this.backendURL.onePeople.replace(':id', person.id), person);
  }
}
