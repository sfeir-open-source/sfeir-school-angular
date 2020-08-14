import { createSelector } from '@ngrx/store';
import { State, PeopleFeature } from '../state/state';

const filterPeople = (searchFilter: string, people) => {
  const filterPerson = search => p => {
    const regExp = new RegExp(search, 'i');
    return regExp.test(p.firstname) || regExp.test(p.lastname) || regExp.test(p.manager);
  };
  return people.filter(filterPerson(searchFilter));
};

export const getPeopleState = (state: PeopleFeature) => state.people;

export const getFilteredPeople = createSelector(getPeopleState, (state: State) =>
  filterPeople(state.search, state.people)
);
export const getSearch = createSelector(getPeopleState, (state: State) => state.search);
