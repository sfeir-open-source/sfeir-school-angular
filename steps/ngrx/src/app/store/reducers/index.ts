import { ActionReducerMap, createSelector, ActionReducer, MetaReducer } from '@ngrx/store';

import { environment } from '../../../environments/environment';

import * as fromPeople from './people.reducer';

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export interface State {
  people: fromPeople.State;
}

export const reducers: ActionReducerMap<State> = {
  people: fromPeople.reducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [debug] : [];

/**
 * People Reducers
 */

export const getPeopleState = (state: State) => state.people;

export const getSearch = createSelector(
  getPeopleState,
  fromPeople.getSearch
);
