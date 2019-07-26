import { ActionReducer, createSelector, createFeatureSelector } from '@ngrx/store';
import * as PeopleAction from '../actions/people.actions';

export interface State {
  people: Object[];
  search: string;
}

export const initialState: State = {
  people: [],
  search: ''
};

// HELPERS

const filterPerson = search => p => {
  const regExp = new RegExp(search, 'i');
  return regExp.test(p.firstname) || regExp.test(p.lastname) || regExp.test(p.manager);
};

const filterPeople = (searchFilter: string, people) => {
  return people.filter(filterPerson(searchFilter));
};

// REDUCER

export function reducer(state: State = initialState, action: PeopleAction.Actions) {
  switch (action.type) {
    case PeopleAction.SET_PEOPLE:
      const people = action.payload;
      return { ...state, people };
    case PeopleAction.FILTER_PEOPLE:
      const search = action.payload;
      return { ...state, search };
    default:
      return state;
  }
}

// SELECTORS

export const getFilteredPeople = (state: State) => {
  return filterPeople(state.search, state.people);
};

export const getSearch = (state: State) => {
  return state.search;
};
