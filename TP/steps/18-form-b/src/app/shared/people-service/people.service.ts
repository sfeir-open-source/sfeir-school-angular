import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class PeopleService {
  private _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(
      k => (this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
  }

  fetch(): Observable<any> {
    return this._http.get(this._backendURL.allPeople);
  }

  fetchRandom(): Observable<any> {
    return this._http.get(this._backendURL.randomPeople);
  }

  delete(id: string): Observable<any> {
    return this._http.delete(this._backendURL.onePeople.replace(':id', id));
  }

  create(person): Observable<any> {
    return this._http.post(this._backendURL.allPeople, person);
  }
}
