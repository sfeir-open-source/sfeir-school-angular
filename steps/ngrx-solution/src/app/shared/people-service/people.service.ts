import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import * as PeopleAction from '../../store/actions/people.actions';
import * as fromRoot from '../../store/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PeopleService {
  private _backendURL: any;

  constructor(private _http: HttpClient, private store: Store<fromRoot.State>) {
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

  getPeople() {
    return this.store.select(fromRoot.getFilteredPeople);
  }

  fetch(): Observable<any> {
    return this._http.get(this._backendURL.allPeople).pipe(
      map(people => {
        this.store.dispatch(new PeopleAction.SetPeople(people));
        return people;
      })
    );
  }

  filter(search) {
    this.store.dispatch(new PeopleAction.FilterPeople(search));
  }

  fetchRandom(): Observable<any> {
    return this._http.get(this._backendURL.randomPeople);
  }

  fetchOne(id: string): Observable<any> {
    return this._http.get(this._backendURL.onePeople.replace(':id', id));
  }

  delete(id: string): Observable<any> {
    return this._http.delete(this._backendURL.onePeople.replace(':id', id));
  }

  update(person: any): Observable<any> {
    return this._http.put(this._backendURL.onePeople.replace(':id', person.id), person);
  }

  create(person): Observable<any> {
    return this._http.post(this._backendURL.allPeople, person);
  }
}
