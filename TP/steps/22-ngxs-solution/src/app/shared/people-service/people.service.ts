import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, map, flatMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SetPeople } from '../../app.state';

@Injectable()
export class PeopleService {
  backendURL: any;

  constructor(private readonly http: HttpClient, private store: Store) {
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

  private handleError(result = {}) {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(error);
      // Let the app keep running by returning a safe result.
      return of(result);
    };
  }

  fetch(): Observable<any> {
    return this.http.get(this.backendURL.allPeople).pipe(
      flatMap(people => this.store.dispatch(new SetPeople(people)).pipe(map(() => people))),
      catchError(this.handleError([]))
    );
  }

  fetchRandom(): Observable<any> {
    return this.http.get(this.backendURL.randomPeople);
  }

  fetchOne(id: string): Observable<any> {
    return this.http.get(this.backendURL.onePeople.replace(':id', id));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.backendURL.onePeople.replace(':id', id));
  }

  update(person: any): Observable<any> {
    return this.http.put(this.backendURL.onePeople.replace(':id', person.id), person);
  }

  create(person): Observable<any> {
    return this.http.post(this.backendURL.allPeople, person);
  }
}
