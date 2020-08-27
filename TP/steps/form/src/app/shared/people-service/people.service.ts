import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class PeopleService {
  private _backendURL: any;
  constructor(private readonly httpClient: HttpClient) {
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
    return this.httpClient.get(this._backendURL.allPeople);
  }

  fetchRandom(): Observable<any> {
    return this.httpClient.get(this._backendURL.randomPeople);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(this._backendURL.onePeople.replace(':id', id));
  }
}
