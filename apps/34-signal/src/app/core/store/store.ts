import { computed, inject, InjectionToken, makeEnvironmentProviders, signal } from '@angular/core';
import { PeopleService } from '../providers/people.service';
import { People, PeopleForm } from '../../shared/models/people.model';
import { switchMap, tap } from 'rxjs';

const filterPeople = (search: string) => (people: People) =>
  people.lastname.toLowerCase().includes(search.toLowerCase()) || people.firstname.toLowerCase().includes(search.toLowerCase());

function appStore(peopleService = inject(PeopleService)) {
  const people = signal<People[]>([]);
  const search = signal<string>('');

  return {
    people: computed(() => people().filter(filterPeople(search()))),
    search: search.asReadonly(),
    setSearch(value: string) {
      search.set(value);
    },
    getPeople() {
      return peopleService.getPeople().pipe(tap(data => people.set(data)));
    },
    deletePeople(id: string) {
      return peopleService.deletePeople(id).pipe(tap(data => people.set(data)));
    },
    addNewPerson(person: PeopleForm) {
      return peopleService.addNewPerson(person).pipe(switchMap(() => this.getPeople()));
    },
  };
}

export const PEOPLE_STORE = new InjectionToken<Store>('StoreToken');

export type Store = ReturnType<typeof appStore>;

export const provideAppStore = () => {
  return makeEnvironmentProviders([{ provide: PEOPLE_STORE, useFactory: appStore }]);
};
