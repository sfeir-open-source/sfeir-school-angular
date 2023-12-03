import { createReducer, on } from '@ngrx/store';
import { setPeople, setSearch } from './action';
import { INITIAL_STATE } from './state';

const APP_REDUCER = createReducer(
  INITIAL_STATE,
  on(setSearch, (state, { search }) => ({ ...state, search })),
  on(setPeople, (state, { people }) => ({ ...state, people })),
);

export function appReducer(state, action) {
  return APP_REDUCER(state, action);
}
