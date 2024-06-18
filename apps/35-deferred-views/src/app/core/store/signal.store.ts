import { computed, inject, InjectionToken, makeEnvironmentProviders, signal } from '@angular/core';
import { People, PeopleForm } from '../../shared/models/people.model';
import { PeopleService } from '../providers/people.service';
import { tap } from 'rxjs';

function signalStoreFactory() {
  const peopleService = inject(PeopleService);
  const filterPeople: (x: string) => (people: People) => boolean = search => people =>
    people.lastname.toLowerCase().includes(search.toLowerCase()) || people.firstname.toLowerCase().includes(search.toLowerCase());

  const people = signal<Array<People>>([]);
  const search = signal<string>('');
  const peopleFiltered = computed(() => people().filter(filterPeople(search())));

  return {
    peopleFiltered,
    search,
    getPeople() {
      return peopleService.getPeople().pipe(tap(response => people.set(response)));
    },
    deletePerson(personId: string) {
      return peopleService.deletePeople(personId).pipe(tap(response => people.set(response)));
    },
    addNewPerson(person: PeopleForm) {
      return peopleService.addNewPerson(person);
    },
    setSearch(searchEntry: string) {
      search.set(searchEntry);
    },
  };
}

export const PEOPLE_STORE = new InjectionToken<ReturnType<typeof signalStoreFactory>>('PeopleStore');

export function providePeopleStore() {
  return makeEnvironmentProviders([{ provide: PEOPLE_STORE, useFactory: signalStoreFactory }]);
}
