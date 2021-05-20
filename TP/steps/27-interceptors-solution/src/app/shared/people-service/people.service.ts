import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { filterPeople, setPeople } from '../../store/actions/people.actions';
import { getFilteredPeople } from '../../store/selectors/selectors';
import { PeopleFeature } from '../../store/state/state';
import { CACHABLE } from '../interceptors/cachable.interceptor';

@Injectable()
export class PeopleService {
  private _backendURL: any;

  constructor(private _http: HttpClient, private store: Store<PeopleFeature>) {
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
    return this.store.select(getFilteredPeople);
  }

  fetch(): Observable<any> {
    return this._http.get(this._backendURL.allPeople).pipe(
      map(people => {
        this.store.dispatch(setPeople({ people }));
        return people;
      }),
      catchError(() => of([]))
    );
  }

  filter(search) {
    this.store.dispatch(filterPeople({ search }));
  }

  fetchRandom(): Observable<any> {
    return this._http.get(this._backendURL.randomPeople, { context: new HttpContext().set(CACHABLE, true) });
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
