import { createSelector } from '@ngrx/store';
import { People } from '../../shared/models/people.model';
import { AppStore } from './state';

const filterPeople: (x: string) => (people: People) => boolean = search => people => {
  console.log('here')
  return people.lastname.toLowerCase().includes(search.toLowerCase()) || people.firstname.toLowerCase().includes(search.toLowerCase());
}

const selectRootStore = (rootStore: AppStore) => rootStore.store;

export const selectSearch = createSelector(selectRootStore, state => state.search);

export const selectPeople = createSelector(selectRootStore, state => state.people.filter(filterPeople(state.search)));
