import { Injectable } from '@angular/core';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { selectAllEntitiesApply, setEntities, withEntities } from '@ngneat/elf-entities';
import { switchMap } from 'rxjs';
import type { People } from '../../shared/models/people.model';

export interface IAppStore {
  search: string;
}

const filteredPeople = (search: string) => (person: People) =>
  person.firstname.toLowerCase().includes(search.toLowerCase()) || person.lastname.toLowerCase().includes(search.toLowerCase());

@Injectable({ providedIn: 'root' })
export class AppStore {
  private store = createStore(
    {
      name: 'PEOPLE_STORE',
    },
    withProps<IAppStore>({ search: '' }),
    withEntities<People>({ initialValue: [], idKey: 'id' }),
  );

  selectSearch$ = this.store.pipe(select(state => state.search));

  selectPeoples$ = this.selectSearch$.pipe(switchMap(search => this.store.pipe(selectAllEntitiesApply({ filterEntity: filteredPeople(search) }))));

  setSearch(search: string): void {
    this.store.update(setProp('search', search));
  }

  setPeople(people: People[]): void {
    this.store.update(setEntities(people));
  }
}
