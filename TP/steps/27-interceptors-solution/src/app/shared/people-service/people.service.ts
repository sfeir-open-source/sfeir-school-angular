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
  private backendURL: any;

  constructor(private http: HttpClient, private store: Store<PeopleFeature>) {
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

  getPeople() {
    return this.store.select(getFilteredPeople);
  }

  fetch(): Observable<any> {
    return this.http.get(this.backendURL.allPeople).pipe(
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
    return this.http.get(this.backendURL.randomPeople, { context: new HttpContext().set(CACHABLE, true) });
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
