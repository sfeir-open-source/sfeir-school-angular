import { createReducer, on, Action } from '@ngrx/store';
import { setPeople, filterPeople } from '../actions/people.actions';
import { initialState, State } from '../state/state';

const peopleReducer = createReducer(
  initialState,
  on(setPeople, (state, { people }) => ({ ...state, people })),
  on(filterPeople, (state, { search }) => ({ ...state, search }))
);

export function reducer(state: State | undefined, action: Action) {
  return peopleReducer(state, action);
}
