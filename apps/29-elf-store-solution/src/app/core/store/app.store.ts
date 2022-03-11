import { Injectable } from '@angular/core';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { selectAllApply, setEntities, withEntities } from '@ngneat/elf-entities';
import { Observable, switchMap } from 'rxjs';
import { People } from '../../shared/models/people.model';
import { CoreModule } from '../core.module';

export interface IStoreProps {
  search: string;
}

const filteredPeople = (search: string) => (person: People) =>
  person.firstname.toLowerCase().includes(search.toLowerCase()) || person.lastname.toLowerCase().includes(search.toLowerCase());

@Injectable({ providedIn: CoreModule })
export class AppStoreService {
  private APP_STORE = createStore(
    { name: 'APP_STORE' },
    withProps<IStoreProps>({ search: '' }),
    withEntities<People>({ initialValue: [], idKey: 'id' })
  );

  setSearch(search: string): void {
    this.APP_STORE.update(setProp('search', search));
  }

  setPeopleEntities(people: Array<People>): void {
    this.APP_STORE.update(setEntities(people));
  }

  selectSearch(): Observable<string> {
    return this.APP_STORE.pipe(select(state => state.search));
  }

  selectPeople(): Observable<Array<People>> {
    return this.selectSearch().pipe(switchMap(search => this.APP_STORE.pipe(selectAllApply({ filterEntity: filteredPeople(search) }))));
  }
}
