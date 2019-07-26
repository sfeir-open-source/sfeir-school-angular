import { ActionReducer, createSelector, createFeatureSelector } from '@ngrx/store';
import * as PeopleAction from '../actions/people.action';

export interface State {
  people: Object[];
  search: string;
}

export const initialState: State = {
  people: [],
  search: ''
};

export function reducer(state: State = initialState, action: PeopleAction.Actions) {
  switch (action.type) {
    default:
      return state;
  }
}

// SELECTORS

export const getSearch = (state: State) => {
  return state.search;
};
