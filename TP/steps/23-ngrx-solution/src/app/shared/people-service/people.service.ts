import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, of, map, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { setPeople, filterPeople } from '../../store/actions/people.actions';
import { PeopleFeature } from '../../store/state/state';
import { getFilteredPeople } from '../../store/selectors/selectors';

@Injectable()
export class PeopleService {
  private readonly _backendURL: any;
  public get backendURL(): any {
    return this._backendURL;
  }

  constructor(private readonly http: HttpClient, private store: Store<PeopleFeature>) {
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
    return this.http.get(this._backendURL.allPeople).pipe(
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
    return this.http.get(this._backendURL.randomPeople);
  }

  fetchOne(id: string): Observable<any> {
    return this.http.get(this._backendURL.onePeople.replace(':id', id));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this._backendURL.onePeople.replace(':id', id));
  }

  update(person: any): Observable<any> {
    return this.http.put(this._backendURL.onePeople.replace(':id', person.id), person);
  }

  create(person): Observable<any> {
    return this.http.post(this._backendURL.allPeople, person);
  }
}
